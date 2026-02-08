import { Module } from '@nestjs/common';
import { VisualCodingService } from './visual-coding.service';
import { AiModule } from './ai.module';
import { DiscordModule } from './discord.module';

@Module({
  imports: [AiModule, DiscordModule],
  providers: [VisualCodingService],
  exports: [VisualCodingService],
})
export class VisualCodingModule {}