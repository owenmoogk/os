import type { Command } from './CommandTypes';
import {
  getProjectData,
  getProjectList,
  githubUrl,
  websiteUrl,
} from '../api/api';

export const openProject: Command = {
  args: ['*'],
  functionCall: async (_, __, args) => {
    const arg = args[0];
    if (!arg) {
      return 'Specify the name of a project to open';
    }
    const projects = await getProjectList();
    if (projects.includes(arg)) {
      window.open(`${websiteUrl}/projects/${arg}`);
    } else return `'${arg}' not a valid project.`;
  },
};

export const listProjects: Command = {
  args: [],
  functionCall: async () => {
    return (await getProjectList()).join(', ');
  },
};

export const projectGithub: Command = {
  args: ['*'],
  functionCall: async (_, __, args) => {
    const arg = args[0];
    if (!arg) {
      return 'Specify the name of a project to view the github';
    }
    const projects = await getProjectList();
    if (projects.includes(arg)) {
      const metadata = await getProjectData(arg);
      if (metadata.githubLink) {
        window.open(`${githubUrl}/${arg}`);
      } else {
        return `Project ${arg} does not have an associated GitHub repository.`;
      }
    }
  },
};

export const projectDetails: Command = {
  args: ['*'],
  functionCall: async (_, __, args) => {
    const arg = args[0];
    if (!arg) {
      return 'Specify the name of a project to view the details';
    }
    const projects = await getProjectList();
    if (projects.includes(arg)) {
      const metadata = await getProjectData(arg);
      return `Name: ${metadata.title}
Date: ${metadata.date}
Description: ${metadata.description}
Tech: ${metadata.types.join(', ')}`;
    }
  },
};
