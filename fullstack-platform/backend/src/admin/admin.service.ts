import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { Page } from '../entities/page.entity';
import { Plugin } from '../entities/plugin.entity';
import { SiteSetting } from '../entities/site-setting.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Page)
    private pageRepository: Repository<Page>,
    @InjectRepository(Plugin)
    private pluginRepository: Repository<Plugin>,
    @InjectRepository(SiteSetting)
    private siteSettingRepository: Repository<SiteSetting>,
  ) {}

  // User management
  async getAllUsers() {
    return this.userRepository.find();
  }

  async updateUserRole(id: number, role: UserRole) {
    await this.userRepository.update(id, { role });
    return this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  // Page management
  async getAllPages() {
    return this.pageRepository.find();
  }

  async createPage(title: string, content: string, slug: string) {
    const page = this.pageRepository.create({ title, content, slug });
    return this.pageRepository.save(page);
  }

  async updatePage(id: number, title: string, content: string, published: boolean) {
    await this.pageRepository.update(id, { title, content, published });
    return this.pageRepository.findOne({ where: { id } });
  }

  async deletePage(id: number) {
    return this.pageRepository.delete(id);
  }

  // Plugin management
  async getAllPlugins() {
    return this.pluginRepository.find();
  }

  async createPlugin(name: string, description: string, config: any) {
    const plugin = this.pluginRepository.create({ name, description, config });
    return this.pluginRepository.save(plugin);
  }

  async activatePlugin(id: number) {
    await this.pluginRepository.update(id, { active: true });
    return this.pluginRepository.findOne({ where: { id } });
  }

  async deactivatePlugin(id: number) {
    await this.pluginRepository.update(id, { active: false });
    return this.pluginRepository.findOne({ where: { id } });
  }

  async deletePlugin(id: number) {
    return this.pluginRepository.delete(id);
  }

  // Site settings
  async getSiteSettings() {
    return this.siteSettingRepository.find();
  }

  async updateSiteSetting(key: string, value: string) {
    await this.siteSettingRepository.upsert({ key, value }, ['key']);
    return this.siteSettingRepository.findOne({ where: { key } });
  }

  // Maintenance mode
  async setMaintenanceMode(enabled: boolean) {
    return this.updateSiteSetting('maintenance_mode', enabled.toString());
  }

  async isMaintenanceMode() {
    const setting = await this.siteSettingRepository.findOne({ where: { key: 'maintenance_mode' } });
    return setting?.value === 'true';
  }
}
