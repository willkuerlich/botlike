import { ActionDataInfo } from 'src/actions/actionResponsePayload';
import { ImageAPIResponse } from 'src/api/imageServer/fetchTxt2Img';
import { LocalImageOptions, ParseImageInfo } from 'src/types/imageServer.types';

export interface ImageResponseData {
  data: ImageAPIResponse;
  info: ParseImageInfo;
}

export const getImageReplyCommandOptions = (
  d: ImageResponseData,
  options: LocalImageOptions,
): ActionDataInfo => {
  return {
    contentType: 'image/png',
    encoding: 'base64',
    dataType: 'image',
    imageInfo: d.info,
    isInInfoMode: !!options?.info,
  };
};
