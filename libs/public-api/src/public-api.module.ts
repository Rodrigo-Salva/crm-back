import { Module } from '@nestjs/common';
import { PublicApiService } from './public-api.service';
import { PublicApiController } from './public-api.controller';
import { ApiKeysModule } from '@crm/api-keys';
import { LeadsModule } from '@crm/leads';
import { TicketsModule } from '@crm/tickets';

@Module({
  imports: [ApiKeysModule, LeadsModule, TicketsModule],
  controllers: [PublicApiController],
  providers: [PublicApiService],
})
export class PublicApiModule {}
