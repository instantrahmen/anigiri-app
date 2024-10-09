import { hoursToMs } from '$lib/utils';
import {
	JikanClient,
	type Anime,
	type AnimeSeason,
	type JikanResponse,
	type JikanSeasonsParams,
} from '@tutkli/jikan-ts';

const jikan = new JikanClient();
const useCache = true;
const currentYear = new Date().getFullYear();

type CacheItem = {
	created_at: Date;
	expires_in: number;
	season: AnimeSeason;
	year: number;
	params: Partial<JikanSeasonsParams>;
	anime: JikanResponse<Anime[]>;
};

const cache: Map<string, CacheItem> = new Map();

export const cleanCache = () => {
	const now = new Date();
	const expiredItems = Array.from(cache.values()).filter(
		(item) => item.created_at.getTime() + item.expires_in < now.getTime()
	);
	for (const item of expiredItems) {
		cache.delete(item.season + '/' + item.year);
	}
};

export const fetchAnimeThisSeason = async () => {
	const thisSeason = await jikan.seasons.getSeasonNow();

	return thisSeason;
};

const createKey = (season: AnimeSeason, year: number, params: Partial<JikanSeasonsParams>) => {
	const paramsString = new URLSearchParams(params as Record<string, string>).toString();

	return `${season}/${year}/${paramsString}`;
};

export const fetchSpecificSeason = async (
	season: AnimeSeason,
	year: number = currentYear,
	params: Partial<JikanSeasonsParams> = {}
) => {
	const cacheKey = createKey(season, year, params);

	console.log('cache entries:', cache.size);

	if (cache.has(cacheKey) && useCache) {
		const cacheItem = cache.get(cacheKey);
		console.log(`Got cache for ${cacheKey}`);
		if (cacheItem && cacheItem.created_at.getTime() + cacheItem.expires_in > new Date().getTime()) {
			return cacheItem.anime;
		}
		console.log('Cache expired, deleting');
		cache.delete(cacheKey);
	}

	console.log('no cache found, fetching new');

	const specificSeason = await jikan.seasons.getSeason(year, season, {
		...params,
	});

	cache.set(cacheKey, {
		created_at: new Date(),
		expires_in: hoursToMs(1),
		season,
		year,
		params,
		anime: specificSeason,
	});

	return specificSeason;
};
