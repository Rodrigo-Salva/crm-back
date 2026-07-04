import { Module } from '@nestjs/common';
import { RolePermissionsModule } from '@crm/role-permissions';
import { CustomFieldsService } from './custom-fields.service';
import { CustomFieldsController } from './custom-fields.controller';

@Module({
  imports: [RolePermissionsModule],
  controllers: [CustomFieldsController],
  providers: [CustomFieldsService],
  exports: [CustomFieldsService],
})
export class CustomFieldsModule {}
