import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController, EmailTrackingController } from './email.controller';
import { ImapService } from './imap.service';

@Module({
  controllers: [EmailController, EmailTrackingController],
  providers: [EmailService, ImapService],
  exports: [EmailService, ImapService],
})
export class EmailModule {}
