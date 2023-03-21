// const axios = require('axios').default;
import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://api.edenai.run/v2/translation/language_detection',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOGIyYzYxOWYtM2JlZi00NWVjLTg5ZjYtZjZlZmJiZmY4MzRjIiwidHlwZSI6ImFwaV90b2tlbiJ9.2KQdfOHMU0qq1THeYxUgjBA8VPPO8yJTnGmQ3-uFwwg',
  },
  // data: {
  //   providers: 'amazon,google,ibm,microsoft,neuralspace',
  //   text: 'Ogni individuo ha diritto all\'istruzione.'
  // }
};

export const detectLanguage = async (
  text: string,
  snipLength: number = 64,
  skipStartCharsCount?: number,
) => {
  const length = text.length <= snipLength ? text.length : snipLength;
  // get sample from text
  const textSnip = text.slice(
    skipStartCharsCount ? skipStartCharsCount - 1 : 0,
    length + (skipStartCharsCount || 0) - 1,
  );

  try {
    const res = await axios.request({
      ...options,
      data: { text: textSnip, providers: 'amazon' },
    });

    if (res.data) {
      if (res.data.amazon?.success) {
        console.log('amazon detectLanguage items: ', res.data.amazon.items);
      }

      if (res.data['eden-ai']?.success) {
        console.log('eden-ai detectLanguage items: ', res.data['eden-ai'].items);
      }
    }

    if (!res.data?.amazon?.items?.[0]) {
      return null;
    }

    return res.data.amazon.items[0];
  } catch (e) {
    console.error(e);
    return 'Error';
  }
};
