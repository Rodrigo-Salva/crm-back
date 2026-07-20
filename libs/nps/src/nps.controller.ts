import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { NpsService } from './nps.service';
import { SubmitNpsDto } from './dto/submit-nps.dto';

@Controller('nps')
@UseGuards(AuthGuard('jwt'))
export class NpsController {
  constructor(private readonly service: NpsService) {}

  @Get('stats')
  getStats(@CurrentUser() user: any) {
    return this.service.getStats(user.tenantId);
  }
}

@Controller('public/nps')
export class PublicNpsController {
  constructor(private readonly service: NpsService) {}

  @Get(':token')
  getPublic(@Param('token') token: string) {
    return this.service.getPublic(token);
  }

  @Post(':token/submit')
  submit(@Param('token') token: string, @Body() dto: SubmitNpsDto) {
    return this.service.submitResponse(token, dto);
  }
}
