import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    try {
        const apiKey = env.API_TOKEN;
        if (!apiKey) {
            console.error('API_TOKEN not found in environment variables');
            return { joke: 'API Key missing' };
        }
        const response = await fetch('https://api.api-ninjas.com/v1/jokeoftheday', {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        if (response.ok) {
            const data = await response.json();
            // API returns an array like [{ joke: "..." }]
            const joke = data[0]?.joke || 'No joke found today.';
            return { joke };
        } else {
            console.error('Failed to fetch joke:', response.statusText);
            return { joke: 'Failed to fetch joke.' };
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
        return { joke: 'Error loading joke.' };
    }
};
