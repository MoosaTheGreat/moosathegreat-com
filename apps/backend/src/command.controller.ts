import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CommandService } from './command.service';
import { PrismaService } from '../prisma/prisma.service';
// Assuming an AuthGuard exists or will be implemented
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('command')
export class CommandController {
  constructor(private commandService: CommandService, private prisma: PrismaService) {}

  @Post('execute')
  // @UseGuards(JwtAuthGuard)
  async execute(@Body() body: { cmd: string }, @Request() req) {
    // Mock userId for now if auth not fully wired in this context
    const userId = req.user?.id || 'admin-id';
    const result = await this.commandService.execute(body.cmd, userId);
    return { output: result };
  }

  @Post('create')
  // @UseGuards(JwtAuthGuard)
  async createCommand(@Body() body: { trigger: string; description: string; flow: any }) {
    return this.prisma.command.create({
      data: {
        trigger: body.trigger,
        description: body.description,
        syntax: body.trigger,
        logicFlow: body.flow,
        permission: 'ADMIN',
      },
    });
  }
}