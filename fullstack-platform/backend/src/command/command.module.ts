import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [AdminModule],
  providers: [CommandService],
  controllers: [CommandController],
})
export class CommandModule {}
