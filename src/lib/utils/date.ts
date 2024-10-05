import type { AnimeSeason } from '@tutkli/jikan-ts';

export const getCurrentSeason = (): AnimeSeason => {
	const now = new Date();
	const month = now.getMonth();
	if (month >= 3 && month <= 5) {
		return 'spring';
	} else if (month >= 6 && month <= 8) {
		return 'summer';
	} else if (month >= 9 && month <= 11) {
		return 'fall';
	} else {
		return 'winter';
	}
};

export const validSeasons: AnimeSeason[] = ['winter', 'spring', 'summer', 'fall'];
export const validSeason = (season: string): boolean => {
	return validSeasons.includes(season as AnimeSeason);
};

export const validateSeason = async (season: string, throwIfInvalid: boolean = false): Promise<AnimeSeason> => {
	if (!validSeason(season)) {
		if (throwIfInvalid) {
			throw new Error(`Invalid season: ${season}`);
		}

		return getCurrentSeason();
	}

	return season as AnimeSeason;
};

/**
 * Check if a year is in a valid date range.
 *
 * The valid date range is from 1900 to 10 years in the future from the current date.
 *
 * @param year - Year to check.
 * @returns True if the year is in the valid date range, false otherwise.
 */
export const validDateRange = (year: number): boolean => year >= 1900 && year <= new Date().getFullYear() + 10;

export const validYear = (year: string): boolean => {
	const isValidNumber = !isNaN(parseInt(year));

	if (!isValidNumber) {
		return false;
	}

	return validDateRange(parseInt(year));
};

/**
 * Validate a year string and return the year as a number.
 *
 * If the year string is not a valid year, return the current year.
 *
 * @param year - Year string to validate.
 * @param throwIfInvalid - Throw an error if the year is not valid.
 * @returns The year as a number.
 */
export const validateYear = async (year: string, throwIfInvalid: boolean = false): Promise<number> => {
	if (!validYear(year)) {
		if (throwIfInvalid) {
			throw new Error(`Invalid year: ${year}`);
		}
		return new Date().getFullYear();
	}

	return parseInt(year);
};
