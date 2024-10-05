import type { PageLoad } from './$types';
import { validateSeason, validateYear } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import { fetchSpecificSeason } from '$lib/api/anime';

export const load: PageLoad = async ({ params: { year: yearString, season: seasonString } }) => {
	const year = await validateYear(yearString);
	const season = await validateSeason(seasonString);

	// redirect if year or season is different after validation to make sure the url matches what is being shown
	if (parseInt(yearString) !== year || seasonString !== season) {
		redirect(301, `/seasons/${year}/${season}`);
	}

	return {
		year,
		season,
		anime: await fetchSpecificSeason(season, year),
	};
};
