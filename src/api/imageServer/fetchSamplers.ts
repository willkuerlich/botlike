import axios from 'axios';
import { DiffusionSamplerIndexKey } from 'src/types/imageServer-sd.types';

export interface FetchSamplersResponse {
  name: DiffusionSamplerIndexKey; // "Euler a",
  aliases: string[]; // ["k_euler_a", "k_euler_ancestral"]
  options: {
    scheduler?: string; // "karras"
    discard_next_to_last_sigma?: boolean;
  };
}

export const fetchSamplers = async (apiServer: string) =>
  axios.get<FetchSamplersResponse[]>(`${apiServer}/sdapi/v1/samplers`);
