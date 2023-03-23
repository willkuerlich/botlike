// CUSTOM LOADER FUNCTION FOR "HOT-MODULE-REPLACEMENT" WITH NODEMON AND TS-NODE
// this is the solution for the problem of ts-node with esm project mode and custom paths defined in tsconfig
// read https://stackoverflow.com/questions/71571684/ts-node-with-tsconfig-paths-wont-work-when-using-esm
// loader solution: https://github.com/TypeStrong/ts-node/discussions/1450#discussioncomment-4916809

// alternative package solutions:
// - https://github.com/sleep-written/bleed-believer/tree/master/packages/path-alias
// - https://github.com/luanglopes/ts-paths-esm-loader

// loader.js
import { isBuiltin } from 'node:module';
import { dirname } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath, pathToFileURL } from 'node:url';

import resolveCallback from 'resolve';
import { resolve as resolveTs, load } from 'ts-node/esm';
import { loadConfig, createMatchPath } from 'tsconfig-paths';

const resolveAsync = promisify(resolveCallback);
const tsExtensions = new Set(['.tsx', '.ts', '.mts', '.cts']);

const { absoluteBaseUrl, paths } = loadConfig();
const matchPath = createMatchPath(absoluteBaseUrl, paths);

async function resolve(specifier, ctx, defaultResolve) {
  const { parentURL = pathToFileURL(absoluteBaseUrl) } = ctx;

  if (isBuiltin(specifier)) {
    return defaultResolve(specifier, ctx);
  }

  if (specifier.startsWith('file://')) {
    specifier = fileURLToPath(specifier);
  }

  let url;
  try {
    const resolution = await resolveAsync(matchPath(specifier) || specifier, {
      basedir: dirname(fileURLToPath(parentURL)),
      // For whatever reason, --experimental-specifier-resolution=node doesn't search for .mjs extensions
      // but it does search for index.mjs files within directories
      extensions: ['.js', '.json', '.node', '.mjs', ...tsExtensions],
    });
    url = pathToFileURL(resolution).href;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      // Match Node's error code
      error.code = 'ERR_MODULE_NOT_FOUND';
    }
    throw error;
  }

  return resolveTs(url, ctx, defaultResolve);
}

export { resolve, load };

// https://www.npmjs.com/package/tsconfig-paths
// https://stackoverflow.com/questions/67600063/how-to-use-ts-node-esm-with-node-modules
// https://www.npmjs.com/package/ts-node#commonjs-vs-native-ecmascript-modules
// https://stackoverflow.com/questions/70541068/instead-change-the-require-of-index-js-to-a-dynamic-import-which-is-available

// ALTERNATIVE BUN:
// https://stackoverflow.com/questions/73208846/hot-reload-hmr-with-bun-dev
