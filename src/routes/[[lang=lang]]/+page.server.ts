import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const apiKey = env.API_TOKEN;

    // Fetch Joke
    const jokePromise = (async () => {
        if (!apiKey) {
            console.error('API_TOKEN not found in environment variables');
            return 'API Key missing';
        }
        try {
            const response = await fetch('https://api.api-ninjas.com/v1/jokeoftheday', {
                headers: { 'X-Api-Key': apiKey }
            });
            if (response.ok) {
                const data = await response.json();
                return data[0]?.joke || 'No joke found today.';
            }
            console.error('Failed to fetch joke:', response.statusText);
            return 'Failed to fetch joke.';
        } catch (error) {
            console.error('Error fetching joke:', error);
            return 'Error loading joke.';
        }
    })();

    // Fetch GitHub Stars (Interests)
    const interestsPromise = (async () => {
        try {
            const response = await fetch('https://api.github.com/users/ehystiv/starred?sort=created&direction=desc&per_page=100', {
                headers: {
                    'User-Agent': 'ehystiv.dev',
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data[1]);
                return data.map((repo: any) => ({
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
