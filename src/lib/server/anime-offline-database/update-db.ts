import { prisma } from '../prisma';
import type { AnimeOfflineDatabase } from './types';

const OFFLINE_DB_URL =
	'https://raw.githubusercontent.com/manami-project/anime-offline-database/refs/heads/master/anime-offline-database-minified.json';

const getUniqueId = (sources: string[]) => {
	const malLink = sources.find((link) => link.includes('myanimelist'));
	const anilistLink = sources.find((link) => link.includes('anilist'));
	const kitsuLink = sources.find((link) => link.includes('kitsu'));

	return malLink || anilistLink || kitsuLink || sources[0] || 'no-link';
};

export async function fetchAndInsertAnimeOfflineDB() {
	try {
		const response = await fetch(OFFLINE_DB_URL);
		const animeDb: AnimeOfflineDatabase = await response.json();
		const { data } = animeDb;

		// Insert anime data
		for (const anime of data) {
			const id = getUniqueId(anime.sources);

			const uniqueSeasonYear = {
				season: anime.animeSeason.season || 'UNDEFINED',
				year: anime.animeSeason.year || 0,
			};
			const animeSeason = await prisma.animeSeason.upsert({
				where: {
					uniqueSeasonYear,
				},
				create: {
					...uniqueSeasonYear,
				},
				update: {},
			});

			const data = {
				title: anime.title,
				type: anime.type,
				episodes: anime.episodes,
				status: anime.status,
				animeSeason: {
					connect: {
						id: animeSeason.id,
					},
				},
				picture: anime.picture,
				thumbnail: anime.thumbnail,
				duration: anime.duration?.value || 0,
				sources: {
					connectOrCreate: anime.sources.map((source) => ({
						where: {
							value: source,
						},

						create: {
							value: source,
						},
					})),
				},
			};

			await prisma.anime.upsert({
				where: {
					id,
				},
				create: data,
				update: data,
			});
		}
	} catch (error) {
		console.error(error);
	}
}

// fetchAndInsertAnimeOfflineDB();
