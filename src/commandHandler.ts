import type { Directory } from './directory/directory';
import { globalCommands } from './directory/directory';

export function commandError(
  path: Directory,
  command: string,
  args: string[],
  addOutputs: (output: string[]) => void
) {
  addOutputs([
    getFullPathname(path) + '> ' + command + ' ' + args.join(' '),
    `'${command}' is not recognized as a valid command or executable.`,
  ]);
}

export function argumentError(
  path: Directory,
  command: string,
  args: string[],
  addOutputs: (output: string[]) => void
) {
  addOutputs([
    getFullPathname(path) + '> ' + command + ' ' + args.join(' '),
    `'${args[0]}' is not recognized as a valid argument to '${command}'. Type '${command}' to see valid usage.`,
  ]);
}

export function commandHandler(
  input: string,
  path: Directory,
  setPath: (dir: Directory) => void,
  addOutputs: (output: string[]) => void
) {
  var [command, ...args] = input.split(' ');

  var commandObject = path.commands[command];
  if (!commandObject) {
    commandObject = globalCommands[command];
  }
  if (!commandObject) {
    commandError(path, command, args, addOutputs);
    return;
  }

  // if there are no args, or valid first arg, pass to the function to handle the rest
  if (
    args.length == 0 ||
    commandObject.args.includes(args[0]) ||
    commandObject.args.includes('*')
  ) {
    var output = commandObject.functionCall(path, setPath, args);

    // if there's an output, add the cmd and output, otherwise just add the command
    if (output) addOutputs([getFullPathname(path) + '> ' + input, output]);
    else addOutputs([getFullPathname(path) + '> ' + input]);
  } else {
    argumentError(path, command, args, addOutputs);
  }
}

export function getFullPathname(path: Directory): string {
  if (path.parent) {
    return getFullPathname(path.parent) + '\\' + path.name;
  }
  return path.name;
}
