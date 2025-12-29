import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';
import { PluginModule } from './plugin.module';
import { CommandModule } from './command.module';
import { VisualCodingModule } from './visual-coding.module';
import { MaintenanceMiddleware } from './maintenance.middleware';
import { DiscordModule } from './discord.module';
import { AiModule } from './ai.module';
import { CmsModule } from './cms.module';
import { UpdateLogModule } from './update-log.module';
import { SettingsModule } from './settings.module';
import { AuditModule } from './audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PluginModule,
    CommandModule,
    VisualCodingModule,
    DiscordModule,
    AiModule,
    CmsModule,
    UpdateLogModule,
    SettingsModule,
    AuditModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MaintenanceMiddleware).forRoutes('*');
  }
}