import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { CommandService } from './command.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('command')
export class CommandController {
  constructor(private commandService: CommandService, private prisma: PrismaService) {}

  @Post('execute')
  async execute(@Body() body: { cmd: string }, @Request() req) {
    const userId = req.user.id;
    const result = await this.commandService.execute(body.cmd, userId);
    return { output: result };
  }

  @Post('create')
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

  @Get('list')
  async listCommands() {
    return this.prisma.command.findMany();
  }
}