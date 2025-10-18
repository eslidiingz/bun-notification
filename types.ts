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

// Discord Types
export interface DiscordWebhookConfig {
  webhookUrl: string;
}

export interface DiscordMessageOptions {
  content?: string;
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  embeds?: DiscordEmbed[];
  allowed_mentions?: DiscordAllowedMentions;
}

export interface DiscordEmbed {
  title?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: DiscordEmbedFooter;
  image?: DiscordEmbedImage;
  thumbnail?: DiscordEmbedThumbnail;
  author?: DiscordEmbedAuthor;
  fields?: DiscordEmbedField[];
}

export interface DiscordEmbedFooter {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface DiscordEmbedImage {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface DiscordEmbedThumbnail {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface DiscordEmbedAuthor {
  name?: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface DiscordEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface DiscordAllowedMentions {
  parse?: ('roles' | 'users' | 'everyone')[];
  roles?: string[];
  users?: string[];
  replied_user?: boolean;
}

export interface DiscordResult {
  success: boolean;
  error?: string;
  data?: any;
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
export interface NotificationConfig {
  lineNotifyToken?: string;
  lineMessagingConfig?: LineMessagingConfig;
  discordConfig?: DiscordWebhookConfig;
  defaultApi?: 'notify' | 'messaging' | 'discord';
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
