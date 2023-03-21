// import { diffusionSamplerIndexKeys } from 'src/constants/sd.constants';
import { baseTextResponse } from 'src/actions/actionResponsePayload';
import { SubmitMessageHandler } from 'src/commander/commander.types';
// import { DiffusionSamplerIndexKey } from 'src/types/sd.types';

export function parseStringToInt(
  value: string,
  previous: number,
  callback: SubmitMessageHandler,
) {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    callback(baseTextResponse(`"${value}" is not a number`));
    throw new Error(`"${value}" is not a number`);
    // throw new commander.InvalidArgumentError('Not a number');
  }
  return parsedValue;
}

// function isSamplerIndexKey(key: string): key is DiffusionSamplerIndexKey {
//   return diffusionSamplerIndexKeys.includes(key as DiffusionSamplerIndexKey);
// }

// export function parseStringToSampler(
//   value: string,
//   previous: string,
//   callback: CommandCallbackFunction,
// ) {
//   // const asArray = value as any as string[];
//   // console.log('parseStringToSampler - asArray: ', asArray);
//   // const convert = asArray.join('') as DiffusionSamplerIndexKey;
//   // console.log('parseStringToSampler - convert: ', convert);
//   // const convert = value as DiffusionSamplerIndexKey;
//   console.log('parseStringToSampler - value: ', value);
//   if (isSamplerIndexKey(value)) {
//     return value;
//     // throw new commander.InvalidArgumentError('Not a DiffusionSamplerIndexKey');
//   }
//   callback(`"${value}" is not a valid sampler`);
//   throw new Error(`"${value}" is not a valid sampler`);
// }

export function parseStringToSamplerIndex(
  value: string,
  previous: number,
  callback: SubmitMessageHandler,
) {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    callback(baseTextResponse(`"${value}" is not a number`));
    throw new Error(`"${value}" is not a number`);
    // throw new commander.InvalidArgumentError('Not a number');
  }
  // X-TODO: cache API fetch result once inside of bot and reuse it for validation
  if (parsedValue < 0 || parsedValue > 18) {
    callback(baseTextResponse(`"${value}" is not in valid Range (0-18)`));
    throw new Error(`"${value}" is not in valid Range (0-18)`);
  }
  return parsedValue;

  // console.log('parseStringToSampler - value: ', value);
  // if (isSamplerIndexKey(value)) {
  //   return value;
  //   // throw new commander.InvalidArgumentError('Not a DiffusionSamplerIndexKey');
  // }
  // callback(`"${value}" is not a valid sampler`);
  // throw new Error(`"${value}" is not a valid sampler`);
}
