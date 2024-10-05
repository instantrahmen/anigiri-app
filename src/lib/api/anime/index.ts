import { JikanClient, type JikanResponse, type Anime, type AnimeSeason } from '@tutkli/jikan-ts';

const jikan = new JikanClient();

const currentYear = new Date().getFullYear();

export const fetchAnimeThisSeason = async () => {
	const thisSeason = await jikan.seasons.getSeasonNow();

	return thisSeason;
};

export const fetchSpecificSeason = async (season: AnimeSeason, year: number = currentYear) => {
	const specificSeason = await jikan.seasons.getSeason(year, season, {});

	return specificSeason;
};

export const fetchAllSeasons = async (year: number = currentYear) => {
	const seasons: AnimeSeason[] = ['winter', 'spring', 'summer', 'fall'];
	const promises = seasons.map((season) => fetchSpecificSeason(season, year));

	return (await Promise.all(promises)).map((season, i) => ({
		season: seasons[i],
		anime: season
	}));
};
