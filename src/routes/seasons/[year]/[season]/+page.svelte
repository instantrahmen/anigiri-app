<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import AnimeGrid from '$lib/components/modules/anime-grid/AnimeGrid.svelte';
	import { cn, md, titleCase, validSeasons } from '$lib/utils';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import * as Pagination from '$lib/components/ui/pagination';
	// import { mediaQuery } from 'svelte-legos';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import type { JikanPagination } from '@tutkli/jikan-ts';
	import { goto } from '$app/navigation';
	let { data } = $props();

	let pagination: JikanPagination | undefined = $derived(data.anime.pagination);
	let page = $state(data.page);
</script>

<div class="m-4 flex h-10 flex-row justify-end gap-4">
	<h2 class="flex-1 self-center justify-self-start align-middle text-xl tracking-wide text-muted-foreground">
		{titleCase(`${data.season} ${data.year} Anime`)}
	</h2>
	<div
		class="flex items-center justify-center gap-2 rounded-lg border bg-card text-sm font-semibold tracking-wide text-muted-foreground shadow-md"
	>
		<Button variant="ghost" size="icon" href={`/seasons/${data.year - 1}/${data.season}`}
			><ArrowLeft class="h-[1em] w-[1em]" /></Button
		>
		<span>{data.year}</span>
		<Button variant="ghost" size="icon" href={`/seasons/${data.year + 1}/${data.season}`}
			><ArrowRight class="h-[1em] w-[1em]" /></Button
		>
	</div>
	<nav>
		<ol
			class={cn(
				'flex h-10 flex-row items-center justify-center gap-1 rounded-lg bg-muted p-1 text-muted-foreground',
				'self-end border bg-card shadow-md'
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
</div>

<div class="sticky top-2 z-10 m-4">
	{@render paginationLinks()}
</div>

<AnimeGrid anime={data.anime.data} />

{#snippet paginationLinks()}
	<Pagination.Root
		bind:page
		count={pagination?.items?.total || 0}
		perPage={data.anime.pagination?.items?.per_page || 0}
		class="rounded-lg border bg-card shadow-md"
		siblingCount={3}
		let:pages
		let:currentPage
		asChild
		onPageChange={(page) => goto(`/seasons/${data.year}/${data.season}?page=${page}`)}
	>
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton>
					<ChevronLeft class="h-4 w-4" />
					<span class="hidden sm:block">Previous</span>
				</Pagination.PrevButton>
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link {page} isActive={currentPage === page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton>
					<span class="hidden sm:block">Next</span>
					<ChevronRight class="h-4 w-4" />
				</Pagination.NextButton>
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
{/snippet}

<!-- <div
	class="flex flex-row items-center justify-center gap-2 rounded-lg border bg-card text-sm font-semibold tracking-wide text-muted-foreground shadow-md"
>
	{#each pages as page}
		<Button
			class={cn(
				'inline-flex h-min items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5',
				'text-sm font-medium ring-offset-background transition-all',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
				'disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
			)}
			href={`/seasons/${data.year}/${data.season}?page=${page.page}`}
		>
			{page.page}
		</Button>
	{/each}
</div> -->
<!-- <div class="prose-sm">
	{@html md.render(`
\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\`
`)}
</div> -->
