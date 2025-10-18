import Notification from '../index';

// Example: Discord notification usage
async function discordExample() {
  // Initialize with Discord webhook URL
  const notification = new Notification({
    discordConfig: {
      webhookUrl: 'YOUR_DISCORD_WEBHOOK_URL_HERE',
    },
    defaultApi: 'discord',
  });

  console.log('Discord available:', notification.isDiscordAvailable);

  // Send simple text message
  const textResult = await notification.sendDiscordText(
    'Hello from Bun! This is a Discord test message.'
  );
  console.log('Text message result:', textResult);

  // Send message with custom username
  const usernameResult = await notification.sendDiscordWithUsername(
    'Hello with custom username!',
    'Bun Bot'
  );
  console.log('Custom username result:', usernameResult);

  // Send message with embed
  const embedResult = await notification.sendDiscordEmbed({
    title: 'Sample Embed',
    description: 'This is a sample embed sent from Bun notification library',
    color: 0x00ff00, // Green color
    fields: [
      {
        name: 'Field 1',
        value: 'This is field 1 value',
        inline: true,
      },
      {
        name: 'Field 2',
        value: 'This is field 2 value',
        inline: true,
      },
    ],
    footer: {
      text: 'Sent from Bun Notification Library',
    },
    timestamp: new Date().toISOString(),
  });
  console.log('Embed message result:', embedResult);

  // Send complex message with all options
  const complexResult = await notification.sendDiscord({
    content: 'Hello Discord!',
    username: 'Bun Notification Bot',
    avatar_url: 'https://bun.sh/logo.png',
    tts: false,
    embeds: [
      {
        title: 'Complex Message',
        description: 'This message includes multiple embeds and options',
        color: 0xff0000, // Red color
        author: {
          name: 'Bun Notification Library',
          url: 'https://github.com',
        },
        fields: [
          {
            name: 'Feature',
            value: 'Supports Discord webhooks',
            inline: true,
          },
          {
            name: 'Runtime',
            value: 'Built with Bun',
            inline: true,
          },
        ],
      },
    ],
  });
  console.log('Complex message result:', complexResult);

  // Using unified send method
  const unifiedResult = await notification.send('Hello from unified method!', {
    discordOptions: {
      username: 'Unified Bot',
      embeds: [
        {
          title: 'Unified Method',
          description: 'This was sent using the unified send method',
          color: 0x0000ff, // Blue color
        },
      ],
    },
  });
  console.log('Unified send result:', unifiedResult);
}

// Run the example
discordExample().catch(console.error);
