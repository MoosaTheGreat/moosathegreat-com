import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { UserRole } from '../entities/user.entity';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private adminService: AdminService) {}

  // User management
  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Put('users/:id/role')
  updateUserRole(@Param('id', ParseIntPipe) id: number, @Body() body: { role: UserRole }) {
    return this.adminService.updateUserRole(id, body.role);
  }

  @Delete('users/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteUser(id);
  }

  // Page management
  @Get('pages')
  getAllPages() {
    return this.adminService.getAllPages();
  }

  @Post('pages')
  createPage(@Body() body: { title: string; content: string; slug: string }) {
    return this.adminService.createPage(body.title, body.content, body.slug);
  }

  @Put('pages/:id')
  updatePage(@Param('id', ParseIntPipe) id: number, @Body() body: { title: string; content: string; published: boolean }) {
    return this.adminService.updatePage(id, body.title, body.content, body.published);
  }

  @Delete('pages/:id')
  deletePage(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deletePage(id);
  }

  // Plugin management
  @Get('plugins')
  getAllPlugins() {
    return this.adminService.getAllPlugins();
  }

  @Post('plugins')
  createPlugin(@Body() body: { name: string; description: string; config: any }) {
    return this.adminService.createPlugin(body.name, body.description, body.config);
  }

  @Put('plugins/:id/activate')
  activatePlugin(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.activatePlugin(id);
  }

  @Put('plugins/:id/deactivate')
  deactivatePlugin(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deactivatePlugin(id);
  }

  @Delete('plugins/:id')
  deletePlugin(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deletePlugin(id);
  }

  // Site settings
  @Get('settings')
  getSiteSettings() {
    return this.adminService.getSiteSettings();
  }

  @Put('settings')
  updateSiteSetting(@Body() body: { key: string; value: string }) {
    return this.adminService.updateSiteSetting(body.key, body.value);
  }

  // Maintenance mode
  @Put('maintenance')
  setMaintenanceMode(@Body() body: { enabled: boolean }) {
    return this.adminService.setMaintenanceMode(body.enabled);
  }

  @Get('maintenance')
  isMaintenanceMode() {
    return this.adminService.isMaintenanceMode();
  }
}
