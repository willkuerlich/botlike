import axios from 'axios';

export interface GetSdModelListResponse {
  title: string; // "768-v-ema.ckpt [bfcaf07557]",
  model_name: string; // "768-v-ema",
  hash: string; // "bfcaf07557",
  sha256: string; // "bfcaf0755797b0c30eb00a3787e8b423eb1f5decd8de76c4d824ac2dd27e139f",
  filename: string; // "S:\\wk\\ai\\sd-webui\\models\\Stable-diffusion\\768-v-ema.ckpt",
  config: null; // TODO
}

export const listAvailableSdModels = async (apiServer: string) =>
  axios.get<GetSdModelListResponse[]>(`http://${apiServer}/sdapi/v1/sd-models`);

// X-TODO: define upscalers & more
