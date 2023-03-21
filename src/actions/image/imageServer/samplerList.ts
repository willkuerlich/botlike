import { fetchSamplers } from 'src/api/imageServer/fetchSamplers';
import { SubmitMessageHandler } from 'src/commander/commander.types';
import { baseTextResponse } from 'src/actions/actionResponsePayload';

const apiServer = 'http://127.0.0.1:7860'; // X-TODO: .env+args

export const listAvailableSamplers = async (callback: SubmitMessageHandler) => {
  try {
    const { data } = await fetchSamplers(apiServer);
    console.log('listAvailableSamplers - res: ', data);
    if (data) {
      let samplerListString = `Available Samplers:\n`;
      data.forEach((el, idx) => {
        samplerListString = `${samplerListString}\n${idx}: ${el.name}`; // X-TODO: add link to wk.botlike.info page
      });
      callback(baseTextResponse(samplerListString));
    } else {
      callback(baseTextResponse(`No sampler list available`));
    }
  } catch (err) {
    console.error(err);
    callback(baseTextResponse(`Error: ${err}`));
  }
};
