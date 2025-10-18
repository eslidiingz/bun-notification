import type {
  DiscordMessageOptions,
  DiscordResult,
  NotificationResult,
} from './types';

export class Discord {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    if (!webhookUrl) {
      throw new Error('Discord webhook URL is required');
    }
    this.webhookUrl = webhookUrl;
  }

  async send(options: DiscordMessageOptions): Promise<NotificationResult> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      if (response.ok) {
        return {
          success: true,
          data: await response.text(),
        };
      } else {
        const errorData = await response.text();
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText} - ${errorData}`,
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

  async sendText(content: string): Promise<NotificationResult> {
    return this.send({ content });
  }

  async sendEmbed(embed: any): Promise<NotificationResult> {
    return this.send({ embeds: [embed] });
  }

  async sendWithUsername(
    content: string,
    username: string
  ): Promise<NotificationResult> {
    return this.send({ content, username });
  }

  async sendWithAvatar(
    content: string,
    avatarUrl: string
  ): Promise<NotificationResult> {
    return this.send({ content, avatar_url: avatarUrl });
  }

  async sendTTS(content: string): Promise<NotificationResult> {
    return this.send({ content, tts: true });
  }
}
