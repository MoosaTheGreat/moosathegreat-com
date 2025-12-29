import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { VisualCodingService } from './visual-coding.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('visual-coding')
export class VisualCodingController {
  constructor(private readonly visualCodingService: VisualCodingService) {}

  @Post('execute-dry-run')
  // @UseGuards(JwtAuthGuard)
  async executeDryRun(@Body() body: { flow: any[], context: any }) {
    // Allows admins to test flows before saving
    try {
      const result = await this.visualCodingService.executeFlow(body.flow, body.context);
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}