import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('maintenance')
  async getMaintenanceStatus() {
    const status = await this.settingsService.getSetting('maintenance_mode');
    return { maintenance: status === 'true' };
  }

  @Post('maintenance/toggle')
  async toggleMaintenance() {
    const result = await this.settingsService.toggleMaintenance();
    return { maintenance: result.value === 'true' };
  }
}