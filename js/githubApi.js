import { siteConfig } from './config.js';

export async function fetchGithubRepos() {
  const url = `https://api.github.com/users/${siteConfig.githubUsername}/repos?per_page=8&sort=updated`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
