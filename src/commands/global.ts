import type { Command } from './CommandTypes';
import { api, websiteUrl } from '../api/api';
import type { Directory } from '../directory/directory';
import { directories, globalCommands } from '../directory/directory';

const blurb =
  'Hey! Welcome to my website. For the *non* CLI version, go to https://owenmoogk.github.io.';

const findDirectory = (
  pathArray: string[],
  directories: Directory[],
  current?: Directory
): Directory | undefined => {
  if (!pathArray.length) return current;

  const segment = pathArray[0];

  if (segment === '..') {
    return findDirectory(
      pathArray.slice(1),
      directories,
      current?.parent ?? current
    );
  }

  const matchingDir = directories.find(
    (dir) => dir.name === segment && (!current || dir.parent === current)
  );

  if (!matchingDir) return undefined;

  return findDirectory(pathArray.slice(1), directories, matchingDir);
};

export const cd: Command = {
  args: ['*'],
  functionCall: (path, setPath, args) => {
    const pathInput = args[0];
    if (!pathInput) return "Enter a path. To see paths, use 'ls'";

    const pathArray = pathInput.startsWith('/')
      ? pathInput.split('/').filter((x) => x)
      : pathInput.split('/').filter((x) => x);

    const targetDir = findDirectory(
      pathArray,
      directories,
      pathInput.startsWith('/') ? undefined : path
    );

    if (!targetDir) {
      return "Path does not exist. To see paths, use 'ls'";
    }

    setPath(targetDir);
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

export const work: Command = {
  args: [],
  functionCall: () => {
    window.open(`${websiteUrl}/work`);
  },
};
