const API_BASE_URL = 'https://api.jikan.moe/v4';

export const fetchEntireAnimeDatabase = async () => {
	const response = await fetch('https://api.jikan.moe/v4/anime');
	const data = await response.json();
	return data.data;
};
