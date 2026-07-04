import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard } from '@crm/role-permissions';
import { LeadFormsService } from './lead-forms.service';
import { CreateLeadFormDto, UpdateLeadFormDto } from './dto/create-lead-form.dto';

@Controller('lead-forms')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class LeadFormsController {
  constructor(private readonly service: LeadFormsService) {}

  @Post()
  create(@Body() dto: CreateLeadFormDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.tenantId);
  }

  @Get(':id')
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findById(id, user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLeadFormDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }
}

@Controller('public/forms')
export class PublicLeadFormsController {
  constructor(private readonly service: LeadFormsService) {}

  @Get(':slug')
  getPublicForm(@Param('slug') slug: string) {
    return this.service.getPublicForm(slug);
  }

  @Post(':slug/submit')
  submit(@Param('slug') slug: string, @Body() payload: Record<string, any>) {
    return this.service.submit(slug, payload);
  }
}
