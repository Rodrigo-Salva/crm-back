import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { google } from 'googleapis';
import { PrismaService } from '@crm/shared';

@Processor('calendar-sync')
export class CalendarSyncProcessor extends WorkerHost {
  private readonly logger = new Logger(CalendarSyncProcessor.name);
  private oauth2Client: any;

  constructor(private readonly prisma: PrismaService) {
    super();
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID || 'dummy_id',
      process.env.GOOGLE_CLIENT_SECRET || 'dummy_secret',
      process.env.GOOGLE_CALLBACK_URL || 'dummy_url'
    );
  }

  async process(job: Job) {
    const tasks = await this.prisma.task.findMany({
      where: { googleCalendarEventId: { not: null }, assignee: { googleRefreshToken: { not: null } } },
      include: { assignee: true },
    });

    for (const task of tasks) {
      try {
        this.oauth2Client.setCredentials({ refresh_token: task.assignee.googleRefreshToken });
        const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
        const event = await calendar.events.get({ calendarId: 'primary', eventId: task.googleCalendarEventId! });

        const start = event.data.start?.dateTime;
        if (start && task.dueDate && new Date(start).getTime() !== task.dueDate.getTime()) {
          await this.prisma.task.update({ where: { id: task.id }, data: { dueDate: new Date(start) } });
          this.logger.log(`Task ${task.id} dueDate updated from Google Calendar`);
        }
      } catch (error: any) {
        if (error.code === 404) {
          await this.prisma.task.update({ where: { id: task.id }, data: { googleCalendarEventId: null } });
          this.logger.log(`Task ${task.id} calendar event no longer exists, unlinked`);
        } else {
          this.logger.error(`Calendar pull-sync failed for task ${task.id}: ${error.message}`);
        }
      }
    }
  }
}
