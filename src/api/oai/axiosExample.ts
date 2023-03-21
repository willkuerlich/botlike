//// EXAMPLE USAGE WITHOUT OAI API:

// try {
//   // ACCESS TOKEN CODE
//   const options = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${env.OAI_API_KEY}`
//     },
//     method: 'POST',
//     data: {
//       prompt: msg,
//       model: 'text-davinci-003',
//       max_tokens: 2000,
//       temperature: 0.99,
//       frequency_penalty: 1,
//     }
//   };
//   return axios.post(API_ENDPOINT, options);
// } catch (e) {
//   return e.message || 'ChatGPT Error';
// }
