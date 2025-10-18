import { LineMessaging } from './line-messaging';
import { LineNotify } from './line-notify';
import type {
  BunNotificationConfig,
  LineMessage,
  LineMulticastMessage,
  LineNotifyOptions,
  LinePushMessage,
  LineReplyMessage,
  NotificationResult,
} from './types';

export class BunNotification {
  private lineNotify?: LineNotify;
  private lineMessaging?: LineMessaging;
  private config: BunNotificationConfig;

  constructor(config: BunNotificationConfig) {
    this.config = config;

    if (config.lineNotifyToken) {
      this.lineNotify = new LineNotify(config.lineNotifyToken);
    }

    if (config.lineMessagingConfig) {
      this.lineMessaging = new LineMessaging(config.lineMessagingConfig);
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
    }
  ): Promise<NotificationResult> {
    const defaultApi = this.config.defaultApi || 'notify';

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
}

export { LineMessaging } from './line-messaging';
// Export all classes and types
export { LineNotify } from './line-notify';
export * from './types';

// Default export
export default BunNotification;
