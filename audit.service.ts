import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(action: string, userId: string, details?: any) {
    return this.prisma.auditLog.create({
      data: {
        action,
        userId,
        details: details || {},
      },
    });
  }

  async findAll() {
    return this.prisma.auditLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100,
    });
  }
}