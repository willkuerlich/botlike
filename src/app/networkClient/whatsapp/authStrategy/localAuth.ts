import env from 'env';
import processArgs from 'args';
import { LocalAuth } from 'whatsapp-web.js';

const getLocalAuth = async () => {
  const { sessionPath, sessionClientId } = processArgs;

  return new LocalAuth({
    clientId: sessionClientId,
    dataPath: sessionPath || env.WA_SESSION_LOCAL_PATH || './.wwebjs_auth',
  });
};

const localAuth = getLocalAuth();

export default localAuth;
