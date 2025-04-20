export const websiteUrl = 'https://owenmoogk.github.io';
export const githubUrl = 'https://github.com/owenmoogk';
export const emailAddress = 'owenmoogk@gmail.com';

const externalLinks: Record<string, string> = {
  website: websiteUrl,
  linkedin: 'https://www.linkedin.com/in/owenmoogk/',
  github: githubUrl,
};

export const api = {
  externalLinks: externalLinks,
};

export interface Resources {
  [details: string]: string;
}

type ProjectMetadata = {
  title: string;
  date: string;
  githubLink: string | undefined;
  externalLink: string;
  types: string[];
  description: string;
  featured: boolean;
  name: string;
};

export async function getProjectList() {
  const res = await fetch(websiteUrl + '/assets/projects.json');
  const projectList = (await res.json()) as ProjectMetadata[];
  return projectList.map((proj) => proj.name);
}

export async function getProjectData(projectName: string) {
  const res = await fetch(
    websiteUrl + '/assets/projects/' + projectName + '/' + projectName + '.json'
  );
  const projectData = (await res.json()) as ProjectMetadata;
  return projectData;
}
