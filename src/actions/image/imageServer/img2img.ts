import axios from 'axios';

import { getImageEditParams } from 'src/actions/image/imageServer/imageParams/image2Image.params';
import {
  createUniversalActionErrorResponse,
  createUniversalActionResponse,
  imageResponsePayloadTransformer,
  UniversalActionResponse,
} from 'src/actions/actionResponsePayload';

import { getSamplerData } from './getSamplerData';
import { getReasonableImg2ImgDefaults } from './getReasonableImg2ImgDefaults';
import {
  getImageReplyCommandOptions,
  ImageResponseData,
} from './getImageReplyCommandOptions';

import type { ImageAPIResponse } from 'src/api/imageServer/fetchTxt2Img';
import type {
  ImageEditParamsConfig,
  LocalImageCommand,
  LocalImageEditOptions,
  ParseImageInfo,
} from 'src/types/imageServer.types';

// import mergeImages from 'merge-base64';
// import mergeImg from 'merge-img';

const apiServer = 'http://127.0.0.1:7860'; // X-TODO: .env+args

export const img2imgAction = async (
  options: LocalImageEditOptions,
  command: LocalImageCommand,
  images: string[],
): Promise<UniversalActionResponse> => {
  // console.log('action: img2imgAction create command: ', command);
  // console.log('action: image seedArg: ', seedArg); // similar to command.processedArgs
  // console.log('action: image options: ', options);
  // console.log('action: image command: ', command);
  try {
    const prompt = command.args.join(' ');
    let intialSeed = options?.seed || 1;

    const { samplerName /*, samplerOptions */ } = await getSamplerData(
      apiServer,
      options,
    );

    const { imageCount, imgParamArgs } = getReasonableImg2ImgDefaults(
      options,
      samplerName,
    );

    const imgParamsOld: ImageEditParamsConfig = {
      seed: options?.seed || -1,
      // seed: 1,
      nonegative: options?.nonegative || false,
      steps: 25,
      sdModel: '',
      sampler: 'Euler a',
      tiling: false,
      imgCfgScale: options?.imgCfgScale || 0.85,
      cfgScale: options?.cfgScale || 7,
      initialNoiseMultiplier: options?.initNoise || 0.85,
      denoisingStrength: options?.denoising || 0.6,
    };

    const { data } = await axios.post<ImageAPIResponse>(`${apiServer}/sdapi/v1/img2img`, {
      ...getImageEditParams(prompt, {
        ...imgParamsOld, // X-TODO: combine both in reasonable function
        ...imgParamArgs,
        seed: intialSeed /* + index */,
      }),
      init_images: [...images],
    });

    const parsed: ImageResponseData = {
      data,
      info: JSON.parse(data.info) as ParseImageInfo,
    };

    const replyOptions = getImageReplyCommandOptions(parsed, options);

    return createUniversalActionResponse(
      [data.images[0]!],
      [replyOptions],
      imageResponsePayloadTransformer,
    );
  } catch (e) {
    console.error('Image create error: ', e);
    return createUniversalActionErrorResponse(
      typeof e === 'string' ? e : e!.toString() || 'Image create error',
    );
  }
};

// export const img2imgAction = async (
//   seedArg: string,
//   options: LocalImageEditOptions,
//   command: LocalImageCommand,
//   callback: CommandCallbackFunction,
//   images: string[],
// ) => {
//   console.log(
//     '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
//   );
//   console.log('action: img2imgAction create command: ', command);
//   // console.log('action: image seedArg: ', seedArg); // similar to command.processedArgs
//   // console.log('action: image options: ', options);
//   // console.log('action: image command: ', command);
//   try {
//     if (!command?.args?.length) {
//       return command.helpInformation(); // not tested
//     }
//     const prompt = command.args.join(' ');
//     console.log('prompt string after joining: ', prompt);
//     // const res = await getBaseCodexCompletion(code as string);

//     // const apiServer = '127.0.0.1:7860'; // X-TODO: .env+args

//     // const progressInfoRes = await axios.get(`http://${apiServer}/sdapi/v1/progress`);
//     // const progressInfo = await progressInfoRes.data;

//     // if (progressInfo?.state?.job_count) {
//     //   // callback(
//     //   //   `There are currently image in the processing queue...\n\n Current item progress: ${
//     //   //     progressInfo?.data?.progress?.toString().slice(2) || 0
//     //   //   }%`,
//     //   // );
//     // }

//     const { data } = await axios.post<ImageAPIResponse>(`${apiServer}/sdapi/v1/img2img`, {
//       ...getImageEditParams(prompt, {
//         seed: options?.seed || -1,
//         // seed: 1,
//         nonegative: options?.nonegative || false,
//         steps: 25,
//         sdModel: '',
//         sampler: 'Euler a',
//         tiling: false,
//         imgCfgScale: options?.imgCfgScale || 0.85,
//         cfgScale: options?.cfgScale || 7,
//         initialNoiseMultiplier: options?.initNoise || 0.85,
//         denoisingStrength: options?.denoising || 0.6,
//       }),
//       init_images: [...images],
//     });

//     console.log('data parameters: ', data.parameters);
//     console.log('data info: ', data.info);

//     const imageInfo = JSON.parse(data.info);

//     const replyOptions: ReplyCommandOptions = {
//       type: 'base64',
//       action: 'convert',
//       params: {
//         target: 'image-embed',
//       },
//       isInInfoMode: !!options?.info,
//       imageInfo,
//     };

//     console.log('data.images.length: ', data.images?.length);
//     // X-FIXME: callback has to accept string arrays?

//     if (data.images?.length > 1) {
//       // const cfg = {
//       //   direction: 'column',
//       //   color: '0x00000000',
//       //   align: 'start',
//       //   offset: 0,
//       //   isPng: false,
//       //   margin: 0,
//       // }; data:image/jpeg;base64,/9j/4AAQSkZJ
//       // const mergedImage = await mergeImages([base64Image, base64Image] /* , cfg */);
//       const buffer1 = Buffer.from(data.images[0]!, 'base64');
//       const buffer2 = Buffer.from(data.images[1]!, 'base64');
//       // const mergedImage = await mergeImg([buffer1, buffer2]);
//       /* .then((img) => {
//         // Save image as file
//         img.write('out.png', () => console.log('done'));
//       }) */

//       // console.log('mergedImage: ', mergedImage);
//       // console.log('mergedImageStart: ', mergedImage.slice(0, 30));
//       // console.log('mergedImageEND: ', mergedImage.slice(-30, -1));
//       callback(data.images[0]!, replyOptions);
//       // callback(mergedImage, options);
//     } else if (data.images?.length === 1) {
//       var media = new MessageMedia('image/jpg', data.images[0]!, 'Botlike-image.jpg');
//       callback(media as any as string, replyOptions); // X-TODO: any
//       // if (options?.info) {
//       //   const parsed = JSON.parse(data.info);
//       //   callback(`Image seed: ${parsed.seed || ''}`);
//       //   // callback(`Image parameter:\n\n ${JSON.stringify(data.parameters, null, 2)}`);
//       // }
//     }

//     // callback(data.images as any as string, options); // X-TODO. check multi image generation possibilities
//   } catch (e) {
//     console.error('Image create error: ', e);
//     callback(`Image create error`);
//   }
// };
