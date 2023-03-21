import { ParseImageInfo } from 'src/types/imageServer.types';

export type ActionData = string; // TODO: refine

// X-TODO: refine
export interface ActionDataInfo {
  // optional:
  contentType?: 'image/png' | 'image/jpg';
  encoding?: 'base64';
  // filename?
  imageInfo?: ParseImageInfo;
  // always required:
  dataType: 'text' | 'image';
  isInInfoMode?: boolean;
}

export interface ActionResult {
  data: ActionData;
  dataInfo: ActionDataInfo;
}

export interface UniversalActionResponse {
  error: string | null;
  results: ActionResult[];
  // replyOptionsResults: [replyOptions],
}

////

export const createUniversalActionResponse = (
  data: ActionData[],
  dataInfo: ActionDataInfo[],
  dataTransformer: ActionPayloadTransformer,
): UniversalActionResponse => dataTransformer(data, dataInfo);

export const createUniversalActionErrorResponse = (
  errorMessage: string,
): UniversalActionResponse => ({
  error: errorMessage,
  results: [],
});

////

export type ActionPayloadTransformer = (
  data: ActionData[],
  dataInfo: ActionDataInfo[],
) => UniversalActionResponse;

export const imageResponsePayloadTransformer: ActionPayloadTransformer = (
  data: ActionData[],
  dataInfo: ActionDataInfo[],
) => {
  if (data.length !== dataInfo.length)
    throw new Error('Payload transformer data length mismatch');
  const results: ActionResult[] = data.map((d, idx) => {
    const di: ActionDataInfo | undefined = dataInfo[idx];
    if (!di) throw new Error('Payload transformer missing data info');
    return {
      data: d,
      dataInfo: di,
    };
  });
  return {
    error: null,
    results,
  };
};

export const textResponsePayloadTransformer: ActionPayloadTransformer = (
  data: ActionData[],
  dataInfo: ActionDataInfo[],
) => {
  if (data.length !== dataInfo.length)
    throw new Error('Payload transformer data length mismatch');
  const results: ActionResult[] = data.map((d, idx) => {
    const di: ActionDataInfo | undefined = dataInfo[idx];
    if (!di) throw new Error('Payload transformer missing data info');
    return {
      data: d,
      dataInfo: di,
    };
  });
  return {
    error: null,
    results,
  };
};

////

export const baseTextResponse = (text: string) =>
  createUniversalActionResponse(
    [text],
    [{ dataType: 'text' }],
    textResponsePayloadTransformer,
  );
