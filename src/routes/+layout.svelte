<script lang="ts">
	import 'highlight.js/styles/github-dark.min.css';
	import '../app.css';

	import { ModeWatcher } from 'mode-watcher';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import TopBar from '$lib/components/modules/topbar/TopBar.svelte';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<ModeWatcher />

<TopBar session={data.session} />

{@render children()}
