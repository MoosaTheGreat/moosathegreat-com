import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth.module';
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
import { AdminController } from './admin.controller';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 60, // 60 requests
    }]),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
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
  controllers: [AdminController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MaintenanceMiddleware).forRoutes('*');
  }
}
