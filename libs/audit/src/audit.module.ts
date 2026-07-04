import { Module } from '@nestjs/common';
import { RolePermissionsModule } from '@crm/role-permissions';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';

@Module({
  imports: [RolePermissionsModule],
  controllers: [AuditController],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
