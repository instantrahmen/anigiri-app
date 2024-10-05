<script lang="ts">
	import { type Anime } from '@tutkli/jikan-ts';
	import AnimeCard from './AnimeCard.svelte';
	import { ZoomIn, ZoomOut } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	const { anime }: { anime: Anime[] } = $props();

	const defaultZoomLevel = 2;

	let gridSizes = $state([
		'grid-cols-1 xl:grid-cols-2',
		'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
		'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
		'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5',
		'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6',
	]);

	let gridZoomLevel = $state(defaultZoomLevel);
</script>

<div class="flex flex-col gap-2 p-4 @container">
	<div
		class="sticky top-2 z-10 flex w-full justify-end rounded-lg border bg-card/75 p-1 text-card-foreground shadow backdrop-blur-lg"
	>
		<div id="size-controls" class="flex gap-2">
			<Button
				variant="ghost"
				size="icon"
				on:click={() => gridZoomLevel++}
				disabled={gridZoomLevel === gridSizes.length - 1}
			>
				<ZoomOut />
			</Button>
			<Button variant="ghost" size="icon" on:click={() => gridZoomLevel--} disabled={gridZoomLevel === 0}>
				<ZoomIn />
			</Button>
		</div>
	</div>
	<section id="anime-grid" class="grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-4">
		{#each anime as animeData}
			<AnimeCard anime={animeData} />
		{/each}
	</section>
</div>
