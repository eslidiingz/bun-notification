import type {
  LineNotifyOptions,
  LineNotifyResult,
  NotificationResult,
} from './types';

export class LineNotify {
  private token: string;
  private baseUrl = 'https://notify-api.line.me/api/notify';

  constructor(token: string) {
    if (!token) {
      throw new Error('LINE Notify token is required');
    }
    this.token = token;
  }

  async send(options: LineNotifyOptions): Promise<NotificationResult> {
    try {
      const formData = new FormData();
      formData.append('message', options.message);

      if (options.imageUrl) {
        formData.append('imageUrl', options.imageUrl);
      }

      if (options.imageThumbnail) {
        formData.append('imageThumbnail', options.imageThumbnail);
      }

      if (options.imageFullsize) {
        formData.append('imageFullsize', options.imageFullsize);
      }

      if (options.stickerPackageId) {
        formData.append(
          'stickerPackageId',
          options.stickerPackageId.toString()
        );
      }

      if (options.stickerId) {
        formData.append('stickerId', options.stickerId.toString());
      }

      if (options.notificationDisabled !== undefined) {
        formData.append(
          'notificationDisabled',
          options.notificationDisabled.toString()
        );
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: formData,
      });

      const result: LineNotifyResult = await response.json();

      if (response.ok && result.status === 200) {
        return {
          success: true,
          data: result,
        };
      } else {
        return {
          success: false,
          error:
            result.message || `HTTP ${response.status}: ${response.statusText}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async sendText(message: string): Promise<NotificationResult> {
    return this.send({ message });
  }

  async sendImage(
    message: string,
    imageUrl: string,
    thumbnailUrl?: string
  ): Promise<NotificationResult> {
    return this.send({
      message,
      imageUrl,
      imageThumbnail: thumbnailUrl,
    });
  }

  async sendSticker(
    message: string,
    packageId: number,
    stickerId: number
  ): Promise<NotificationResult> {
    return this.send({
      message,
      stickerPackageId: packageId,
      stickerId,
    });
  }

  async sendSilent(message: string): Promise<NotificationResult> {
    return this.send({
      message,
      notificationDisabled: true,
    });
  }
}
