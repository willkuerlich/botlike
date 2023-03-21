import { service } from 'src/botlike/bot/test/state/machine';
// import { service } from 'src/botlike/bot/default/state/PromptMachine';

export const testBot = () => {
  return {
    name: 'TestBot',
    actions: {},
    service,
  };
};
