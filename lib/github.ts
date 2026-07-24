export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
};

const GITHUB_USERNAME = 'Joyston1805';

/**
 * Fetches public repos at BUILD TIME (this runs on the server during
 * `next build`, not in the visitor's browser). This means the static
 * export ships pre-baked project data and never hits GitHub's API
 * rate limit for visitors.
 */
export async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        // Default (static) caching — this runs once per `next build`, and
        // `output: 'export'` requires every route to be statically
        // renderable, which rules out `cache: 'no-store'`.
      }
    );

    if (!res.ok) {
      console.warn(`GitHub API responded ${res.status}; falling back to empty project list.`);
      return [];
    }

    const repos: Repo[] = await res.json();

    return repos
      .filter((r) => !r.fork)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  } catch (err) {
    console.warn('Could not reach GitHub API during build, shipping an empty project list.', err);
    return [];
  }
}
