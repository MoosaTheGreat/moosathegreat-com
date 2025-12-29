import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AiService } from './ai.service';
import { DiscordService } from './discord.service';

export interface PluginDSL {
  hooks: Record<string, PluginAction[]>;
  commands: Record<string, PluginAction[]>;
}

export interface PluginAction {
  type: 'log' | 'db_write' | 'discord_msg' | 'ai_prompt';
  payload: any;
}

@Injectable()
export class PluginEngine implements OnModuleInit {
  private logger = new Logger(PluginEngine.name);
  private hooks = new Map<string, PluginAction[]>();

  constructor(
    private prisma: PrismaService,
    private discordService: DiscordService,
    private aiService: AiService,
  ) {}

  async onModuleInit() {
    await this.loadPlugins();
  }

  async loadPlugins() {
    const plugins = await this.prisma.plugin.findMany({ where: { enabled: true } });
    this.hooks.clear();

    plugins.forEach(plugin => {
      const config = plugin.config as unknown as PluginDSL;
      this.logger.log(`Loading Plugin: ${plugin.name} v${plugin.version}`);
      
      // Register Hooks
      if (config.hooks) {
        Object.keys(config.hooks).forEach(hookName => {
          const current = this.hooks.get(hookName) || [];
          this.hooks.set(hookName, [...current, ...config.hooks[hookName]]);
        });
      }
    });
  }

  async executeHook(hookName: string, context: any) {
    const actions = this.hooks.get(hookName);
    if (!actions) return;

    for (const action of actions) {
      await this.processAction(action, context);
    }
  }

  private async processAction(action: PluginAction, context: any) {
    // Immutable Core Logic: Only pre-defined actions are allowed
    switch (action.type) {
      case 'log':
        this.logger.log(`[Plugin] ${action.payload.message}`);
        break;
      
      case 'discord_msg':
        await this.discordService.sendMessage(action.payload.channelId, action.payload.content);
        break;

      case 'ai_prompt':
        const result = await this.aiService.generateText(action.payload.prompt);
        context.ai_results = context.ai_results || [];
        context.ai_results.push(result);
        break;

      case 'db_write':
        // IMPORTANT: For security, only a whitelist of models can be written to.
        const { model, data } = action.payload;
        switch (model) {
          case 'AuditLog':
            await this.prisma.auditLog.create({ data });
            break;
          case 'UpdateLog':
            await this.prisma.updateLog.create({ data });
            break;
          default:
            this.logger.warn(`[Plugin] Attempted to write to a non-whitelisted model: ${model}`);
        }
        break;

      default:
        this.logger.warn(`[Plugin] Unknown action type: ${action.type}`);
    }
  }
}