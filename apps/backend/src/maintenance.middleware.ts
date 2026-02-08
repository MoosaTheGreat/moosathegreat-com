import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SettingsService } from './settings.service';

@Injectable()
export class MaintenanceMiddleware implements NestMiddleware {
  constructor(private readonly settingsService: SettingsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const isMaintenanceMode =
      await this.settingsService.getSetting('maintenance_mode');

    // Allow access to admin panel and home page
    const allowedPaths = ['/admin', '/auth', '/settings/maintenance', '/'];
    const isAllowed = allowedPaths.some((path) => req.originalUrl.startsWith(path));

    if (isMaintenanceMode === 'true' && !isAllowed) {
      res.status(503).send('<h1>Under Maintenance</h1><p>The site is currently undergoing scheduled maintenance. Please check back later.</p>');
    } else {
      next();
    }
  }
}