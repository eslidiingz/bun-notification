import Notification from '../index';

// Example: Unified API usage (both LINE Notify and Messaging API)
async function unifiedExample() {
  // Initialize with both APIs
  const notification = new Notification({
    lineNotifyToken: 'YOUR_LINE_NOTIFY_TOKEN_HERE',
    lineMessagingConfig: {
      channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN_HERE',
      channelSecret: 'YOUR_CHANNEL_SECRET_HERE',
    },
    defaultApi: 'notify', // Default to LINE Notify for simple messages
  });

  console.log('LINE Notify available:', notification.isNotifyAvailable);
  console.log('LINE Messaging available:', notification.isMessagingAvailable);

  // Simple text message (will use LINE Notify by default)
  const simpleResult = await notification.send('Hello from unified API!');
  console.log('Simple message result:', simpleResult);

  // Message with image (will use LINE Notify)
  const imageResult = await notification.send('Check out this image!', {
    imageUrl: 'https://example.com/image.jpg',
  });
  console.log('Image message result:', imageResult);

  // Message with sticker (will use LINE Notify)
  const stickerResult = await notification.send('Here is a sticker!', {
    stickerPackageId: 11537,
    stickerId: 52002734,
  });
  console.log('Sticker message result:', stickerResult);

  // Message to specific user (will use Messaging API)
  const userResult = await notification.send('Hello specific user!', {
    to: 'USER_ID_HERE',
  });
  console.log('User message result:', userResult);

  // Message to multiple users (will use Messaging API)
  const multiUserResult = await notification.send('Hello multiple users!', {
    to: ['USER_ID_1', 'USER_ID_2'],
  });
  console.log('Multi-user message result:', multiUserResult);

  // Reply message (will use Messaging API)
  const replyResult = await notification.send('This is a reply!', {
    replyToken: 'REPLY_TOKEN_HERE',
  });
  console.log('Reply message result:', replyResult);

  // Complex message with multiple message types (will use Messaging API)
  const complexResult = await notification.send('Complex message', {
    to: 'USER_ID_HERE',
    messages: [
      {
        type: 'text',
        text: 'Here are multiple messages:',
      },
      {
        type: 'image',
        originalContentUrl: 'https://example.com/image.jpg',
        previewImageUrl: 'https://example.com/preview.jpg',
      },
      {
        type: 'sticker',
        packageId: '11537',
        stickerId: '52002734',
      },
    ],
  });
  console.log('Complex message result:', complexResult);
}

// Example: Error handling
async function errorHandlingExample() {
  const notification = new Notification({
    // No tokens configured - will show error handling
  });

  const result = await notification.send('This will fail');
  console.log('Error handling result:', result);

  if (!result.success) {
    console.log('Error message:', result.error);
  }
}

// Run the examples
unifiedExample().catch(console.error);
errorHandlingExample().catch(console.error);
