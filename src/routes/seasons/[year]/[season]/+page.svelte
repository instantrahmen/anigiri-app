<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import AnimeGrid from '$lib/components/modules/anime-grid/AnimeGrid.svelte';
	import { cn, validSeasons } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	let { data } = $props();
</script>

<div class="flex flex-row justify-end gap-4">
	<h2 class="flex-1 self-center justify-self-start align-middle">{data.season} {data.year} anime</h2>
	<div
		class="flex items-center justify-center gap-2 rounded-md border bg-card text-sm font-semibold tracking-wide text-muted-foreground shadow-md"
	>
		<Button variant="ghost" size="icon" href={`/seasons/${data.year - 1}/${data.season}`}><ArrowLeft /></Button>
		<span>{data.year}</span>
		<Button variant="ghost" size="icon" href={`/seasons/${data.year + 1}/${data.season}`}><ArrowRight /></Button>
	</div>
	<nav>
		<ol
			class={cn(
				'flex h-10 flex-row items-center justify-center gap-1 rounded-md bg-muted p-1 text-muted-foreground',
				'mx-4 self-end border bg-card shadow-md'
			)}
		>
			{#each validSeasons as season}
				<li>
					<Button
						variant="ghost"
						href={`/seasons/${data.year}/${season}`}
						data-state={data.season === season ? 'active' : 'inactive'}
						class={cn(
							'inline-flex h-min items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5',
							'text-sm font-medium ring-offset-background transition-all',
							'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
							'disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
						)}
					>
						{season}
					</Button>
				</li>
			{/each}
		</ol>
	</nav>
	<!-- <Tabs.Root bind:value={localSeason}>
		<Tabs.List class="mx-4 self-end border bg-card shadow-md">
			{#each validSeasons as season}
				<Tabs.Trigger value={season}>{season}</Tabs.Trigger>
			{/each}
		</Tabs.List>
	</Tabs.Root> -->
</div>

<AnimeGrid anime={data.anime.data} />
