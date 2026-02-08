import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UpdateLogService } from './update-log.service';

@Injectable()
export class PluginService {
  constructor(
    private prisma: PrismaService,
    private updateLog: UpdateLogService,
  ) {}

  async create(data: any) {
    const plugin = await this.prisma.plugin.create({ data });
    await this.updateLog.log(
      'PLUGIN',
      'Plugin Created',
      `Plugin "${plugin.name}" was created.`,
    );
    return plugin;
  }

  async findAll() {
    return this.prisma.plugin.findMany();
  }

  async update(id: string, data: any) {
    const plugin = await this.prisma.plugin.update({ where: { id }, data });
    await this.updateLog.log(
      'PLUGIN',
      'Plugin Updated',
      `Plugin "${plugin.name}" was updated.`,
    );
    return plugin;
  }

  async remove(id: string) {
    const plugin = await this.prisma.plugin.delete({ where: { id } });
    await this.updateLog.log(
      'PLUGIN',
      'Plugin Removed',
      `Plugin "${plugin.name}" was removed.`,
    );
    return plugin;
  }
}