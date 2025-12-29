import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../admin/roles.guard';
import { Roles } from '../admin/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { CommandService } from './command.service';

@Controller('command')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class CommandController {
  constructor(private commandService: CommandService) {}

  @Post('execute')
  async execute(@Body() body: { command: string }, @Request() req) {
    const output = await this.commandService.executeCommand(body.command, req.user);
    return { output };
  }
}
