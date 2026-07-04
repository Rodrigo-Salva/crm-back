import { Module } from '@nestjs/common';
import { RolePermissionsModule } from '@crm/role-permissions';
import { EmailService } from './email.service';
import { EmailController, EmailTrackingController } from './email.controller';
import { ImapService } from './imap.service';

@Module({
  imports: [RolePermissionsModule],
  controllers: [EmailController, EmailTrackingController],
  providers: [EmailService, ImapService],
  exports: [EmailService, ImapService],
})
export class EmailModule {}
