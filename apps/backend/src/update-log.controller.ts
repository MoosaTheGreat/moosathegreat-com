import { Controller, Get, UseGuards } from '@nestjs/common';
import { UpdateLogService } from './update-log.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from '@prisma/client';

@Controller('updates')
export class UpdateLogController {
  constructor(private readonly updateLogService: UpdateLogService) {}

  @Get()
  async getPublicUpdates() {
    // In a real app, you might have a setting to control public visibility
    return this.updateLogService.getRecentUpdates(5);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('all')
  async getAllUpdates() {
    return this.updateLogService.getRecentUpdates(50);
  }
}