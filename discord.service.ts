import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordService implements OnModuleInit {
  private client: Client;
  private logger = new Logger(DiscordService.name);

  constructor(private configService: ConfigService) {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });
  }

  async onModuleInit() {
    const token = this.configService.get<string>('DISCORD_TOKEN');
    if (!token) {
      this.logger.warn('No DISCORD_TOKEN found. Discord bot disabled.');
      return;
    }

    try {
      await this.client.login(token);
      this.logger.log(`Discord Bot logged in as ${this.client.user?.tag}`);
    } catch (e) {
      this.logger.error('Failed to login to Discord', e);
    }
  }

  async sendMessage(channelId: string, content: string) {
    if (!this.client.isReady()) return;
    try {
      const channel = await this.client.channels.fetch(channelId);
      if (channel instanceof TextChannel) {
        await channel.send(content);
      }
    } catch (e) {
      this.logger.error(`Failed to send message to ${channelId}`, e);
    }
  }
}