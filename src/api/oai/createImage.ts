import openai from 'src/lib/openai/openai.lib';
export const generateImage = async (msg: string) => {
  try {
    const response = await openai.createImage({
      prompt: msg,
      n: 1,
      size: '256x256',
      // response_format
    });
    console.log('createImage response.data: ', response.data);
    return response.data.data[0]?.url || 'No image url received';
  } catch (e) {
    return 'Image Error';
  }
};
