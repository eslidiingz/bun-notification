import BunNotification from '../index';

// Example: LINE Notify usage
async function lineNotifyExample() {
  // Initialize with LINE Notify token
  const notification = new BunNotification({
    lineNotifyToken: 'YOUR_LINE_NOTIFY_TOKEN_HERE',
    defaultApi: 'notify',
  });

  console.log('LINE Notify available:', notification.isNotifyAvailable);

  // Send simple text message
  const textResult = await notification.sendNotifyText(
    'Hello from Bun! This is a test message.'
  );
  console.log('Text message result:', textResult);

  // Send message with image
  const imageResult = await notification.sendNotifyImage(
    'Check out this image!',
    'https://example.com/image.jpg',
    'https://example.com/thumbnail.jpg'
  );
  console.log('Image message result:', imageResult);

  // Send message with sticker
  const stickerResult = await notification.sendNotifySticker(
    'Here is a sticker!',
    11537, // Package ID
    52002734 // Sticker ID
  );
  console.log('Sticker message result:', stickerResult);

  // Send silent notification (no push notification)
  const silentResult = await notification.sendNotify({
    message: 'This is a silent notification',
    notificationDisabled: true,
  });
  console.log('Silent message result:', silentResult);

  // Using unified send method
  const unifiedResult = await notification.send('Hello from unified method!');
  console.log('Unified send result:', unifiedResult);
}

// Run the example
lineNotifyExample().catch(console.error);
