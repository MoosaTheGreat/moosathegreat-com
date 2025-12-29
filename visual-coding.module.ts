import { Module } from '@nestjs/common';
import { VisualCodingService } from './visual-coding.service';
import { VisualCodingController } from './visual-coding.controller';

@Module({
  controllers: [VisualCodingController],
  providers: [VisualCodingService],
  exports: [VisualCodingService],
})
export class VisualCodingModule {}