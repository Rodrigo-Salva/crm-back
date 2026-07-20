import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';
import { PrismaService } from '@crm/shared';

@Injectable()
export class GoogleCalendarTaskService {
  private readonly logger = new Logger(GoogleCalendarTaskService.name);
  private oauth2Client: any;

  constructor(private readonly prisma: PrismaService) {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID || 'dummy_id',
      process.env.GOOGLE_CLIENT_SECRET || 'dummy_secret',
      process.env.GOOGLE_CALLBACK_URL || 'dummy_url'
    );
  }

  async syncTask(taskId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { assignee: true },
    });

    if (!task || !task.dueDate || !task.assignee.googleRefreshToken) {
      return;
    }

    try {
      this.oauth2Client.setCredentials({
        refresh_token: task.assignee.googleRefreshToken,
      });

      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

      const event = {
        summary: task.title,
        description: task.description || '',
        start: {
          dateTime: task.dueDate.toISOString(),
          timeZone: 'UTC',
        },
        end: {
          dateTime: new Date(task.dueDate.getTime() + 60 * 60 * 1000).toISOString(),
          timeZone: 'UTC',
        },
      };

      if (task.googleCalendarEventId) {
        await calendar.events.update({
          calendarId: 'primary',
          eventId: task.googleCalendarEventId,
          requestBody: event,
        });
        this.logger.log(`Updated calendar event ${task.googleCalendarEventId} for task ${taskId}`);
      } else {
        const response = await calendar.events.insert({
          calendarId: 'primary',
          requestBody: event,
        });

        await this.prisma.task.update({
          where: { id: taskId },
          data: { googleCalendarEventId: response.data.id },
        });
        this.logger.log(`Created calendar event ${response.data.id} for task ${taskId}`);
      }
    } catch (error: any) {
      this.logger.error(`Failed to sync calendar for task ${taskId}: ${error.message}`);
    }
  }

  async deleteTaskEvent(taskId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { assignee: true },
    });
    if (!task?.googleCalendarEventId || !task.assignee.googleRefreshToken) return;

    try {
      this.oauth2Client.setCredentials({ refresh_token: task.assignee.googleRefreshToken });
      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
      await calendar.events.delete({ calendarId: 'primary', eventId: task.googleCalendarEventId });
    } catch (error: any) {
      this.logger.error(`Failed to delete calendar event for task ${taskId}: ${error.message}`);
    }
  }
}
