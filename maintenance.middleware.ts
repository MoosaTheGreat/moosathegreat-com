import { Injectable, NestMiddleware, ServiceUnavailableException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MaintenanceMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Bypass for admin routes or home page if needed, logic here
    if (req.path.startsWith('/admin') || req.path === '/') {
      return next();
    }

    const setting = await this.prisma.systemSetting.findUnique({
      where: { key: 'maintenance_mode' },
    });

    if (setting && setting.value === 'true') {
      throw new ServiceUnavailableException('System is under maintenance');
    }

    next();
  }
}