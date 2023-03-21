// import processArgs, { ProcessArgs } from 'args';
// import { initializeBot } from './initializeBot';

// import { botlikeConfig } from 'config/bot/botConfig';

// import Botlike from 'src/botlike/core';

// const processArgsMock: ProcessArgs = {
//   authStrategy: 'local',
//   // debug: z.boolean().optional(),
//   // introspect: z.boolean().optional(),
//   // mode: z.enum(botTypes).optional(), // Bot mode => Loading of different Bot types
//   // sessionPath: z.string().optional(),
//   // sessionClientId: z.string().optional(),
// };

// in-source test suites
if (import.meta.vitest) {
  const { it, describe, test, expect } = import.meta.vitest;

  it('initialize bot success', async () => {
    // expect(await initializeBot())
    expect('TODO').toStrictEqual('TASK-COMPLETED');
  });
}
