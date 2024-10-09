export type License = {
	name: string;
	url: string;
};

export interface Anime {
	sources: string[];
	title: string;
	type: AnimeType;
	episodes: number;
	status: AnimeStatus;
	animeSeason: AnimeSeasonObject;
	picture: string;
	thumbnail: string;
	synonyms: string[];
	relatedAnime: string[];
	tags: string[];
	duration: {
		value: number;
		unit: 'SECONDS';
	};
}

export type AnimeType = 'TV' | 'MOVIE' | 'OVA' | 'ONA' | 'SPECIAL' | 'UNKNOWN';
export type AnimeStatus = 'FINISHED' | 'ONGOING' | 'UPCOMING' | 'UNKNOWN';
export type AnimeSeason = 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER' | 'UNDEFINED';

export type AnimeSeasonObject = {
	season: AnimeSeason;
	year: number;
};

export type AnimeDuration = {
	value: number;
	unit: 'SECONDS';
};

export type AnimeOfflineDatabase = {
	license: License;
	repository: string;
	lastUpdate: string;
	data: Anime[];
};
