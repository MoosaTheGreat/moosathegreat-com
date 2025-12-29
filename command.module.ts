import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';
import { PrismaService } from '../prisma/prisma.service';
import { VisualCodingModule } from '../visual-coding/visual-coding.module';

@Module({
  imports: [VisualCodingModule],
  controllers: [CommandController],
  providers: [CommandService, PrismaService],
})
export class CommandModule {}