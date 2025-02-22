import type { Command } from './CommandTypes';
import { api } from '../api/api';
import { directories, globalCommands, root } from '../directory/directory';

const blurb =
  'Hey! Welcome to my website. For the *non* CLI version, go to https://owenmoogk.github.io.';

export const cd: Command = {
  args: ['*'],
  functionCall: (path, setPath, args) => {
    const pathInput = args[0];

    if (!pathInput) {
      return `Enter a path. To see paths, use 'ls'.`;
    } else if (pathInput.startsWith('/')) {
      // TODO: Add logic for cd /projects or sm else
      setPath(root);
    } else if (pathInput == '../' || pathInput == '..') {
      setPath(path.parent ?? path);
    } else if (
      directories.filter((x) => x.name == pathInput && x.parent == path)
        .length == 1
    ) {
      setPath(
        directories.filter((x) => x.name == pathInput && x.parent == path)[0]
      );
    } else {
      return `Path does not exist. To see paths, use 'ls'.`;
    }
  },
};

export const ls: Command = {
  args: [],
  functionCall: (path) => {
    return [
      '../',
      ...directories.filter((x) => x.parent == path).map((x) => x.name),
    ].join('    ');
  },
};

export const help: Command = {
  args: ['*'],
  functionCall: (path) => {
    return `Commands: ${Object.keys({ ...path.commands, ...globalCommands }).join(', ')}
	Type a command to see arguments
	`;
  },
};

export const about: Command = {
  args: [],
  functionCall: () => {
    return blurb;
  },
};

export const open: Command = {
  args: Object.keys(api.externalLinks),
  functionCall: (_, __, args) => {
    const arg = args[0];
    if (!arg) {
      return `Specify: ${Object.keys(api.externalLinks).join(', ')}`;
    }
    window.open(api.externalLinks[arg]);
  },
};
