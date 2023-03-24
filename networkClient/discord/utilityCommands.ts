// import env from 'env';
import DiscordJS from 'discord.js';

export const evaluateDiscordUtilityCall = (msg: DiscordJS.Message) => {
  let isUtilityCall = false;

  // X-TODO: add discord owner uid to .env

  return {
    isUtilityCall,
  };
};
