import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PluginEngine } from './plugin.engine';

@Controller('plugins')
export class PluginController {
  constructor(
    private prisma: PrismaService,
    private pluginEngine: PluginEngine
  ) {}

  @Get()
  async findAll() {
    return this.prisma.plugin.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  @Post()
  async create(@Body() data: { name: string; version: string; config: any }) {
    // In production: Validate DSL structure here
    const plugin = await this.prisma.plugin.create({
      data: { ...data, enabled: true }
    });
    await this.pluginEngine.loadPlugins(); // Hot-reload
    return plugin;
  }

  @Patch(':id/toggle')
  async toggle(@Param('id') id: string) {
    const plugin = await this.prisma.plugin.findUnique({ where: { id } });
    if (!plugin) return { error: 'Not found' };

    const updated = await this.prisma.plugin.update({
      where: { id },
      data: { enabled: !plugin.enabled },
    });
    await this.pluginEngine.loadPlugins(); // Hot-reload
    return updated;
  }
}