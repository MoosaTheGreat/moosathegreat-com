import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UpdateLogService {
  constructor(private prisma: PrismaService) {}

  async createUpdate(title: string, description: string, type: string) {
    return this.prisma.updateLog.create({
      data: { title, description, type },
    });
  }

  async getRecentUpdates(limit: number = 10) {
    return this.prisma.updateLog.findMany({
      take: limit,
      orderBy: { timestamp: 'desc' },
    });
  }
}
