import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bullmq';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { SharedModule } from '@crm/shared';
import { AuthModule, TwoFactorSetupGuard } from '@crm/auth';
import { TenantModule } from '@crm/tenant';
import { CompaniesModule } from '@crm/companies';
import { CustomFieldsModule } from '@crm/custom-fields';
import { PipelineStagesModule } from '@crm/pipeline-stages';
import { ActivitiesModule } from '@crm/activities';
import { NotificationsModule } from '@crm/notifications';
import { EmailModule } from '@crm/email';
import { AutomationModule } from '@crm/automation';
import { AuditModule } from '@crm/audit';
import { CampaignsModule } from '@crm/campaigns';
import { MarketingCampaignsModule } from '@crm/marketing-campaigns';
import { SalesGoalsModule } from '@crm/sales-goals';
import { LeadFormsModule } from '@crm/lead-forms';
import { DashboardModule } from '@crm/dashboard';
import { ProductsModule } from '@crm/products';
import { QuotesModule } from '@crm/quotes';
import { TicketsModule } from '@crm/tickets';
import { ApiKeysModule } from '@crm/api-keys';
import { WebhooksModule } from '@crm/webhooks';
import { WhatsappModule } from '@crm/whatsapp';
import { TenantSettingsModule } from '@crm/tenant-settings';
import { AiAssistantModule } from '@crm/ai-assistant';
import { RolePermissionsModule } from '@crm/role-permissions';
import { LeadsModule } from '@crm/leads';
import { UploadsModule } from '@crm/uploads';
import { TeamsModule } from '@crm/teams';
import { TimeTrackingModule } from '@crm/time-tracking';
import { TasksModule } from '@crm/tasks';
import { UsersModule } from '@crm/users';
import { NotesModule } from '@crm/notes';
import { AdminModule } from './admin/admin.module';
import { ImportModule } from './import/import.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { CareersModule } from './careers/careers.module';
import { ModalitiesModule } from './modalities/modalities.module';
import { PaymentsModule } from '@crm/payments';
import { ContractsModule } from '@crm/contracts';
import { SubscriptionsModule } from '@crm/subscriptions';
import { PlaybooksModule } from '@crm/playbooks';
import { PublicApiModule } from '@crm/public-api';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 60,
    }]),
    SharedModule,
    AuthModule,
    TenantModule,
    CompaniesModule,
    CustomFieldsModule,
    PipelineStagesModule,
    ActivitiesModule,
    NotificationsModule,
    EmailModule,
    AutomationModule,
    AuditModule,
    CampaignsModule,
    MarketingCampaignsModule,
    SalesGoalsModule,
    LeadFormsModule,
    DashboardModule,
    ProductsModule,
    QuotesModule,
    TicketsModule,
    ApiKeysModule,
    WebhooksModule,
    WhatsappModule,
    TenantSettingsModule,
    AiAssistantModule,
    RolePermissionsModule,
    LeadsModule,
    UploadsModule,
    TeamsModule,
    TimeTrackingModule,
    TasksModule,
    UsersModule,
    NotesModule,
    AdminModule,
    ImportModule,
    SchedulerModule,
    CareersModule,
    ModalitiesModule,
    PaymentsModule,
    SubscriptionsModule,
    ContractsModule,
    PlaybooksModule,
    PublicApiModule,
  ],
  controllers: [ApiController],
  providers: [
    ApiService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: TwoFactorSetupGuard,
    },
  ],
})
export class ApiModule {}
