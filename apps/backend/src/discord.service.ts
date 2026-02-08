import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';

@Injectable()
export class DiscordService implements OnModuleInit {
  private client: Client;

  constructor(private configService: ConfigService) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }

  onModuleInit() {
    const token = this.configService.get<string>('DISCORD_BOT_TOKEN');
    if (!token) {
      console.warn(
        '[DiscordService] DISCORD_BOT_TOKEN not found, Discord bot disabled.',
      );
      return;
    }

    this.client.once('ready', () => {
      console.log(`[DiscordService] Logged in as ${this.client.user.tag}!`);
    });

    this.client.login(token);
  }

  async sendMessage(channelId: string, message: string): Promise<string> {
    try {
      const channel = (await this.client.channels.fetch(channelId)) as TextChannel;
      if (!channel || !channel.isTextBased()) {
        throw new Error('Channel not found or is not a text channel.');
      }
      await channel.send(message);
      return `Message sent to channel ${channelId}`;
    } catch (error) {
      console.error(`[DiscordService] Failed to send message:`, error);
      return `Error: ${error.message}`;
    }
  }
}