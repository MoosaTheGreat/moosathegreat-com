import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from '@prisma/client';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('maintenance')
  async getMaintenanceStatus() { // Publicly accessible to show status
    const status = await this.settingsService.getSetting('maintenance_mode');
    return { maintenance: status === 'true' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('maintenance/toggle')
  async toggleMaintenance() {
    const result = await this.settingsService.toggleMaintenance();
    return { maintenance: result.value === 'true' };
  }
}
