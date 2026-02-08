import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { VisualCodingService } from './visual-coding.service';

@Injectable()
export class CommandService {
  constructor(
    private prisma: PrismaService,
    private visualCoding: VisualCodingService
  ) {}

  async execute(fullCommand: string, userId: string): Promise<string> {
    const [trigger, ...args] = fullCommand.split(' ');

    // 1. Built-in Commands
    if (trigger === 'help') return 'Available: help, status, deploy, [custom]';
    if (trigger === 'status') return 'System Operational. All modules loaded.';

    // 2. Dynamic Database Commands
    const command = await this.prisma.command.findUnique({ where: { trigger } });
    
    if (command) {
      // Execute the visual logic flow associated with this command
      try {
        const flow = command.logicFlow as any; 
        const result = await this.visualCoding.executeFlow(flow, { args, userId });
        return result || `Command '${trigger}' executed successfully.`;
      } catch (error) {
        return `Error executing '${trigger}': ${error.message}`;
      }
    }

    return `Command '${trigger}' not found. Type 'help' for options.`;
  }
}
