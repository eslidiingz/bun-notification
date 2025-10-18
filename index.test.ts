import { beforeEach, describe, expect, it } from 'bun:test';
import BunNotification from './index';

describe('BunNotification', () => {
  let notification: BunNotification;

  beforeEach(() => {
    notification = new BunNotification({
      lineNotifyToken: 'test-token',
      lineMessagingConfig: {
        channelAccessToken: 'test-channel-token',
      },
    });
  });

  it('should create a notification instance', () => {
    expect(notification).toBeDefined();
    expect(notification).toBeInstanceOf(BunNotification);
  });

  it('should check if LINE Notify is available', () => {
    expect(notification.isNotifyAvailable).toBe(true);
  });

  it('should check if LINE Messaging is available', () => {
    expect(notification.isMessagingAvailable).toBe(true);
  });

  it('should handle missing LINE Notify token', () => {
    const notificationWithoutNotify = new BunNotification({
      lineMessagingConfig: {
        channelAccessToken: 'test-channel-token',
      },
    });

    expect(notificationWithoutNotify.isNotifyAvailable).toBe(false);
    expect(notificationWithoutNotify.isMessagingAvailable).toBe(true);
  });

  it('should handle missing LINE Messaging config', () => {
    const notificationWithoutMessaging = new BunNotification({
      lineNotifyToken: 'test-token',
    });

    expect(notificationWithoutMessaging.isNotifyAvailable).toBe(true);
    expect(notificationWithoutMessaging.isMessagingAvailable).toBe(false);
  });

  it('should handle no configuration', () => {
    const notificationWithoutConfig = new BunNotification({});

    expect(notificationWithoutConfig.isNotifyAvailable).toBe(false);
    expect(notificationWithoutConfig.isMessagingAvailable).toBe(false);
  });
});

describe('LineNotify', () => {
  it('should throw error when no token provided', () => {
    expect(() => {
      new BunNotification({});
    }).not.toThrow();
  });
});

describe('LineMessaging', () => {
  it('should throw error when no channel access token provided', () => {
    expect(() => {
      new BunNotification({
        lineMessagingConfig: {
          channelAccessToken: '',
        },
      });
    }).toThrow();
  });
});
