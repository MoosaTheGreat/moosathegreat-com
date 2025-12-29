import { Controller, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; phone?: string }) {
    return this.authService.register(body.email, body.password, body.phone);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string; code?: string }) {
    const user = await this.authService.validateUser(body.email, body.password, body.code);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }

  @Post('send-2fa')
  async send2FA(@Body() body: { email: string; method: 'EMAIL' | 'SMS' }) {
    const user = await this.authService.findUserByEmail(body.email);
    if (!user) throw new UnauthorizedException('User not found');
    return this.authService.send2FACode(user.id, body.method);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
