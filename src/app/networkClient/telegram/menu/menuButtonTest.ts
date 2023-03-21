import TelegramClient from 'node-telegram-bot-api';

export const buttonMenuTest: TelegramClient.InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      {
        text: 'Push the Button',
        // url: 'https://willkuerlich.com',
        callback_data: 'callback_data',
        // url?: string | undefined;
        // callback_data?: string | undefined;
        // web_app?: WebAppInfo;
        // login_url?: LoginUrl | undefined;
        // switch_inline_query?: string | undefined;
        // switch_inline_query_current_chat?: string | undefined;
        // callback_game?: CallbackGame | undefined;
        // pay?: boolean | undefined;
      },
    ],
  ],
};
