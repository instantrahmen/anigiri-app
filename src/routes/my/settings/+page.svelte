<script lang="ts">
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<div class="m-4 flex h-10 flex-row justify-end gap-4">
	<h2 class="flex-1 self-center justify-self-start align-middle text-xl tracking-wide text-muted-foreground">
		My Settings
	</h2>
</div>
