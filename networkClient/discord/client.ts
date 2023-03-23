import env from 'env';
import DiscordJS from 'discord.js';

import { sleep } from 'src/lib/utility.lib';

// 8 | 274878163990 Permission Bitmask

const discordClientOptions: DiscordJS.ClientOptions = {
  intents: [
    'DirectMessages',
    'Guilds',
    'GuildMembers',
    'GuildIntegrations',
    'GuildMessages',
    'GuildModeration',
    'MessageContent',
  ],
};

const initDiscordClient = async (options: DiscordJS.ClientOptions) => {
  try {
    const client = new DiscordJS.Client(options);

    client.login(env.DISCORD_BOT_TOKEN);

    if (!client) throw new Error('Discord client could not be loaded');

    return client;
  } catch (err) {
    console.error('Discord module initialize error', err);
    return null;
  }
};

const createClient = async () => {
  try {
    const client = await initDiscordClient(discordClientOptions);
    await sleep(500);

    if (!client) throw new Error('Discord client could not be loaded');

    return client;
  } catch (err) {
    console.error('Discord module initialize error', err);
    return null;
  }
};

export default createClient;
