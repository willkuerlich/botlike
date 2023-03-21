import { ActionDataInfo } from 'src/actions/actionResponsePayload';

export const formatImageInfo = (options?: ActionDataInfo) => {
  const seedInfo = `Seed: ${options?.imageInfo?.seed || ''}`;
  const samplerInfo = `Sampler: ${options?.imageInfo?.sampler_name}`;
  const baseInfo = `${seedInfo}\n${samplerInfo}`;

  if (options?.isInInfoMode) {
    const extraInfoString = JSON.stringify(options?.imageInfo, null, 2);
    return `${baseInfo}\n${extraInfoString}`;
  }
  return baseInfo;
};
