import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { AiAssistantService } from './ai-assistant.service';

@Controller('ai')
@UseGuards(AuthGuard('jwt'))
export class AiAssistantController {
  constructor(private readonly service: AiAssistantService) {}

  @Get('suggestions/:entity/:entityId')
  getSuggestions(@Param('entity') entity: string, @Param('entityId') entityId: string, @CurrentUser() user: any) {
    return this.service.getSuggestions(entity, entityId, user.tenantId);
  }

  @Post('summarize')
  summarize(@Body('content') content: string) {
    return this.service.summarizeNote(content || '');
  }
}
