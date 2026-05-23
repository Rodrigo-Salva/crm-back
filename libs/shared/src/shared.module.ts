import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma';
import { EncryptionService } from './encryption.service';
import { RealtimeModule } from './realtime/realtime.module';

@Module({
  imports: [PrismaModule, RealtimeModule],
  providers: [EncryptionService],
  exports: [PrismaModule, EncryptionService, RealtimeModule],
})
export class SharedModule {}
