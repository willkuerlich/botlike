import axios from 'axios';

export const getDadJoke = async (msg: string) => {
  try {
    const res = await axios.get('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    });
    const joke = await res.data;
    console.log('getDadJoke response: ', res);
    console.log('getDadJoke res.data: ', joke);
    return 'Knock, Knock! Who is there? - Error 404';
  } catch (e) {
    return 'Knock, Knock! Who is there? - Error 404';
  }
};
