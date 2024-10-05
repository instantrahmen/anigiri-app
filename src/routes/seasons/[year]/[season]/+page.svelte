<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import AnimeGrid from '$lib/components/modules/anime-grid/AnimeGrid.svelte';
	import { validSeasons } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	let { data } = $props();

	let localSeason = $state(data.season);
	let localYear = $state(data.year);
	$effect(() => {
		// navigate new season
		goto(`/seasons/${localYear}/${localSeason}`);
	});
</script>

<!-- {localSeason} -->
<div class="flex flex-row justify-end gap-4">
	<h2 class="flex-1 self-center justify-self-start align-middle">{data.season} {data.year} anime</h2>
	<div
		class="flex items-center justify-center gap-2 rounded border bg-card text-sm font-semibold tracking-wide text-muted-foreground shadow-md"
	>
		<Button variant="ghost" size="icon" on:click={() => (localYear = localYear - 1)}><ArrowLeft /></Button>
		<span>{localYear}</span>
		<Button variant="ghost" size="icon" on:click={() => (localYear = localYear + 1)}><ArrowRight /></Button>
	</div>
	<Tabs.Root bind:value={localSeason}>
		<Tabs.List class="mx-4 self-end border bg-card shadow-md">
			{#each validSeasons as season}
				<Tabs.Trigger value={season}>{season}</Tabs.Trigger>
			{/each}
		</Tabs.List>
	</Tabs.Root>
</div>

<AnimeGrid anime={data.anime.data} />
