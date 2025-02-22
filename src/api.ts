export const websiteUrl = 'https://owenmoogk.github.io/';

export interface Resources {
  [details: string]: string;
}

type ProjectMetadata = {
  title: string;
  date: string;
  githubLink: string;
  externalLink: string;
  types: string[];
  description: string;
  featured: boolean;
};

export function getExternalLinks() {
  var data: Resources = {
    github: 'https://github.com/owenmoogk',
    linkedin: 'https://linkedin.com/in/owenmoogk',
    website: 'https://owenmoogk.github.io',
  };
  return data;
}

export async function getProjectList() {
  const res = await fetch(websiteUrl + '/assets/projectDirectory.json');
  const projectList = (await res.json()) as string[];
  return projectList;
}

export async function getProjectData(projectName: string) {
  const res = await fetch(
    websiteUrl + 'assets/projects/' + projectName + '/' + projectName + '.json'
  );
  const projectData = (await res.json()) as ProjectMetadata;
  return projectData;
}
