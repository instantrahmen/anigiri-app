import { JikanClient, type AnimeSeason, type JikanSeasonsParams } from '@tutkli/jikan-ts';

const jikan = new JikanClient();

const currentYear = new Date().getFullYear();

export const fetchAnimeThisSeason = async () => {
	const thisSeason = await jikan.seasons.getSeasonNow();

	return thisSeason;
};

export const fetchSpecificSeason = async (
	season: AnimeSeason,
	year: number = currentYear,
	params: Partial<JikanSeasonsParams> = {}
) => {
	const specificSeason = await jikan.seasons.getSeason(year, season, {
		...params,
	});

	return specificSeason;
};
