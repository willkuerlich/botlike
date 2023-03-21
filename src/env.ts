import { existsSync } from 'fs';
import z from 'zod';

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
  SB_API_URL: z.string().optional(),
  SB_SERVICE_ROLE_SECRET: z.string().optional(),

  /** IMAGE API SERVER */
  IMAGE_API_SERVER_URL: z.string().optional(),

  /** TELEGRAM */
  TELEGRAM_BOT_TOKEN: z.string({
    required_error:
      'You must have a TELEGRAM_BOT_TOKEN variable defined in your process.env (Telegram bot token you receive from @BotFather)',
  }),
});

const {
  BUILD_TARGET,
  OAI_API_KEY,
  SYSTEM_CHROME_PATH,
  WA_ACCOUNT_ID,
  WA_SESSION_AUTH_STRATEGY,
  WA_SESSION_LOCAL_PATH,
  WA_SESSION_REMOTE_MONGODB_URI,
  SB_API_URL,
  SB_SERVICE_ROLE_SECRET,
  IMAGE_API_SERVER_URL,
  TELEGRAM_BOT_TOKEN,
} = process.env;

/** Validates the app's environment variables against a predefined schema
 *  - this needs to be called as the first directive after dotenv.config() load
 * */
export const validate = () => {
  const env = envSchema.parse({
    BUILD_TARGET,
    OAI_API_KEY,
    SYSTEM_CHROME_PATH,
    WA_ACCOUNT_ID,
    WA_SESSION_AUTH_STRATEGY,
    WA_SESSION_LOCAL_PATH,
    WA_SESSION_REMOTE_MONGODB_URI,
    SB_API_URL,
    SB_SERVICE_ROLE_SECRET,
    IMAGE_API_SERVER_URL,
    TELEGRAM_BOT_TOKEN,
  });

  if (!existsSync(env.SYSTEM_CHROME_PATH)) {
    throw new Error('ENV: System chrome path does not exist on this system');
  }
};

/** Vars not defined in the envSchema are still available for better DX (hence not run-time safe) */
export const env = process.env as AppEnvironment;

export type AppEnvironment = z.infer<typeof envSchema>;

export default env;
