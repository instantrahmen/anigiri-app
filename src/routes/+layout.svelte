<script lang="ts">
	import 'highlight.js/styles/github-dark.min.css';
	import '../app.css';
	import { scale } from 'svelte/transition';

	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { Button } from '$lib/components/ui/button';
	import { quintOut, cubicOut } from 'svelte/easing';

	let { children } = $props();
</script>

<ModeWatcher />

<header
	class="m-4 flex flex-row items-center justify-start rounded-md border bg-card p-3 text-lg text-card-foreground shadow-md"
>
	<h1 class="flex items-center text-2xl font-thin">
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" role="img">
			<title>Anigiri</title>
			<path
				fill="currentColor"
				d="m231.53 146.57l-55.85-95.91l-.11-.19a56 56 0 0 0-95.14 0l-.11.19l-55.85 95.91A56 56 0 0 0 72.09 232h111.82a56 56 0 0 0 47.62-85.43m-12.68 48.88A39.49 39.49 0 0 1 183.91 216H176v-48a16 16 0 0 0-16-16H96a16 16 0 0 0-16 16v48h-7.91a40 40 0 0 1-34-61.09a2 2 0 0 0 .11-.2l55.85-95.9a40 40 0 0 1 67.84 0l55.85 95.9a2 2 0 0 0 .11.2a39.5 39.5 0 0 1 1 40.54"
			/>
		</svg>
		<span aria-hidden="true">nigiri</span>
		<span class="sr-only">anigiri</span>
	</h1>

	<div class="ml-auto flex items-center">
		<Button on:click={toggleMode} variant="outline" size="icon" class="relative">
			{#if $mode === 'dark'}
				<div class="absolute" transition:scale={{ duration: 500, delay: 0, opacity: 0.5, start: 0, easing: cubicOut }}>
					<Sun class="h-[1.3em] w-[1.3em]" />
				</div>
			{:else}
				<div class="absolute" transition:scale={{ duration: 500, delay: 0, opacity: 0.5, start: 0, easing: cubicOut }}>
					<Moon class="h-[1.3em] w-[1.3em]" />
				</div>
			{/if}
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
</header>

{@render children()}
