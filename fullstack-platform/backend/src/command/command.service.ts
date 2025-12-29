import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class CommandService {
  constructor(
    private adminService: AdminService,
  ) {}

  async executeCommand(command: string, user: any): Promise<string> {
    const parts = command.split(' ');
    const cmd = parts[0].toLowerCase();

    switch (cmd) {
      case 'enable':
        if (parts[1] === 'maintenance') {
          await this.adminService.setMaintenanceMode(true);
          return 'Maintenance mode enabled';
        }
        break;
      case 'disable':
        if (parts[1] === 'maintenance') {
          await this.adminService.setMaintenanceMode(false);
          return 'Maintenance mode disabled';
        }
        break;
      case 'create':
        if (parts[1] === 'page' && parts[2]) {
          const title = parts.slice(2).join(' ');
          await this.adminService.createPage(title, '', title.toLowerCase().replace(/\s+/g, '-'));
          return `Page "${title}" created`;
        }
        break;
      case 'run':
        if (parts[1] === 'plugin' && parts[2]) {
          // Logic to run plugin - placeholder for now
          return `Plugin "${parts[2]}" executed (placeholder)`;
        }
        break;
      case 'ai':
        if (parts[1] === 'query' && parts.slice(2).length > 0) {
          // AI service not implemented yet
          return 'AI query feature not available yet';
        }
        break;
      case 'discord':
        if (parts[1] === 'broadcast' && parts.slice(2).length > 0) {
          // Discord service not implemented yet
          return 'Discord broadcast feature not available yet';
        }
        break;
      default:
        return 'Unknown command';
    }
    return 'Command executed';
  }
}
