import { fetchSamplers } from 'src/api/imageServer/fetchSamplers';

import type { DiffusionSamplerIndexKey } from 'src/types/imageServer-sd.types';
import type { LocalImageOptions } from 'src/types/imageServer.types';

export const getSamplerData = async (apiServer: string, options: LocalImageOptions) => {
  let samplerName: DiffusionSamplerIndexKey = 'Euler a';
  let samplerOptions = {}; // X-TODO: typesafe

  if (!!options?.sampler) {
    const samplers = await fetchSamplers(apiServer);
    const samplerData = samplers.data[options.sampler];
    if (samplerData) {
      samplerName = samplerData.name as DiffusionSamplerIndexKey;
      samplerOptions = { ...samplerData.options };
    }
  }

  return { samplerName, samplerOptions };
};
