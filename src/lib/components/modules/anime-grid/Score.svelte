<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { checkScore, scoreWithinRange, clamp, convertScore, cn } from '$lib/utils';
	import { Angry, Frown, Meh, Smile, Laugh, StarOff } from 'lucide-svelte';

	let { score, hideIfNoScore = false }: { score: number; hideIfNoScore?: boolean } = $props();

	$effect(() => {
		if (score > 10) {
			console.warn(
				`Score [${score}] should not be greater than 10, please ensure you're passing a score on a 10 point scale.`
			);
		}
	});

	const sharedScoreStyle = 'h-6 w-6';
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		{#if !score}
			{#if !hideIfNoScore}
				<StarOff class={cn(sharedScoreStyle, 'text-gray-500')} />
			{/if}
		{:else if checkScore.veryBad(score)}
			<Angry class={cn(sharedScoreStyle, 'text-red-500')} />
		{:else if checkScore.bad(score)}
			<Frown class={cn(sharedScoreStyle, 'text-orange-500')} />
		{:else if checkScore.mixed(score)}
			<Meh class={cn(sharedScoreStyle, 'text-yellow-500')} />
		{:else if checkScore.good(score)}
			<Smile class={cn(sharedScoreStyle, 'text-lime-500')} />
		{:else if checkScore.veryGood(score)}
			<Laugh class={cn(sharedScoreStyle, 'text-green-500')} />
		{/if}
	</Tooltip.Trigger>
	<Tooltip.Content>
		{#if score}
			{score} / 10
		{:else}
			No rating available
		{/if}
	</Tooltip.Content>
</Tooltip.Root>

<style lang="postcss">
</style>
