import { getExternalLinks } from "../api";

export const api = {
    getExternalLinks: (): Record<string, string> => {
        return {
            "website": "https://owenmoogk.github.io",
            "linkedin": "https://www.linkedin.com/in/owenmoogk/",
            "github": "https://github.com/owenmoogk",
        }
    },

}