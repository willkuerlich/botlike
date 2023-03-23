import { Command } from '@commander-js/extra-typings';
import z from 'zod';
import { ProcessArgs } from 'args';

// import { adapterTypes } from 'config/adapter'; // X-TODO: rename and use in bootstrap
import { authenticationTypes } from 'config/adapter/whatsapp/auth';
import { botTypes } from 'config/bot/botTypes';

export const processArgsSchema = z.object({
  // adapter: z.enum(adapterTypes, {
  //   required_error: `You need to append an adapter (-a | --adapter) as a runtime argument,
  //   to your "start" script (package.json) e.g.: "node dist --adapter whatsapp"`,
  // }),
  /* authStrategy - might be necessary to adjust for other adapters */
  authStrategy: z.enum(authenticationTypes, {
    required_error: `You need to append an authStrategy (-as | --auth-strategy) as a runtime argument,
    to your "start" script (package.json) e.g.: "node dist --adapter whatsapp"`,
  }),
  debug: z.boolean().optional(),
  introspect: z.boolean().optional(),
  mode: z.enum(botTypes).optional(), // Bot mode => Loading of different Bot types
  sessionPath: z.string().optional(),
  sessionClientId: z.string().optional(),
});

export const processArgsLogger = (args: ProcessArgs) => {
  console.log(`process.args.debug: ${args.debug}`); // ADD ADDITIONAL LOG LEVEL ARGS PARAM?
  console.log(`process.args.introspect: ${args.introspect}`); // KEEP OR REMOVE (HANDLE WITH LOG LEVELS?)
  console.log(`process.args.mode: ${args.mode} `); // KEEP OR REMOVE
  console.log(`process.args.sessionPath: ${args.sessionPath} `); // KEEP AND RENAME LOCAL_SESSION_PATH OR REMOVE
  console.log(`process.args.sessionClientId: ${args.sessionClientId} `); // WHAT FOR?
  // console.log(`process.args.adapter: ${args.adapter}`); // KEEP => ARRAY OF NETWORK-CLIENT OR REMOVE
  console.log(`process.args.authStrategy: ${args.authStrategy}`); // ONLY VALID FOR WA => REMOVE OR RENAME?
};

export const processArgsParser = () =>
  new Command()
    // .requiredOption(
    //   '-a, --adapter <val>',
    //   `network adapter, valid values: [ ${adapterTypes.map((type) => `"${type}" `)}]`,
    // )
    .requiredOption(
      '-as, --auth-strategy <val>',
      `whatsapp auth strategy, valid values: [ ${authenticationTypes.map(
        (type) => `"${type}" `,
      )}]`,
    )
    .option('-m, --mode [val]', 'start in special mode, default: "default"')
    .option(
      '-s, --session-path [val]',
      'path to save the session, default: "./.wwebjs_auth"',
    )
    .option('-c, --session-client-id [val]', 'custom client id')
    .option('-i, --introspect', 'extended logging')
    .option('-d, --debug', 'start in debug mode');
