<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Sheet as SheetRoot } from '$lib/components/ui/sheet';
	import type { Snippet } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import type { ComponentProps, Component } from 'svelte';

	type TriggerSnippet = Snippet<[{ builder: any }]>;
	type SheetSide = 'right' | 'top' | 'bottom' | 'left' | undefined;
	let {
		children,
		trigger,
		title,
		side = 'right',
		description,
		sheetOpen = $bindable(false),
	}: {
		children: Snippet;
		trigger: TriggerSnippet;
		title: string;
		description?: string;
		side?: SheetSide;
		sheetOpen?: boolean;
	} = $props();
</script>

<Sheet.Root bind:open={sheetOpen}>
	<Sheet.Trigger asChild let:builder>
		{@render trigger({ builder })}
	</Sheet.Trigger>
	<Sheet.Content {side} class="flex h-full max-h-full flex-col bg-card/40 backdrop-blur-lg">
		<Sheet.Header>
			<Sheet.Title>{title}</Sheet.Title>
			{#if description}
				<Sheet.Description>{@html description}</Sheet.Description>
			{/if}
		</Sheet.Header>
		<div class="flex max-h-full flex-col gap-2 overflow-hidden p-2">
			{@render children()}
		</div>
		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]} type="submit">Close</Button>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
