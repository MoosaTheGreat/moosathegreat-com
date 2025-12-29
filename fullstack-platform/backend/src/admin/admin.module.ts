import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from '../entities/user.entity';
import { Page } from '../entities/page.entity';
import { Plugin } from '../entities/plugin.entity';
import { SiteSetting } from '../entities/site-setting.entity';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, Page, Plugin, SiteSetting])],
  providers: [AdminService, RolesGuard],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
