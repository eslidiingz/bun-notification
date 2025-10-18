# Bun Notification

A comprehensive notification library for Bun that supports LINE Notify, LINE Messaging API, and Discord webhooks with full feature support.

[![npm version](https://badge.fury.io/js/bun-notification.svg)](https://badge.fury.io/js/bun-notification)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bun](https://img.shields.io/badge/Bun-1.0+-black)](https://bun.sh)

## Features

- 🔔 **LINE Notify Support**: Send notifications through LINE Notify API
- 💬 **LINE Messaging API**: Full support for push, reply, and multicast messages
- 🎮 **Discord Webhook Support**: Send messages to Discord channels via webhooks
- 🎨 **Rich Messages**: Support for text, images, stickers, location, and more
- 🎯 **Template Messages**: Button, confirm, carousel, and image carousel templates
- 🎪 **Flex Messages**: Create rich, interactive messages with Flex Message
- 🔄 **Unified API**: Single interface for all notification services
- ⚡ **Built with Bun**: Optimized for Bun runtime with TypeScript support
- 🛡️ **Type-safe**: Full TypeScript support with comprehensive type definitions
- 🔧 **Message Builders**: Helper methods for creating complex messages

## Installation

```bash
# Using Bun (recommended)
bun add bun-notification

# Using npm
npm install bun-notification

# Using yarn
yarn add bun-notification

# Using pnpm
pnpm add bun-notification
```

## Quick Start

### LINE Notify

```typescript
import Notification from 'bun-notification';

// Initialize with LINE Notify token
const notification = new Notification({
  lineNotifyToken: 'YOUR_LINE_NOTIFY_TOKEN',
  defaultApi: 'notify',
});

// Send a simple text message
await notification.sendNotifyText('Hello from Bun!');
```

### LINE Messaging API

```typescript
import Notification from 'bun-notification';

// Initialize with Messaging API config
const notification = new Notification({
  lineMessagingConfig: {
    channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
    channelSecret: 'YOUR_CHANNEL_SECRET',
  },
  defaultApi: 'messaging',
});

// Push message to specific user
await notification.pushMessage({
  to: 'USER_ID',
  messages: [
    {
      type: 'text',
      text: 'Hello from LINE Messaging API!',
    },
  ],
});
```

### Discord

```typescript
import Notification from 'bun-notification';

// Initialize with Discord webhook URL
const notification = new Notification({
  discordConfig: {
    webhookUrl: 'YOUR_DISCORD_WEBHOOK_URL',
  },
  defaultApi: 'discord',
});

// Send a simple text message
await notification.sendDiscordText('Hello from Bun!');
```

### Unified API

```typescript
import Notification from 'bun-notification';

// Initialize with all APIs
const notification = new Notification({
  lineNotifyToken: 'YOUR_LINE_NOTIFY_TOKEN',
  lineMessagingConfig: {
    channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
  },
  discordConfig: {
    webhookUrl: 'YOUR_DISCORD_WEBHOOK_URL',
  },
});

// Simple message (uses LINE Notify by default)
await notification.send('Hello from unified API!');

// Message to specific user (uses Messaging API)
await notification.send('Hello user!', { to: 'USER_ID' });

// Message to Discord
await notification.send('Hello Discord!', {
  discordOptions: {
    username: 'Bun Bot',
  },
});
```

## Authentication Setup

### LINE Notify

1. Go to [LINE Notify](https://notify-bot.line.me/)
2. Log in with your LINE account
3. Click "My page" → "Generate token"
4. Enter a token name and select a chat/group
5. Copy the generated token

### LINE Messaging API

1. Go to [LINE Developers Console](https://developers.line.biz/)
2. Create a new provider and channel
3. Choose "Messaging API" as the channel type
4. Get your Channel Access Token and Channel Secret
5. Set up webhook URL for receiving messages

### Discord Webhook

1. Go to your Discord server settings
2. Navigate to "Integrations" → "Webhooks"
3. Click "New Webhook"
4. Configure the webhook name and channel
5. Copy the webhook URL

## API Reference

### Notification

Main notification class that supports LINE Notify, Messaging API, and Discord.

#### Constructor

```typescript
new Notification(config: NotificationConfig)
```

#### Configuration

```typescript
interface NotificationConfig {
  lineNotifyToken?: string; // LINE Notify token
  lineMessagingConfig?: {
    // LINE Messaging API config
    channelAccessToken: string;
    channelSecret?: string;
  };
  discordConfig?: {
    // Discord webhook config
    webhookUrl: string;
  };
  defaultApi?: 'notify' | 'messaging' | 'discord'; // Default API to use
}
```

#### Methods

**LINE Notify Methods:**

- `sendNotify(options: LineNotifyOptions): Promise<NotificationResult>`
- `sendNotifyText(message: string): Promise<NotificationResult>`
- `sendNotifyImage(message: string, imageUrl: string, thumbnailUrl?: string): Promise<NotificationResult>`
- `sendNotifySticker(message: string, packageId: number, stickerId: number): Promise<NotificationResult>`

**LINE Messaging API Methods:**

- `pushMessage(message: LinePushMessage): Promise<NotificationResult>`
- `replyMessage(message: LineReplyMessage): Promise<NotificationResult>`
- `multicastMessage(message: LineMulticastMessage): Promise<NotificationResult>`

**Discord Methods:**

- `sendDiscord(options: DiscordMessageOptions): Promise<NotificationResult>`
- `sendDiscordText(content: string): Promise<NotificationResult>`
- `sendDiscordEmbed(embed: any): Promise<NotificationResult>`
- `sendDiscordWithUsername(content: string, username: string): Promise<NotificationResult>`

**Unified Method:**

- `send(message: string, options?: SendOptions): Promise<NotificationResult>`

#### Properties

- `isNotifyAvailable: boolean` - Check if LINE Notify is configured
- `isMessagingAvailable: boolean` - Check if Messaging API is configured
- `isDiscordAvailable: boolean` - Check if Discord is configured

### Message Types

#### LINE - Text Message

```typescript
{
  type: 'text',
  text: 'Hello World!'
}
```

#### LINE - Image Message

```typescript
{
  type: 'image',
  originalContentUrl: 'https://example.com/image.jpg',
  previewImageUrl: 'https://example.com/preview.jpg'
}
```

#### LINE - Sticker Message

```typescript
{
  type: 'sticker',
  packageId: '11537',
  stickerId: '52002734'
}
```

#### LINE - Location Message

```typescript
{
  type: 'location',
  title: 'My Location',
  address: 'Tokyo, Japan',
  latitude: 35.6762,
  longitude: 139.6503
}
```

#### Discord - Message Options

```typescript
{
  content: 'Hello World!',
  username: 'Custom Bot Name',
  avatar_url: 'https://example.com/avatar.png',
  tts: false,
  embeds: [
    {
      title: 'Embed Title',
      description: 'Embed Description',
      color: 0x00ff00,
      fields: [
        {
          name: 'Field Name',
          value: 'Field Value',
          inline: true
        }
      ]
    }
  ]
}
```

#### LINE - Template Messages

**Button Template:**

```typescript
{
  type: 'template',
  altText: 'Button Template',
  template: {
    type: 'buttons',
    text: 'Choose an option:',
    actions: [
      {
        type: 'postback',
        label: 'Option 1',
        data: 'action=option1'
      }
    ]
  }
}
```

**Carousel Template:**

```typescript
{
  type: 'template',
  altText: 'Product Carousel',
  template: {
    type: 'carousel',
    columns: [
      {
        thumbnailImageUrl: 'https://example.com/image1.jpg',
        title: 'Product 1',
        text: 'Description',
        actions: [
          {
            type: 'postback',
            label: 'Buy',
            data: 'action=buy&item=1'
          }
        ]
      }
    ]
  }
}
```

## Examples

Check out the [examples directory](./examples/) for complete working examples:

- [LINE Notify Example](./examples/line-notify-example.ts)
- [LINE Messaging API Example](./examples/line-messaging-example.ts)
- [Discord Example](./examples/discord-example.ts)
- [Unified API Example](./examples/unified-example.ts)

## Development

### Prerequisites

- [Bun](https://bun.sh) 1.0 or higher
- Node.js 18+ (for fallback compatibility)

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/bun-notification.git
cd bun-notification

# Install dependencies
bun install

# Build the library
bun run build

# Run tests
bun test

# Run linting
bun run lint

# Format code
bun run format
```

### Scripts

- `bun run build` - Build the library for production
- `bun run dev` - Development mode with watch
- `bun test` - Run tests
- `bun run lint` - Run linting
- `bun run format` - Format code
- `bun run check` - Run all checks (lint + format)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this library helpful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📖 Improving documentation

---

Made with ❤️ using Bun
