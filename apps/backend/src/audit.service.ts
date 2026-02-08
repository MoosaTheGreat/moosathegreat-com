import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(userId: string, action: string, ipAddress?: string, details?: any) {
    return this.prisma.auditLog.create({
      data: {
        userId,
        action,
        ipAddress,
        details: details || {},
      },
    });
  }
}