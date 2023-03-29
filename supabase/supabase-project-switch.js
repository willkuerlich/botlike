import fs from 'fs';
import toml from 'toml';
import json2toml from 'json2toml';
import dotenv from 'dotenv';
import { Command } from 'commander';

const moduleName = 'set-supabase-project-id';
const sourceFilePath = './supabase/config.source.toml';
const destFilePath = './supabase/config.toml';

// X-TODO: consider also modifying .snaplet config to match env mode

const processArgsParser = () =>
  new Command()
    .option('-cl, --clear', 'start in clear mode')
    .option('-dev, --development', 'start in development mode')
    .option('-prod, --production', 'start in production mode');

const argsParser = processArgsParser();
argsParser.parse(process.argv);
const args = argsParser.opts();

let envMode = null;

if (args.development) {
  console.log(`${moduleName} - using SB development project id`);
  envMode = 'development';
}

if (args.production) {
  console.log(`${moduleName} - using SB production project id`);
  envMode = 'production';
}

if (args.clear) {
  console.log(`${moduleName} - removed SB project id`);
  envMode = 'clear';
}

if (!envMode) {
  throw new Error(
    `${moduleName} - no environment args found (--development | --production | --clear)`,
  );
}

const envConfig = dotenv.config({
  path: envMode === 'development' ? '.env.development' : '.env',
}).parsed;

const config = toml.parse(fs.readFileSync(sourceFilePath, 'utf8'));

config.project_id =
  !!envConfig.SB_PROJECT_ID && envMode !== 'clear' ? envConfig.SB_PROJECT_ID : '';

fs.writeFileSync(destFilePath, json2toml(config));
