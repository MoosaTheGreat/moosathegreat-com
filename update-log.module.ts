import { Module, Global } from '@nestjs/common';
import { UpdateLogService } from './update-log.service';
import { UpdateLogController } from './update-log.controller';
import { PrismaService } from '../prisma/prisma.service';

@Global()
@Module({
  controllers: [UpdateLogController],
  providers: [UpdateLogService, PrismaService],
  exports: [UpdateLogService],
})
export class UpdateLogModule {}