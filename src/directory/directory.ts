import type { Command } from '../commands/CommandTypes';
import * as ContactFunctions from '../commands/contact';
import * as GlobalFunctions from '../commands/global';
import * as ProjectFunctions from '../commands/projects';

export type Directory = {
  name: string;
  parent: Directory | undefined;
  commands: Partial<Record<string, Command>>;
};

export const root: Directory = {
  name: 'C:\\owenmoogk',
  parent: undefined,
  commands: {
    about: GlobalFunctions.about,
    open: GlobalFunctions.open,
  },
};

const projects: Directory = {
  name: 'projects',
  parent: root,
  commands: {
    open: ProjectFunctions.openProject,
    list: ProjectFunctions.listProjects,
    github: ProjectFunctions.projectGithub,
    details: ProjectFunctions.projectDetails,
  },
};

const contact: Directory = {
  name: 'contact',
  parent: root,
  commands: {
    email: ContactFunctions.email,
  },
};

export const directories = [root, projects, contact];

export const globalCommands: Partial<Record<string, Command>> = {
  cd: GlobalFunctions.cd,
  ls: GlobalFunctions.ls,
  help: GlobalFunctions.help,
};
