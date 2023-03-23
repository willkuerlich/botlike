import { RemoteAuth } from 'whatsapp-web.js';

/** If whatsapp auth strategy is remote:
 *  - establish a mongo db connection
 *  - create a mongo store wrapper
 * */
const getRemoteAuth = async () => {
  const getStore = await (await import('../../../src/lib/db/mongoDB.lib')).default;
  const store = await getStore();
  if (!store) {
    throw Error('Mongo store init error');
  }
  return new RemoteAuth({
    store,
    backupSyncIntervalMs: 300000,
  });
};

const remoteAuth = getRemoteAuth();

export default remoteAuth;
