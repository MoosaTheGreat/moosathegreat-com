import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getSetting(key: string) {
    const setting = await this.prisma.setting.findUnique({ where: { key } });
    return setting?.value || 'false';
  }

  async setSetting(key: string, value: string) {
    return this.prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  async toggleMaintenance() {
    const current = await this.getSetting('maintenance_mode');
    const newValue = current === 'true' ? 'false' : 'true';
    return this.setSetting('maintenance_mode', newValue);
  }
}
