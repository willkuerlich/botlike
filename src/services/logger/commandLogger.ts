import Botlike from 'src/botlike/core';
import type { CommandRequestData } from 'src/commander/commander.types';

/**
 * @todo abstract away supabase call with ServiceCenter logic
 * */
export const commandLogger = async (command: CommandRequestData) => {
  try {
    const supabaseClient = Botlike.instance.supabaseClient;

    if (!supabaseClient) return false;

    const { commandInfo, networkInfo, userInfo } = command;

    const { data, error } = await supabaseClient
      .from('botlike-logs')
      .insert({
        command: `${commandInfo.messageText}`,
        network_info: networkInfo,
        user_info: userInfo,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    console.log('res: ', data);
    return !!data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
