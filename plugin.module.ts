import { Module } from '@nestjs/common';
import { PluginController } from './plugin.controller';
import { PluginEngine } from './plugin.engine';
import { AiModule } from './ai.module';
import { DiscordModule } from './discord.module';

@Module({
  imports: [AiModule, DiscordModule],
  controllers: [PluginController],
  providers: [PluginEngine],
  exports: [PluginEngine],
})
export class PluginModule {}