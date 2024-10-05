<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { type Anime } from '@tutkli/jikan-ts';

	import type { PageData } from './$types';
	import AnimeGrid from '$lib/components/modules/anime-grid/AnimeGrid.svelte';
	import { Button } from '$lib/components/ui/button';

	const { data }: { data: PageData } = $props();

	const seasons = [
		{
			id: 'winter',
			name: 'Winter',
		},
		{
			id: 'spring',
			name: 'Spring',
		},
		{
			id: 'summer',
			name: 'Summer',
		},
		{
			id: 'fall',
			name: 'Fall',
		},
	];

	let currentSeason = $state(0);
</script>

<!-- <Tabs.Root value={seasons[currentSeason].id} class="flex flex-col">
	<Tabs.List class="mx-4 self-end">
		{#each seasons as season}
			<Tabs.Trigger value={season.id}>{season.name}</Tabs.Trigger>
		{/each}
	</Tabs.List> -->
<!-- {#each seasons as season} -->
<!-- <Tabs.Content value={season.id} class="m-4"> -->
<!-- <AnimeGrid anime={data.anime.data} /> -->
<Button href="/seasons/2024/fall">Go to anime list</Button>
<!-- <pre class="max-w-screen flex w-full overflow-scroll text-sm">
{JSON.stringify(data.anime, null, 2)}
			</pre> -->
<!-- </Tabs.Content> -->
<!-- {/each} -->
<!-- </Tabs.Root> -->
