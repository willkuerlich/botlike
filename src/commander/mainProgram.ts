// import processArgs from 'args';
import { Command } from '@commander-js/extra-typings';
import { CommandRequestData } from './commander.types';

export function getMainCommand(
  configureOutput: {},
  commandRequestMetaData: CommandRequestData,
) {
  const program = new Command()
    .exitOverride(/* (err) => cb(err.message) */)
    .configureOutput(configureOutput)
    .addHelpCommand('help [command]', 'show help for command') // customization
    .enablePositionalOptions() // https://github.com/tj/commander.js/blob/HEAD/examples/positional-options.js
    .configureHelp({
      // helpWidth: 30, // specify the wrap width, useful for unit tests
      // sortSubcommands: true, // sort the subcommands alphabetically
      // sortOptions: true, // sort the options alphabetically
      subcommandTerm: (cmd) => cmd.name(), // Just show the name, instead of short usage.
      showGlobalOptions: true, // show a section with the global options from the parent command(s)
    });
  // .helpOption('-h, --HELP', 'read more information')
  // .error('Custom processing has failed', { exitCode: 2, code: 'my.custom.error' })
  // .on('option:verbose', function () {
  //   process.env.VERBOSE = this.opts().verbose;
  // })
  // .help({ error: true }); // display help information and exit immediately. You can optionally pass { error: true } to display on stderr and exit with an error status.

  program
    .name(commandRequestMetaData.commandInfo.commandTriggerPrefix || '')
    // .summary('A cool CLI')
    .usage("[action] [options] -t 'Your prompt...'") // This allows you to customise the usage description in the first line of the help. Given:
    .description('Botlike CLI to parse user prompts')
    .version('Botlike v0.1.0-alpha.0');
  // .help({ error: true });
  return program;
}

export default getMainCommand;
