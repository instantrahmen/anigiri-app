<script lang="ts">
	import Sheet from './../Sheet.svelte';
	import type { Anime } from '@tutkli/jikan-ts';
	import { Edit, Calendar, PlayCircle, CheckCircle, Youtube } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Card } from '$lib/components/ui/card';
	import Score from './Score.svelte';
	import { Button } from '$lib/components/ui/button';

	import { cn, md, stringifyList, capitalize } from '$lib/utils';
	import { map } from 'zod';

	let { anime }: { anime: Anime } = $props();

	const dataMarkdown = '```json\n' + JSON.stringify(anime, null, 2) + '\n```';

	let sheetOpen = $state(false);

	const truncate = (str: string, maxChars: number = 100) => {
		return str.length > maxChars ? `${str.substring(0, maxChars)}...` : str;
	};

	let showMore = $state(false);

	const gridAreasDefault = `
		[grid-template-areas:'header_header''image_meta''footer_footer']
	`;

	const styleToTailwindClass = (style: string) => {
		return style.replace(' ', '_');
	};
</script>

<div class="card__container h-full w-full @container">
	<div
		class={cn(
			'card__root',
			'grid h-full w-full gap-3 overflow-hidden rounded-xl border bg-card bg-opacity-50 p-3 shadow-md backdrop-blur-lg',
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
		<div class="card__content flex flex-1 flex-col text-sm [grid-area:meta]">
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
					<p class="font-semibold">Season</p>
					<p class="text-muted-foreground">{capitalize(anime.season || 'TBA')} {anime.year}</p>
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
					<p class="text-muted-foreground">{anime.episodes}</p>
				</div>
			</div>
			<div class="card__synopsis mb-2 flex-1 text-xs text-muted-foreground">
				<span class={cn('overflow-hidden', showMore ? '' : 'line-clamp-3')} tabindex="0" role="button">
					{anime.synopsis}
				</span>
				<!-- <Button variant="link" class="m-0 inline p-0 text-xs underline" on:click={() => (showMore = !showMore)}
					>{#if showMore}show less{:else if anime.synopsis?.length > 200}show more{/if}</Button
				> -->
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
			<div class="card__footer-links flex h-min flex-wrap gap-1 rounded-md border bg-background">
				<Button variant="ghost" size="icon" href={anime.url} class="text-2xl" aria-label="My Anime List listing">
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 2.404l-1.989-2.458l-.02 5.285H.001L0 7.247h2.203l1.865 2.545l2.015-2.546zm8.628 2.069l.025 6.335h-2.365l-.008-2.871h-2.8c.07.499.21 1.266.417 1.779c.155.381.298.751.583 1.128l-1.705 1.125c-.349-.636-.622-1.337-.878-2.082a9.3 9.3 0 0 1-.507-2.179c-.085-.75-.097-1.471.107-2.212a3.9 3.9 0 0 1 1.161-1.866c.313-.293.749-.5 1.1-.687s.743-.264 1.107-.359a7.4 7.4 0 0 1 1.191-.183c.398-.034 1.107-.066 2.39-.028l.545 1.749H14.51c-.593.008-.878.001-1.341.209a2.24 2.24 0 0 0-1.278 1.92l2.663.033l.038-1.81zm3.992-2.099v6.627l3.107.032l-.43 1.775h-4.807V7.187z"
						/></svg
					>
				</Button>

				<Button
					variant="ghost"
					size="icon"
					href={anime.trailer.url}
					class="text-2xl"
					aria-label="Trailer"
					target="_blank"
				>
					<!-- <Youtube class="h-6 w-6" /> -->
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M23.498 6.186a3.02 3.02 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.02 3.02 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.02 3.02 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.02 3.02 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814M9.545 15.568V8.432L15.818 12z"
						/>
					</svg>
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
