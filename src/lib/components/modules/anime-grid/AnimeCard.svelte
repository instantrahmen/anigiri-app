<script lang="ts">
	import Sheet from './../Sheet.svelte';
	import type { Anime } from '@tutkli/jikan-ts';
	import { Edit, Calendar, PlayCircle, CheckCircle, Heart, BookHeart } from 'lucide-svelte';
	import Icon from '@iconify/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { cn, md, stringifyList, capitalize } from '$lib/utils';
	import { page } from '$app/stores';
	import type { Session } from '@auth/sveltekit';

	let { anime }: { anime: Anime } = $props();

	let session = $page.data.session;

	const dataMarkdown = '```json\n' + JSON.stringify(anime, null, 2) + '\n```';

	let sheetOpen = $state(false);
	let showMore = $state(false);
	let favorite = $state(false);

	const gridAreasDefault = `
		[grid-template-areas:'header_header''image_meta''footer_footer']
	`;
</script>

<div class="card__container relative h-full w-full @container">
	<!-- Favorite Button -->
	{#if session}
		<Button
			variant="ghost"
			size="icon"
			class={cn(
				'absolute -right-3 -top-3 z-10 rounded-full border',
				favorite
					? ' border-none bg-none text-3xl text-red-500 hover:text-red-500 active:text-4xl'
					: 'bg-muted/10 text-2xl text-muted-foreground backdrop-blur-md active:text-xl',
				'transition-all'
			)}
			on:click={() => (favorite = !favorite)}
		>
			<Icon icon={favorite ? 'mdi:heart' : 'mdi:heart-outline'} class="h-[1em] w-[1em]" />
			<span class="sr-only">Add to favorites</span>
		</Button>
	{/if}
	<div
		class={cn(
			'card__root',
			'grid h-full w-full gap-3 overflow-hidden rounded-xl border bg-card bg-opacity-50 p-3 shadow-md backdrop-blur-lg',
			'grid-rows-[auto_1fr_auto]',
			'z-2',

			gridAreasDefault
		)}
	>
		<header
			class={cn('card__header', 'col-span-2 flex items-start justify-between text-center ', '[grid-area:header]')}
		>
			<h2
				class="text-[clamp(1.25rem, 3vw, 1.75rem)] flex w-full flex-col pr-2 text-center font-medium leading-tight"
				style="font-size: clamp(0.8rem, 19cqi, 1.2rem)"
			>
				<Button
					variant="link"
					on:click={() => (sheetOpen = true)}
					class="m-0 line-clamp-2 text-wrap p-0  text-base font-medium leading-tight tracking-wide text-card-foreground"
					>{anime.title_english || anime.title}</Button
				>
				{#if anime.title_english}
					<span class="line-clamp-2 text-xs leading-tight text-muted-foreground">{anime.title}</span>
				{/if}
			</h2>
		</header>
		<div class="card__image relative h-full w-full items-center [grid-area:image]">
			<img
				src={anime.images.webp?.image_url || anime.images.jpg.image_url}
				alt="poster for {anime.title}"
				class={cn('self-center rounded-lg border  shadow-md', 'h-full w-full object-cover')}
			/>
		</div>
		<div class="card__content flex h-full flex-1 flex-col text-sm [grid-area:meta]">
			<div class="card__metadata mb-2 grid grid-cols-2 gap-2 text-xs">
				<div>
					<p class="font-semibold">Studio</p>
					<p class="card__studio-links prose-xs text-muted-foreground">
						{@html stringifyList(
							anime.studios?.map((s) => s.name) || [],
							false,
							anime.studios?.map((s) => s.url)
						)}
					</p>
				</div>
				<div class="text-right">
					<!-- TODO: demographics -->
					{#if anime.demographics && anime.demographics.length > 0}
						<p class="font-semibold">Demographic</p>
						<p class="text-muted-foreground">{stringifyList(anime.demographics.map((d) => d.name))}</p>
					{/if}
				</div>
				<div>
					<p class="font-semibold">Air Date</p>
					<p class="flex items-center text-muted-foreground">
						<Calendar class="mr-1 h-4 w-4" />
						{#if anime.aired?.from}
							{new Date(anime.aired.from).toLocaleDateString(undefined, {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
							})}
						{:else}
							TBA
						{/if}
					</p>
				</div>
				<div class="text-right">
					{#if anime.season}
						<p class="font-semibold">Season</p>
						<p class="text-muted-foreground">{capitalize(anime.season || 'TBA')} {anime.year}</p>
					{/if}
				</div>
				<div>
					<p class="font-semibold">Status</p>
					<p class="flex items-center text-muted-foreground">
						{#if anime.airing}
							<PlayCircle class="mr-1 h-4 w-4 text-green-400" />
						{:else if !anime.aired}
							<CheckCircle class="mr-1 h-4 w-4" />
						{/if}
						{capitalize(anime.status)}
					</p>
				</div>
				<div class="text-right">
					<p class="font-semibold">Episodes</p>
					<p class="text-muted-foreground">{anime.episodes || '??'}</p>
				</div>
			</div>
			<div class="card__synopsis mb-2 flex-1 text-xs text-muted-foreground">
				<span class={cn('overflow-hidden', showMore ? '' : 'line-clamp-3')} tabindex="0" role="button">
					{anime.synopsis}
				</span>
			</div>
		</div>
		<footer class="card__footer col-span-2 flex flex-col gap-2 [grid-area:footer]">
			<div class="flex flex-wrap gap-1">
				{#each anime.genres as genre}
					<Badge variant="default" class="hover:bg-opacity/20 bg-opacity-50 px-[0.5rem]  text-[0.625rem]">
						{genre.name}
					</Badge>
				{/each}
			</div>
			<div class="card__footer-links flex h-min flex-wrap items-center gap-1 rounded-md border bg-background p-1">
				<span class="mx-2 flex-1 text-xs capitalize text-muted-foreground">links:</span>
				<Button variant="ghost" size="icon" href={anime.url} class="text-2xl" aria-label="My Anime List listing">
					<Icon icon="simple-icons:myanimelist" class="h-6 w-6" />
				</Button>

				<Button
					variant="ghost"
					size="icon"
					href={anime.trailer.url}
					class="text-2xl"
					aria-label="Trailer"
					target="_blank"
				>
					<Icon icon="mdi:youtube" class="h-6 w-6" />
				</Button>
			</div>
		</footer>
	</div>
</div>

<Sheet title={anime.title_english || anime.title} side="bottom" bind:sheetOpen>
	{#snippet trigger({ builder })}
		<Button variant="ghost" size="icon" builders={[builder]} class="hidden">
			<Edit />
		</Button>
	{/snippet}
	<div class="prose-sm overflow-auto">
		{@html md.render(dataMarkdown)}
	</div>
</Sheet>

<style lang="postcss">
	:global(.sheet-content) {
		@apply m-0 h-full w-full max-w-full flex-1 overflow-hidden rounded-lg border bg-card p-0 text-[0.625rem];
	}

	:global(.sheet-content pre) {
		@apply m-0 overflow-scroll p-0;
	}
</style>
