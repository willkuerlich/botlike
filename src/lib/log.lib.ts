// TODO: use some library for logging + add leading padding zero
export const timelogFormat = (date: Date) => {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
};

// import boxen from 'boxen';

// type ReplyFn = (
//   content: MessageContent,
//   chatId?: string | undefined,
//   options?: MessageSendOptions | undefined,
// ) => Promise<Message>;

// function formatReply(replyFn: ReplyFn, replyText: string) {
//   // msg.reply(
//   //   boxen(`\n${answer}`, {
//   //     /* height: 5,  */
//   //     borderStyle: 'round',
//   //     padding: 1,
//   //     margin: 1,
//   //     title: 'Answer:',
//   //     titleAlignment: 'center',
//   //   }),
//   // );
//   console.log('formatReply: ', replyText);
//   replyFn(replyText);
// }
