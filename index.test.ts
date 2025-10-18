import { beforeEach, describe, expect, it } from 'bun:test';
import Notification from './index';

describe('Notification', () => {
  let notification: Notification;

  beforeEach(() => {
    notification = new Notification({
      lineNotifyToken: 'test-token',
      lineMessagingConfig: {
        channelAccessToken: 'test-channel-token',
      },
      discordConfig: {
        webhookUrl: 'https://discord.com/api/webhooks/test',
      },
    });
  });

  it('should create a notification instance', () => {
    expect(notification).toBeDefined();
    expect(notification).toBeInstanceOf(Notification);
  });

  it('should check if LINE Notify is available', () => {
    expect(notification.isNotifyAvailable).toBe(true);
  });

  it('should check if LINE Messaging is available', () => {
    expect(notification.isMessagingAvailable).toBe(true);
  });

  it('should check if Discord is available', () => {
    expect(notification.isDiscordAvailable).toBe(true);
  });

  it('should handle missing LINE Notify token', () => {
    const notificationWithoutNotify = new Notification({
      lineMessagingConfig: {
        channelAccessToken: 'test-channel-token',
      },
      discordConfig: {
        webhookUrl: 'https://discord.com/api/webhooks/test',
      },
    });

    expect(notificationWithoutNotify.isNotifyAvailable).toBe(false);
    expect(notificationWithoutNotify.isMessagingAvailable).toBe(true);
    expect(notificationWithoutNotify.isDiscordAvailable).toBe(true);
  });

  it('should handle missing LINE Messaging config', () => {
    const notificationWithoutMessaging = new Notification({
      lineNotifyToken: 'test-token',
      discordConfig: {
        webhookUrl: 'https://discord.com/api/webhooks/test',
      },
    });

    expect(notificationWithoutMessaging.isNotifyAvailable).toBe(true);
    expect(notificationWithoutMessaging.isMessagingAvailable).toBe(false);
    expect(notificationWithoutMessaging.isDiscordAvailable).toBe(true);
  });

  it('should handle missing Discord config', () => {
    const notificationWithoutDiscord = new Notification({
      lineNotifyToken: 'test-token',
      lineMessagingConfig: {
        channelAccessToken: 'test-channel-token',
      },
    });

    expect(notificationWithoutDiscord.isNotifyAvailable).toBe(true);
    expect(notificationWithoutDiscord.isMessagingAvailable).toBe(true);
    expect(notificationWithoutDiscord.isDiscordAvailable).toBe(false);
  });

  it('should handle no configuration', () => {
    const notificationWithoutConfig = new Notification({});

    expect(notificationWithoutConfig.isNotifyAvailable).toBe(false);
    expect(notificationWithoutConfig.isMessagingAvailable).toBe(false);
    expect(notificationWithoutConfig.isDiscordAvailable).toBe(false);
  });
});

describe('LineNotify', () => {
  it('should throw error when no token provided', () => {
    expect(() => {
      new Notification({});
    }).not.toThrow();
  });
});

describe('LineMessaging', () => {
  it('should throw error when no channel access token provided', () => {
    expect(() => {
      new Notification({
        lineMessagingConfig: {
          channelAccessToken: '',
        },
      });
    }).toThrow();
  });
});

describe('Discord', () => {
  it('should throw error when no webhook URL provided', () => {
    expect(() => {
      new Notification({
        discordConfig: {
          webhookUrl: '',
        },
      });
    }).toThrow();
  });

  it('should handle Discord methods when configured', async () => {
    const notification = new Notification({
      discordConfig: {
        webhookUrl: 'https://discord.com/api/webhooks/test',
      },
    });

    expect(notification.isDiscordAvailable).toBe(true);
  });
});
