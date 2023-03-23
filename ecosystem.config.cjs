module.exports = {
  // apps: [
  //   {
  //     name: 'Botlike-core',
  //     script: 'npm',
  //     automation: false,
  //     args: 'run pm2-script',
  //     env: {
  //       NODE_ENV: 'development',
  //     },
  //     env_production: {
  //       NODE_ENV: 'production',
  //     },
  //   },
  // ],
  apps: [
    {
      name: 'test',
      script: 'src/index.ts',
      exec_mode: 'fork',
      cwd: '.',
      interpreter: 'node',
      interpreter_args:
        '--require ts-node/register --require tsconfig-paths/register -r esm',
    },
  ],
};

// https://github.com/standard-things/esm
// https://www.npmjs.com/package/tsconfig-paths

// https://stackoverflow.com/questions/67600063/how-to-use-ts-node-esm-with-node-modules
// https://stackoverflow.com/questions/56566580/run-typescript-application-with-pm2
// https://github.com/wclr/ts-node-dev
// https://github.com/wclr/ts-node-dev/issues/212
// https://github.com/wclr/ts-node-dev/issues/314
// https://www.npmjs.com/package/ts-node#commonjs-vs-native-ecmascript-modules
// https://github.com/Unitech/pm2/issues/3751
// https://github.com/Unitech/pm2/issues/4540
// https://github.com/Unitech/pm2/issues/3503

// https://stackoverflow.com/questions/70541068/instead-change-the-require-of-index-js-to-a-dynamic-import-which-is-available

// ALTERNATIVE BUN:
// https://stackoverflow.com/questions/73208846/hot-reload-hmr-with-bun-dev
