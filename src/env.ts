import { existsSync } from 'fs';
import z from 'zod';
import { zodTransformStringToBoolean } from './lib/zod/transformStringToBoolean';

/////////////////////////////////////////////////////////////////////////////////////////
//// !! DO NOT DELETE OR MOVE THIS FILE WITHOUT UPDATING "paths" IN tsconfig.json !! ////
/////////////////////////////////////////////////////////////////////////////////////////

// X-TODO: handle WA + TG + DISCORD as optional vars (config based module registration system needed)

/** define env variable used in the app here */
const envSchema = z.object({
  BUILD_TARGET: z.string({
    required_error: 'You must have a BUILD_TARGET variable defined in your process.env',
  }),
  OAI_API_KEY: z.string({
    required_error: 'You must have a OAI_API_KEY variable defined in your process.env',
  }),
  SYSTEM_CHROME_PATH: z.string({
    required_error:
      'You must have a SYSTEM_CHROME_PATH variable defined in your process.env',
  }),
  IMAGE_API_SERVER_URL: z.string().optional(),

  /** DISCORD */
  DISCORD_BOT_TOKEN: z.string({
    required_error:
      'You must have a DISCORD_BOT_TOKEN variable defined in your process.env',
  }),

  /** TELEGRAM */
  TELEGRAM_BOT_TOKEN: z.string({
    required_error:
      'You must have a TELEGRAM_BOT_TOKEN variable defined in your process.env (Telegram bot token you receive from @BotFather)',
  }),

  /** WHATSAPP */
  WA_ACCOUNT_ID: z.string({
    required_error:
      'You must have a WA_ACCOUNT_ID variable defined in your process.env (Whatsapp id => <country code><your phone number without leading 0>@c.us)',
  }),
  WA_SESSION_AUTH_STRATEGY: z.string({
    required_error:
      'You must have a WA_SESSION_AUTH_STRATEGY variable defined in your process.env',
  }),
  // X-TODO: either one is required (depends on strategy)
  WA_SESSION_LOCAL_PATH: z.string().optional(),
  WA_SESSION_REMOTE_MONGODB_URI: z.string().optional(),

  /** SUPABASE */
  USE_MODULE_SUPABASE: z
    .string({
      required_error:
        'You must have a USE_MODULE_SUPABASE variable set in your process.env',
    })
    .transform(zodTransformStringToBoolean),
  SB_API_URL: z.string().optional(),
  SB_SERVICE_ROLE_SECRET: z.string().optional(),
});

/** Validates the app's environment variables against a predefined schema
 *  - this needs to be called as the first directive after dotenv.config() load
 * */
export const validate = () => {
  const env = envSchema.parse(process.env);

  if (!existsSync(env.SYSTEM_CHROME_PATH)) {
    throw new Error('ENV: System chrome path does not exist on this system');
  }
};

/** Vars not defined in the envSchema are still available for better DX (hence not run-time safe) */
export const env = process.env as AppEnvironment;

export type AppEnvironment = z.infer<typeof envSchema>;

export default env;
