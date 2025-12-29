import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string, code?: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return null;

    if (user.is2FAEnabled || user.role === 'ADMIN') {
      if (!code) throw new UnauthorizedException('2FA Code Required');
      const isValid = await this.verify2FA(user.id, code);
      if (!isValid) throw new UnauthorizedException('Invalid 2FA Code');
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async send2FACode(userId: string, method: 'EMAIL' | 'SMS') {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // In production: Store code in Redis with TTL
    // In production: Send via SendGrid (Email) or Twilio (SMS)
    
    console.log(`[2FA] Sending ${code} to user ${userId} via ${method}`);
    return { message: 'Code sent' };
  }

  private async verify2FA(userId: string, code: string): Promise<boolean> {
    // In production: Check Redis
    return true; // Bypass for demo
  }

  async register(email: string, password: string, phone?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        phone,
        role: 'USER',
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async refreshToken(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
