import type { AxiosResponse } from 'axios';

import { fetchTxt2Img, ImageAPIResponse } from 'src/api/imageServer/fetchTxt2Img';
import {
  createUniversalActionErrorResponse,
  createUniversalActionResponse,
  imageResponsePayloadTransformer,
  UniversalActionResponse,
} from 'src/actions/actionResponsePayload';

import { getImageParams } from './imageParams/text2Image.params';

import { getImageReplyCommandOptions } from './getImageReplyCommandOptions';
import { getReasonableTxt2ImgDefaults } from './getReasonableTxt2ImgDefaults';
import { getSamplerData } from './getSamplerData';

import type {
  LocalImageCommand,
  LocalImageOptions,
  ParseImageInfo,
} from 'src/types/imageServer.types';

// import mergeImages from 'merge-base64';
// import mergeImg from 'merge-img';

const apiServer = 'http://127.0.0.1:7860'; // X-TODO: .env+args

// X-TODO: implement batch/sequential reply mode
export const txt2imgAction = async (
  options: LocalImageOptions,
  command: LocalImageCommand,
): Promise<UniversalActionResponse> => {
  try {
    const prompt = command.args.join(' ');
    let intialSeed = options?.seed || 1;

    const { samplerName /*, samplerOptions */ } = await getSamplerData(
      apiServer,
      options,
    );

    const { imageCount, imgParamArgs } = getReasonableTxt2ImgDefaults(
      options,
      samplerName,
    );

    const tasks: Promise<AxiosResponse<ImageAPIResponse, any>>[] = [];

    for (let index = 0; index < imageCount; index++) {
      const params = getImageParams(prompt, {
        ...imgParamArgs,
        seed: intialSeed + index,
      });
      tasks.push(fetchTxt2Img(apiServer, params));
    }

    const results = await Promise.all(tasks);
    const unwrappedResults = results.map((r) => r.data);
    const parsedData = unwrappedResults.map((data) => ({
      data,
      info: JSON.parse(data.info) as ParseImageInfo,
    }));

    const sortedParsedData = parsedData.sort(
      (a, b) =>
        Number.parseInt(`${a.info.seed}`, 10) - Number.parseInt(`${b.info.seed}`, 10),
    );

    return createUniversalActionResponse(
      [...sortedParsedData.map((spd) => spd.data.images[0]!)],
      [...sortedParsedData.map((spd) => getImageReplyCommandOptions(spd, options))],
      imageResponsePayloadTransformer,
    );
  } catch (e) {
    console.error('Image create error: ', e);
    return createUniversalActionErrorResponse(
      typeof e === 'string' ? e : e!.toString() || 'Image create error',
    );
  }
};
