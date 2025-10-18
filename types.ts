// LINE Notify Types
export interface LineNotifyOptions {
  message: string;
  imageUrl?: string;
  imageThumbnail?: string;
  imageFullsize?: string;
  stickerPackageId?: number;
  stickerId?: number;
  notificationDisabled?: boolean;
}

export interface LineNotifyResult {
  status: number;
  message: string;
}

// LINE Messaging API Types
export interface LineMessagingConfig {
  channelAccessToken: string;
  channelSecret?: string;
}

export interface LineMessage {
  type:
    | 'text'
    | 'image'
    | 'video'
    | 'audio'
    | 'file'
    | 'location'
    | 'sticker'
    | 'imagemap'
    | 'template'
    | 'flex';
  text?: string;
  originalContentUrl?: string;
  previewImageUrl?: string;
  duration?: number;
  title?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  packageId?: string;
  stickerId?: string;
  altText?: string;
  template?: any;
  flex?: any;
  imagemap?: any;
}

export interface LinePushMessage {
  to: string;
  messages: LineMessage[];
}

export interface LineReplyMessage {
  replyToken: string;
  messages: LineMessage[];
}

export interface LineMulticastMessage {
  to: string[];
  messages: LineMessage[];
}

export interface LineMessagingResult {
  success: boolean;
  error?: string;
  response?: any;
}

// Unified Types
export interface BunNotificationConfig {
  lineNotifyToken?: string;
  lineMessagingConfig?: LineMessagingConfig;
  defaultApi?: 'notify' | 'messaging';
}

export interface NotificationResult {
  success: boolean;
  error?: string;
  data?: any;
}

// Message Builder Types
export interface TextMessage {
  type: 'text';
  text: string;
}

export interface ImageMessage {
  type: 'image';
  originalContentUrl: string;
  previewImageUrl: string;
}

export interface StickerMessage {
  type: 'sticker';
  packageId: string;
  stickerId: string;
}

export interface LocationMessage {
  type: 'location';
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface FlexMessage {
  type: 'flex';
  altText: string;
  contents: any;
}

export interface TemplateMessage {
  type: 'template';
  altText: string;
  template: any;
}
