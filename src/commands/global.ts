import type { Command } from './CommandTypes';
import { api } from '../api/api';
import { directories, globalCommands, root } from '../directory/directory';

const blurb =
  'Hey! Welcome to my website. For the *non* CLI version, go to https://owenmoogk.github.io.';

export var cd: Command = {
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

export var ls: Command = {
  args: [],
  functionCall: () => {
    // TODO: FIx LS
    // if (args.path == ROOTPATH) {
    // 	return ROOT_DIR.join("  ")
    // }
    return '../';
  },
};

export var help: Command = {
  args: ['*'],
  functionCall: (path, setPath, args) => {
    return `Commands: ${Object.keys({ ...path.commands, ...globalCommands }).join(', ')}
	Type a command to see arguments
	`;
  },
};

export var about: Command = {
  args: [],
  functionCall: (path, setPath, args) => {
    return blurb;
  },
};

export var open: Command = {
  args: ['website', 'linkedin', 'github'],
  functionCall: (path, setPath, args) => {
    var arg = args[0];
    if (!arg) {
      return `Usage:
		open <resource>
		Resources:
			${Object.keys(api.getExternalLinks())}
	`;
    }
    if (Object.keys(api.getExternalLinks()).includes(arg)) {
      window.open(api.getExternalLinks()[arg]);
    } else return `'${arg}' not recognized as an argument to 'open'.`;
  },
};
