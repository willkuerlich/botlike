import dotenv from 'dotenv';
import { timelogFormat } from './lib/log.lib';

// TODO: implement logger service

(async () => {
  console.log('Botlike is starting...');

  // console.log('process.argv: ', process.argv);
  // console.log('process.env: ', process.env);

  /** dynamic import purpose:
   *
   * => validate environment vars AFTER dotenv.config() has loaded the ".env" file content,
   *    otherwise if there is no ".env" file, vars must be provided through the hosting provider.
   *
   * => modify "./src/env.ts" env ZOD schema to your needs,
   *    use the typed export helper (the default export)
   *
   * => you can use the absolute import: "import env from 'env'" for this purpose
   *    also absolute imports via "src/..." are enabled by default
   **/

  console.info('.env vars will be loaded if file is present');
  dotenv.config();

  console.info(`${timelogFormat(new Date())} - Starting bootstrap...`);

  await (await import('./app/bootstrap')).default();
})();
