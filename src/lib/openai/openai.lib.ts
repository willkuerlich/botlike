import env from 'env';
import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: env.OAI_API_KEY,
});

// X-NICE-FEAT: method to load balance requests with different configs
const openai = new OpenAIApi(config);

export default openai;
