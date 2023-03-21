import { DiffusionSamplerIndexKey } from 'src/types/imageServer-sd.types';
import { ImageParamsConfig, LocalImageOptions } from 'src/types/imageServer.types';

export const getReasonableTxt2ImgDefaults = (
  options: LocalImageOptions,
  samplerName: DiffusionSamplerIndexKey,
) => {
  let quality = options?.quality && options.quality <= 100 ? options.quality : 25;
  let imageCount =
    options?.variants &&
    (options.variants <= 5 ||
      (options.variants <= 10 && quality <= 15) ||
      (options.variants <= 20 && quality <= 10))
      ? options.variants
      : 1;

  if (quality > 25) {
    imageCount = 1;
  }

  const imgParamArgs: ImageParamsConfig = {
    seed: 1,
    nonegative: options?.nonegative || false,
    steps: quality,
    sdModel: '',
    // sampler: options?.sampler
    //   ? (options.sampler as DiffusionSamplerIndexKey)
    //   : 'Euler a', // X-FIXME: make sure sampler is valid
    sampler: samplerName,
    tiling: !!options?.tiling,
    cfgScale: options?.cfgScale || 7,
  };

  return { imageCount, imgParamArgs };
};
