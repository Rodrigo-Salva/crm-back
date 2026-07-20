import { Module } from '@nestjs/common';
import { SharedModule } from '@crm/shared';
import { EmailModule } from '@crm/email';
import { NpsService } from './nps.service';
import { NpsController, PublicNpsController } from './nps.controller';

@Module({
  imports: [SharedModule, EmailModule],
  controllers: [NpsController, PublicNpsController],
  providers: [NpsService],
  exports: [NpsService],
})
export class NpsModule {}
