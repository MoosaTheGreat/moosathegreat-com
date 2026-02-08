import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PluginService } from './plugin.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('plugins')
export class PluginController {
  constructor(private readonly pluginService: PluginService) {}

  @Post()
  create(@Body() createPluginDto: any) {
    return this.pluginService.create(createPluginDto);
  }

  @Get()
  findAll() {
    return this.pluginService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePluginDto: any) {
    return this.pluginService.update(id, updatePluginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pluginService.remove(id);
  }
}