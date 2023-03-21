import { ProcessArgs } from 'args';

import { botlikeConfig } from 'config/bot/botConfig';

import Botlike from 'src/botlike/core';

const processArgsMock: ProcessArgs = {
  authStrategy: 'local',
  // debug: z.boolean().optional(),
  // introspect: z.boolean().optional(),
  // mode: z.enum(botTypes).optional(), // Bot mode => Loading of different Bot types
  // sessionPath: z.string().optional(),
  // sessionClientId: z.string().optional(),
};

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('Botlike config - present and valid format', () => {
    expect(botlikeConfig).toBeDefined;
    expect(botlikeConfig).toBeTypeOf('object');
    expect(botlikeConfig).ownProperty('name').to.be.not.null.and.to.be.not.undefined;
    expect(botlikeConfig).ownProperty('name').to.be.not.empty;
    // new Botlike(botlikeConfig)
  });

  it('Botlike bot - constructor', () => {
    const bot = new Botlike(botlikeConfig, processArgsMock);
    expect(bot).toBeDefined;
    expect(bot).toBeTypeOf('object');
    expect(bot).to.haveOwnProperty('networkModules');
    // expect(bot).ownProperty('instance').to.be.null;
  });

  it('Botlike bot - is singleton', () => {
    const bot = new Botlike(botlikeConfig, processArgsMock);
    expect(bot).toBeDefined;
    expect(bot).toBeTypeOf('object');
    expect(bot).toEqual(Botlike.instance);

    const bot2 = new Botlike(botlikeConfig, processArgsMock);
    expect(bot).toEqual(bot2);
  });
}
