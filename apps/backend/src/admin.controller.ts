import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { UpdateLogService } from './update-log.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(
    private prisma: PrismaService,
    private updateLogService: UpdateLogService,
  ) {}

  @Get('stats')
  async getDashboardStats() {
    const totalUsers = await this.prisma.user.count();
    const totalPages = await this.prisma.page.count({
      where: { published: true },
    });
    const totalPlugins = await this.prisma.plugin.count();
    const totalCommands = await this.prisma.command.count();
    const recentUpdates = await this.updateLogService.getRecentUpdates(5);

    return {
      totalUsers,
      totalPages,
      totalPlugins,
      totalCommands,
      recentUpdates: recentUpdates.map((u) => ({
        title: u.title,
        timestamp: u.createdAt.toISOString(),
      })),
      systemStatus: 'ONLINE', // Could be more dynamic
    };
  }
}