import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';
import { VisualCodingModule } from './visual-coding.module';

@Module({
  imports: [VisualCodingModule],
  providers: [CommandService],
  controllers: [CommandController],
})
export class CommandModule {}