import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CommandModule } from './command/command.module';
import { User } from './entities/user.entity';
import { Page } from './entities/page.entity';
import { Plugin } from './entities/plugin.entity';
import { SiteSetting } from './entities/site-setting.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'fullstack_platform',
      entities: [User, Page, Plugin, SiteSetting],
      synchronize: true, // Set to false in production
    }),
    AuthModule,
    AdminModule,
    CommandModule,
  ],
})
export class AppModule {}
