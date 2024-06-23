export const websiteUrl = "https://owenmoogk.github.io/"

export interface Resources{
	[details: string]: string;
}

// export function getProject(): Resource {
// 	return { name: "project", url: "https://example.com/project" };
// }

export function getExternalLinks() {
	var data: Resources = {
		"github": "https://github.com/owenmoogk",
		"linkedin": "https://linkedin.com/in/owenmoogk",
		"website": "https://owenmoogk.github.io"
	}
	return data
}