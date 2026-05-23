import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { AutomationModule } from '@crm/automation';
import { AuditModule } from '@crm/audit';
import { WebhooksModule } from '@crm/webhooks';

@Module({
  imports: [AutomationModule, AuditModule, WebhooksModule],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ContactsService],
})
export class ContactsModule {}
