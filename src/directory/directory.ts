import type { Command } from '../commands/CommandTypes';
import * as GlobalFunctions from '../commands/global';
import * as ProjectFunctions from '../commands/projects';

export type Directory = {
  name: string;
  parent: Directory | undefined;
  commands: Partial<Record<string, Command>>;
};

export var root: Directory = {
  name: 'C:\\owenmoogk.github.io',
  parent: undefined,
  commands: {},
};

var projects: Directory = {
  name: 'projects',
  parent: root,
  commands: {
    project: ProjectFunctions.openProject,
    // "projects": ProjectFunctions.listProjects,
    // "project_list": ProjectFunctions.listProject,
    // "github": ProjectFunctions.openGithub,
  },
};

export const directories = [root, projects];

export var globalCommands: Partial<Record<string, Command>> = {
  cd: GlobalFunctions.cd,
  ls: GlobalFunctions.ls,
  help: GlobalFunctions.help,
  about: GlobalFunctions.about,
  open: GlobalFunctions.open,
};
