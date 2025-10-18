import BunNotification, { LineMessaging } from '../index';

// Example: LINE Messaging API usage
async function lineMessagingExample() {
  // Initialize with LINE Messaging API config
  const notification = new BunNotification({
    lineMessagingConfig: {
      channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN_HERE',
      channelSecret: 'YOUR_CHANNEL_SECRET_HERE',
    },
    defaultApi: 'messaging',
  });

  console.log('LINE Messaging available:', notification.isMessagingAvailable);

  // Push message to specific user
  const pushResult = await notification.pushMessage({
    to: 'USER_ID_HERE',
    messages: [
      {
        type: 'text',
        text: 'Hello from LINE Messaging API!',
      },
    ],
  });
  console.log('Push message result:', pushResult);

  // Reply to a message (when handling webhook)
  const replyResult = await notification.replyMessage({
    replyToken: 'REPLY_TOKEN_HERE',
    messages: [
      {
        type: 'text',
        text: 'This is a reply message!',
      },
    ],
  });
  console.log('Reply message result:', replyResult);

  // Multicast to multiple users
  const multicastResult = await notification.multicastMessage({
    to: ['USER_ID_1', 'USER_ID_2', 'USER_ID_3'],
    messages: [
      {
        type: 'text',
        text: 'This message is sent to multiple users!',
      },
    ],
  });
  console.log('Multicast message result:', multicastResult);

  // Send different message types
  const imageResult = await notification.pushMessage({
    to: 'USER_ID_HERE',
    messages: [
      {
        type: 'image',
        originalContentUrl: 'https://example.com/image.jpg',
        previewImageUrl: 'https://example.com/preview.jpg',
      },
    ],
  });
  console.log('Image message result:', imageResult);

  const stickerResult = await notification.pushMessage({
    to: 'USER_ID_HERE',
    messages: [
      {
        type: 'sticker',
        packageId: '11537',
        stickerId: '52002734',
      },
    ],
  });
  console.log('Sticker message result:', stickerResult);

  // Send location message
  const locationResult = await notification.pushMessage({
    to: 'USER_ID_HERE',
    messages: [
      {
        type: 'location',
        title: 'My Location',
        address: 'Tokyo, Japan',
        latitude: 35.6762,
        longitude: 139.6503,
      },
    ],
  });
  console.log('Location message result:', locationResult);
}

// Example: Using message builders
async function messageBuilderExample() {
  const messaging = new LineMessaging({
    channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN_HERE',
  });

  // Create button template
  const buttonTemplate = LineMessaging.createButtonTemplate(
    'Choose an option:',
    [
      LineMessaging.createPostbackAction(
        'Option 1',
        'action=option1',
        'You chose option 1'
      ),
      LineMessaging.createMessageAction('Option 2', 'I choose option 2'),
      LineMessaging.createUriAction('Visit Website', 'https://example.com'),
    ]
  );

  const templateResult = await messaging.push({
    to: 'USER_ID_HERE',
    messages: [
      LineMessaging.createTemplateMessage('Button Template', buttonTemplate),
    ],
  });
  console.log('Template message result:', templateResult);

  // Create carousel template
  const carouselTemplate = LineMessaging.createCarouselTemplate([
    {
      thumbnailImageUrl: 'https://example.com/image1.jpg',
      title: 'Product 1',
      text: 'Description of product 1',
      actions: [
        LineMessaging.createPostbackAction('Buy', 'action=buy&item=1'),
        LineMessaging.createUriAction(
          'View Details',
          'https://example.com/product1'
        ),
      ],
    },
    {
      thumbnailImageUrl: 'https://example.com/image2.jpg',
      title: 'Product 2',
      text: 'Description of product 2',
      actions: [
        LineMessaging.createPostbackAction('Buy', 'action=buy&item=2'),
        LineMessaging.createUriAction(
          'View Details',
          'https://example.com/product2'
        ),
      ],
    },
  ]);

  const carouselResult = await messaging.push({
    to: 'USER_ID_HERE',
    messages: [
      LineMessaging.createTemplateMessage('Product Carousel', carouselTemplate),
    ],
  });
  console.log('Carousel message result:', carouselResult);
}

// Run the examples
lineMessagingExample().catch(console.error);
messageBuilderExample().catch(console.error);
