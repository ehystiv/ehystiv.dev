import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

interface GitHubRepo {
	name: string;
	description: string | null;
	html_url: string;
	topics: string[];
}

export const config = {
	isr: {
		expiration: 60 * 60 * 6
	}
};

export const load: PageServerLoad = async () => {
	const apiKey = env.API_TOKEN;

	// Fetch Joke
	const jokePromise = (async (): Promise<string | null> => {
		if (!apiKey) {
			console.error('API_TOKEN not found in environment variables');
			return null;
		}
		try {
			const response = await fetch('https://api.api-ninjas.com/v1/jokeoftheday', {
				headers: { 'X-Api-Key': apiKey }
			});
			if (response.ok) {
				const data = await response.json();
				return data[0]?.joke ?? null;
			}
			console.error('Failed to fetch joke:', response.statusText);
			return null;
		} catch (error) {
			console.error('Error fetching joke:', error);
			return null;
		}
	})();

	// Fetch GitHub Stars (Interests)
	const githubHeaders: Record<string, string> = {
		'User-Agent': 'ehystiv.dev',
		'X-GitHub-Api-Version': '2022-11-28'
	};
	if (env.GITHUB_TOKEN) {
		githubHeaders['Authorization'] = `Bearer ${env.GITHUB_TOKEN}`;
	}

	const interestsPromise = (async () => {
		try {
			const response = await fetch(
				'https://api.github.com/users/ehystiv/starred?sort=created&direction=desc&per_page=100',
				{ headers: githubHeaders }
			);

			if (response.ok) {
				const data: GitHubRepo[] = await response.json();
				return data.map((repo) => ({
					name: repo.name,
					description: {
						en: repo.description || '',
						it: repo.description || ''
					},
					url: repo.html_url,
					tags: (repo.topics || []).slice(0, 5)
				}));
			}
			console.error('Failed to fetch GitHub stars:', response.statusText);
			return [];
		} catch (error) {
			console.error('Error fetching GitHub stars:', error);
			return [];
		}
	})();

	const [joke, interests] = await Promise.all([jokePromise, interestsPromise]);

	return {
		joke,
		interests
	};
};
