import { detectLanguage } from 'src/api/edenAI/detectLanguage';

export const unknownCommandI18n = async (message: string) => {
  try {
    const langRes = await detectLanguage(message); // X-TODO: make typesafe
    console.log('langRes: ', langRes);
    if (langRes?.language && langRes.confidence > 0.5) {
      // X-TODO: create cache (with fs.write also?) for auto translated texts
      // show i18n help text + save it to cache
      if (langRes.language === 'en') {
        return 'Unknown command! > Try "!help"';
      }
      if (langRes.language === 'de') {
        return 'Kommando nicht verstanden! > Versuchen Sie es mit "!help"';
      }
      if (langRes.language === 'ru') {
        return 'Команда не понятна! > Попробуйте "!help"!';
      }
    }
    // Default help text
    return 'Unknown command! > Try "!help"';
  } catch (e) {
    return 'Unknown command! > Try "!help"';
  }
};
