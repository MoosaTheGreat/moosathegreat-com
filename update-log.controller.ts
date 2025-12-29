import { Controller, Get } from '@nestjs/common';
import { UpdateLogService } from './update-log.service';

@Controller('updates')
export class UpdateLogController {
  constructor(private readonly updateLogService: UpdateLogService) {}

  @Get()
  findAll() {
    return this.updateLogService.getRecentUpdates();
  }
}