import { baseBotConfig as botlikeConfig } from 'config/bot/baseBotConfig';

import Botlike from 'src/botlike/core';

if (import.meta.vitest) {
  const { it, describe, test, expect, beforeAll, afterEach, afterAll } = import.meta
    .vitest;

  let bot: Botlike = null as never;

  // reset the singleton bot instance
  afterEach(() => {
    if (bot) {
      bot.dispose();
    }
    bot = null as never;
  });

  describe('Botlike class', () => {
    it('has a valid config', () => {
      expect(botlikeConfig).toBeDefined();
      expect(botlikeConfig).toBeTypeOf('object');
      expect(botlikeConfig).ownProperty('name').to.be.not.null.and.to.be.not.undefined;
      expect(botlikeConfig).ownProperty('name').to.be.not.empty;
    });

    it('has working constructor', () => {
      bot = new Botlike();
      expect(bot).toBeDefined();
      expect(bot).toBeTypeOf('object');
      expect(bot).to.haveOwnProperty('networkModules');
    });

    it('is a singleton', () => {
      bot = new Botlike();
      expect(bot).toBeDefined;
      expect(bot).toBeTypeOf('object');
      expect(bot).toEqual(Botlike.instance);

      const bot2 = new Botlike();
      expect(bot).toEqual(bot2);
    });
  });
}
