import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UpdateLogService {
  constructor(private prisma: PrismaService) {}

  async log(type: string, title: string, description: string) {
    return this.prisma.updateLog.create({
      data: {
        type,
        title,
        description,
      },
    });
  }

  async getRecentUpdates() {
    return this.prisma.updateLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: 50,
    });
  }
}