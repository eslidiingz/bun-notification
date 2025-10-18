import type {
  FlexMessage,
  ImageMessage,
  LineMessage,
  LineMessagingConfig,
  LineMessagingResult,
  LineMulticastMessage,
  LinePushMessage,
  LineReplyMessage,
  LocationMessage,
  StickerMessage,
  TemplateMessage,
  TextMessage,
} from './types';

export class LineMessaging {
  private config: LineMessagingConfig;
  private baseUrl = 'https://api.line.me/v2/bot';

  constructor(config: LineMessagingConfig) {
    if (!config.channelAccessToken) {
      throw new Error('Channel access token is required');
    }
    this.config = config;
  }

  async push(message: LinePushMessage): Promise<LineMessagingResult> {
    try {
      const response = await fetch(`${this.baseUrl}/message/push`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.config.channelAccessToken}`,
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        return {
          success: true,
          response: await response.json(),
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error:
            errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`,
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

  async reply(message: LineReplyMessage): Promise<LineMessagingResult> {
    try {
      const response = await fetch(`${this.baseUrl}/message/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.config.channelAccessToken}`,
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        return {
          success: true,
          response: await response.json(),
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error:
            errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`,
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

  async multicast(message: LineMulticastMessage): Promise<LineMessagingResult> {
    try {
      const response = await fetch(`${this.baseUrl}/message/multicast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.config.channelAccessToken}`,
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        return {
          success: true,
          response: await response.json(),
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error:
            errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`,
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

  // Message builders
  static createTextMessage(text: string): TextMessage {
    return {
      type: 'text',
      text,
    };
  }

  static createImageMessage(
    originalContentUrl: string,
    previewImageUrl: string
  ): ImageMessage {
    return {
      type: 'image',
      originalContentUrl,
      previewImageUrl,
    };
  }

  static createStickerMessage(
    packageId: string,
    stickerId: string
  ): StickerMessage {
    return {
      type: 'sticker',
      packageId,
      stickerId,
    };
  }

  static createLocationMessage(
    title: string,
    address: string,
    latitude: number,
    longitude: number
  ): LocationMessage {
    return {
      type: 'location',
      title,
      address,
      latitude,
      longitude,
    };
  }

  static createFlexMessage(altText: string, contents: any): FlexMessage {
    return {
      type: 'flex',
      altText,
      contents,
    };
  }

  static createTemplateMessage(
    altText: string,
    template: any
  ): TemplateMessage {
    return {
      type: 'template',
      altText,
      template,
    };
  }

  // Template builders
  static createButtonTemplate(text: string, actions: any[]): any {
    return {
      type: 'buttons',
      text,
      actions,
    };
  }

  static createConfirmTemplate(text: string, actions: any[]): any {
    return {
      type: 'confirm',
      text,
      actions,
    };
  }

  static createCarouselTemplate(columns: any[]): any {
    return {
      type: 'carousel',
      columns,
    };
  }

  static createImageCarouselTemplate(columns: any[]): any {
    return {
      type: 'image_carousel',
      columns,
    };
  }

  // Action builders
  static createPostbackAction(label: string, data: string, text?: string): any {
    return {
      type: 'postback',
      label,
      data,
      text,
    };
  }

  static createMessageAction(label: string, text: string): any {
    return {
      type: 'message',
      label,
      text,
    };
  }

  static createUriAction(label: string, uri: string): any {
    return {
      type: 'uri',
      label,
      uri,
    };
  }

  static createDatetimePickerAction(
    label: string,
    data: string,
    mode: 'date' | 'time' | 'datetime',
    initial?: string,
    max?: string,
    min?: string
  ): any {
    return {
      type: 'datetimepicker',
      label,
      data,
      mode,
      initial,
      max,
      min,
    };
  }

  static createCameraAction(label: string): any {
    return {
      type: 'camera',
      label,
    };
  }

  static createCameraRollAction(label: string): any {
    return {
      type: 'cameraroll',
      label,
    };
  }

  static createLocationAction(label: string): any {
    return {
      type: 'location',
      label,
    };
  }
}
