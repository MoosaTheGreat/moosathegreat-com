import { Injectable } from '@nestjs/common';
import { AiService } from './ai.service';
import { PrismaService } from './prisma.service';
import { DiscordService } from './discord.service';

interface ActionBlock {
  type: 'AI_CALL' | 'DB_QUERY' | 'DISCORD_MESSAGE' | 'SYSTEM_LOG';
  params: any;
}

interface LogicFlow {
  blocks: ActionBlock[];
}

@Injectable()
export class VisualCodingService {
  constructor(
    private aiService: AiService,
    private prisma: PrismaService,
    private discordService: DiscordService,
  ) {}

  async executeFlow(flow: LogicFlow, context: any): Promise<any> {
    let lastResult: any = null;

    for (const block of flow.blocks) {
      lastResult = await this.executeBlock(block, context, lastResult);
    }

    return lastResult;
  }

  private async executeBlock(
    block: ActionBlock,
    context: any,
    previousResult: any,
  ): Promise<any> {
    const params = this.interpolateParams(block.params, context, previousResult);

    switch (block.type) {
      case 'AI_CALL':
        return this.aiService.generateText(params.prompt);

      case 'DB_QUERY':
        const { model, operation, query } = params;
        if (!this.prisma[model] || !this.prisma[model][operation]) {
          throw new Error(`Invalid DB operation: ${model}.${operation}`);
        }
        return this.prisma[model]operation;

      case 'DISCORD_MESSAGE':
        return this.discordService.sendMessage(params.channelId, params.message);

      case 'SYSTEM_LOG':
        console.log('[VISUAL_FLOW_LOG]', params.message);
        return `Logged: ${params.message}`;

      default:
        throw new Error(`Unsupported block type: ${block.type}`);
    }
  }

  private interpolateParams(params: any, context: any, previousResult: any): any {
    let paramsString = JSON.stringify(params);

    if (context.args) {
      context.args.forEach((arg, index) => {
        const regex = new RegExp(`{{context.args\\[${index}\\]}}`, 'g');
        paramsString = paramsString.replace(regex, arg);
      });
    }
    if (context.userId) {
      paramsString = paramsString.replace(/{{context.userId}}/g, context.userId);
    }

    if (previousResult) {
      paramsString = paramsString.replace(/{{previousResult}}/g, JSON.stringify(previousResult));
    }

    return JSON.parse(paramsString);
  }
}