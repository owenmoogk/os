import type { Directory } from '../directory/directory';

type CommandFunctionCall = (
  path: Directory,
  setPath: (dir: Directory) => void,
  args: string[]
) => string | void | Promise<string | void>;

export type Command = {
  args: string[];
  functionCall: CommandFunctionCall;
};
