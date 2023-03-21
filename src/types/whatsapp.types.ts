import { Client, Message } from 'whatsapp-web.js';

/** temporal interface extension (caption not defined in type) */
export type WhatsappMessage = Message & {
  caption?: string;
  _data?: {
    body?: string;
  };
};

export type WhatsappClient = Client;
