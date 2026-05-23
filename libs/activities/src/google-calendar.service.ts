import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';
import { PrismaService } from '@crm/shared';

@Injectable()
export class GoogleCalendarService {
  private readonly logger = new Logger(GoogleCalendarService.name);
  private oauth2Client: any;

  constructor(private readonly prisma: PrismaService) {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID || 'dummy_id',
      process.env.GOOGLE_CLIENT_SECRET || 'dummy_secret',
      process.env.GOOGLE_CALLBACK_URL || 'dummy_url'
    );
  }

  async syncActivity(activityId: string) {
    const activity = await this.prisma.activity.findUnique({
      where: { id: activityId },
      include: { owner: true, contact: true }
    });

    if (!activity || !activity.dueDate || !activity.owner.googleRefreshToken || activity.type !== 'meeting') {
      return;
    }

    try {
      this.oauth2Client.setCredentials({
        refresh_token: activity.owner.googleRefreshToken,
      });

      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

      const event = {
        summary: activity.subject,
        description: activity.description || '',
        start: {
          dateTime: activity.dueDate.toISOString(),
          timeZone: 'UTC',
        },
        end: {
          dateTime: new Date(activity.dueDate.getTime() + 60 * 60 * 1000).toISOString(),
          timeZone: 'UTC',
        },
        attendees: activity.contact ? [{ email: activity.contact.email }] : [],
      };

      if (activity.googleCalendarEventId) {
        await calendar.events.update({
          calendarId: 'primary',
          eventId: activity.googleCalendarEventId,
          requestBody: event,
        });
        this.logger.log(`Updated calendar event ${activity.googleCalendarEventId} for activity ${activityId}`);
      } else {
        const response = await calendar.events.insert({
          calendarId: 'primary',
          requestBody: event,
        });
        
        await this.prisma.activity.update({
          where: { id: activityId },
          data: { googleCalendarEventId: response.data.id },
        });
        this.logger.log(`Created calendar event ${response.data.id} for activity ${activityId}`);
      }
    } catch (error: any) {
      this.logger.error(`Failed to sync calendar for activity ${activityId}: ${error.message}`);
    }
  }
}
