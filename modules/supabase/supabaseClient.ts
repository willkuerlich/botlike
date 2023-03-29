import processArgs from 'args';
import env from 'env';
import {
  createClient,
  SupabaseClient as BaseSupabaseClient,
} from '@supabase/supabase-js';
import { Database } from 'lib/database.types';

export type SupabaseClient = BaseSupabaseClient<Database>;

let client: SupabaseClient | null = null;

const getSupabaseClient = () => {
  if (!env.SB_API_URL || !env.SB_SERVICE_ROLE_SECRET) {
    throw new Error('Supabase credentials not available');
  }
  if (!client) {
    client = createClient<Database>(
      /*< any, 'custom', any> */ env.SB_API_URL,
      env.SB_SERVICE_ROLE_SECRET,
      {
        // schema: 'custom',
        // persistSession: false,
      },
    );
  }
  if (processArgs.debug) console.info('Supabase client loaded: ', client);
  return client;
};

export default getSupabaseClient;
