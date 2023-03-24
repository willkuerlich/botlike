// import { initializeBot } from './initializeBot';
import { registerNetworks } from 'config/adapter';
// import Botlike from 'src/botlike/core';

if (import.meta.vitest) {
  const { it, describe, test, expect } = import.meta.vitest;

  describe('app initialization resources', () => {
    it('has valid registerNetworks', () => {
      expect(registerNetworks).toBeDefined();
      expect(Array.isArray(registerNetworks)).toBe(true);
      expect(registerNetworks).toEqual(
        expect.arrayContaining(['discord', 'telegram' /* , 'whatsapp' */]),
      );
    });
    // it.each(registerNetworks)('is valid network', (val) => {
    //   expect(val).toBeTypeOf('string');
    //   expect(val).includes.any.keys(['discord', 'telegram', 'whatsapp']);
    // });
  });

  // describe('app initialization', () => {
  //   it('loads network modules', async () => {
  //     // const initBot = await initializeBot(new Botlike(), registerNetworks);
  //     // pass Botlike mock and expect to have loaded modules
  //   });
  // });
}
