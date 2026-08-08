import { createElement } from '../utils.js';

export function createRepositoryCard(repo) {
  return createElement('article', { className: 'card scale-up repository-card' }, [
    createElement('div', { className: 'repo-header' }, [
      createElement('h3', {}, [repo.name]),
      createElement('span', { className: 'repo-language' }, [repo.language || 'Public'])
    ]),
    createElement('p', { className: 'repo-description' }, [repo.description || 'No description provided.']),
    createElement('div', { className: 'repo-meta' }, [
      createElement('span', {}, [`★ ${repo.stargazers_count || 0}`]),
      createElement('span', {}, [repo.updated_at ? new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown update'])
    ]),
    createElement('div', { className: 'project-actions' }, [
      createElement('a', { className: 'btn btn-secondary', href: repo.html_url, target: '_blank', rel: 'noreferrer' }, ['Repository'])
    ])
  ]);
}
