import { LineMessaging } from './line-messaging';
import { LineNotify } from './line-notify';
import { Discord } from './discord';
import type {
  NotificationConfig,
  DiscordMessageOptions,
  LineMessage,
  LineMulticastMessage,
  LineNotifyOptions,
  LinePushMessage,
  LineReplyMessage,
  NotificationResult,
} from './types';

export class Notification {
  private lineNotify?: LineNotify;
  private lineMessaging?: LineMessaging;
  private discord?: Discord;
  private config: NotificationConfig;

  constructor(config: NotificationConfig) {
    this.config = config;

    if (config.lineNotifyToken) {
      this.lineNotify = new LineNotify(config.lineNotifyToken);
    }

    if (config.lineMessagingConfig) {
      this.lineMessaging = new LineMessaging(config.lineMessagingConfig);
    }

    if (config.discordConfig) {
      this.discord = new Discord(config.discordConfig.webhookUrl);
    }
  }

  // LINE Notify methods
  async sendNotify(options: LineNotifyOptions): Promise<NotificationResult> {
    if (!this.lineNotify) {
      return {
        success: false,
        error: 'LINE Notify token not configured',
      };
    }

    return await this.lineNotify.send(options);
  }

  async sendNotifyText(message: string): Promise<NotificationResult> {
    if (!this.lineNotify) {
      return {
        success: false,
        error: 'LINE Notify token not configured',
      };
    }

    return await this.lineNotify.sendText(message);
  }

  async sendNotifyImage(
    message: string,
    imageUrl: string,
    thumbnailUrl?: string
  ): Promise<NotificationResult> {
    if (!this.lineNotify) {
      return {
        success: false,
        error: 'LINE Notify token not configured',
      };
    }

    return await this.lineNotify.sendImage(message, imageUrl, thumbnailUrl);
  }

  async sendNotifySticker(
    message: string,
    packageId: number,
    stickerId: number
  ): Promise<NotificationResult> {
    if (!this.lineNotify) {
      return {
        success: false,
        error: 'LINE Notify token not configured',
      };
    }

    return await this.lineNotify.sendSticker(message, packageId, stickerId);
  }

  // LINE Messaging API methods
  async pushMessage(message: LinePushMessage): Promise<NotificationResult> {
    if (!this.lineMessaging) {
      return {
        success: false,
        error: 'LINE Messaging API not configured',
      };
    }

    const result = await this.lineMessaging.push(message);
    return {
      success: result.success,
      error: result.error,
      data: result.response,
    };
  }

  async replyMessage(message: LineReplyMessage): Promise<NotificationResult> {
    if (!this.lineMessaging) {
      return {
        success: false,
        error: 'LINE Messaging API not configured',
      };
    }

    const result = await this.lineMessaging.reply(message);
    return {
      success: result.success,
      error: result.error,
      data: result.response,
    };
  }

  async multicastMessage(
    message: LineMulticastMessage
  ): Promise<NotificationResult> {
    if (!this.lineMessaging) {
      return {
        success: false,
        error: 'LINE Messaging API not configured',
      };
    }

    const result = await this.lineMessaging.multicast(message);
    return {
      success: result.success,
      error: result.error,
      data: result.response,
    };
  }

  // Discord methods
  async sendDiscord(
    options: DiscordMessageOptions
  ): Promise<NotificationResult> {
    if (!this.discord) {
      return {
        success: false,
        error: 'Discord webhook not configured',
      };
    }

    return await this.discord.send(options);
  }

  async sendDiscordText(content: string): Promise<NotificationResult> {
    if (!this.discord) {
      return {
        success: false,
        error: 'Discord webhook not configured',
      };
    }

    return await this.discord.sendText(content);
  }

  async sendDiscordEmbed(embed: any): Promise<NotificationResult> {
    if (!this.discord) {
      return {
        success: false,
        error: 'Discord webhook not configured',
      };
    }

    return await this.discord.sendEmbed(embed);
  }

  async sendDiscordWithUsername(
    content: string,
    username: string
  ): Promise<NotificationResult> {
    if (!this.discord) {
      return {
        success: false,
        error: 'Discord webhook not configured',
      };
    }

    return await this.discord.sendWithUsername(content, username);
  }

  // Unified send method (auto-detect API)
  async send(
    message: string,
    options?: {
      to?: string | string[];
      replyToken?: string;
      imageUrl?: string;
      stickerPackageId?: number;
      stickerId?: number;
      messages?: LineMessage[];
      discordOptions?: DiscordMessageOptions;
    }
  ): Promise<NotificationResult> {
    const defaultApi = this.config.defaultApi || 'notify';

    // If Discord options are provided, use Discord
    if (options?.discordOptions && this.discord) {
      return await this.sendDiscord({
        content: message,
        ...options.discordOptions,
      });
    }

    // If specific messages are provided, use Messaging API
    if (options?.messages) {
      if (!this.lineMessaging) {
        return {
          success: false,
          error: 'LINE Messaging API not configured',
        };
      }

      if (options.replyToken) {
        return await this.replyMessage({
          replyToken: options.replyToken,
          messages: options.messages,
        });
      } else if (options.to) {
        const to = Array.isArray(options.to) ? options.to : [options.to];
        if (to.length === 1) {
          return await this.pushMessage({
            to: to[0],
            messages: options.messages,
          });
        } else {
          return await this.multicastMessage({
            to,
            messages: options.messages,
          });
        }
      }
    }

    // Use LINE Notify for simple text messages
    if (defaultApi === 'notify' && this.lineNotify) {
      if (options?.imageUrl) {
        return await this.sendNotifyImage(message, options.imageUrl);
      } else if (options?.stickerPackageId && options?.stickerId) {
        return await this.sendNotifySticker(
          message,
          options.stickerPackageId,
          options.stickerId
        );
      } else {
        return await this.sendNotifyText(message);
      }
    }

    // Use Discord for simple text messages if it's the default
    if (defaultApi === 'discord' && this.discord) {
      return await this.sendDiscordText(message);
    }

    // Fallback to Messaging API if Notify is not available
    if (this.lineMessaging && options?.to) {
      const messages: LineMessage[] = [];

      if (options.imageUrl) {
        messages.push({
          type: 'image',
          originalContentUrl: options.imageUrl,
          previewImageUrl: options.imageUrl,
        });
      } else if (options.stickerPackageId && options.stickerId) {
        messages.push({
          type: 'sticker',
          packageId: options.stickerPackageId.toString(),
          stickerId: options.stickerId.toString(),
        });
      } else {
        messages.push({
          type: 'text',
          text: message,
        });
      }

      const to = Array.isArray(options.to) ? options.to : [options.to];
      if (to.length === 1) {
        return await this.pushMessage({
          to: to[0],
          messages,
        });
      } else {
        return await this.multicastMessage({
          to,
          messages,
        });
      }
    }

    return {
      success: false,
      error: 'No suitable API configured for this request',
    };
  }

  // Utility methods
  get isNotifyAvailable(): boolean {
    return !!this.lineNotify;
  }

  get isMessagingAvailable(): boolean {
    return !!this.lineMessaging;
  }

  get isDiscordAvailable(): boolean {
    return !!this.discord;
  }
}

export { LineMessaging } from './line-messaging';
export { Discord } from './discord';
// Export all classes and types
export { LineNotify } from './line-notify';
export * from './types';

// Default export
export default Notification;
