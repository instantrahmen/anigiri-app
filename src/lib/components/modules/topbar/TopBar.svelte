<script lang="ts">
	import { scale } from 'svelte/transition';

	import { toggleMode, mode } from 'mode-watcher';
	import { LogOutIcon, Sun, Moon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { cubicOut } from 'svelte/easing';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Icon from '@iconify/svelte';
	import type { Session } from '@auth/sveltekit';
	import UserMenu from './UserMenu.svelte';
	import DropdownMenuItem from '$lib/components/ui/dropdown-menu/dropdown-menu-item.svelte';

	let { session }: { session: Session | null } = $props();

	const getUserInitials = (userName = '') => {
		const splitName = userName.split(' ') || ['U'];

		const combined = splitName.reduce((a, b) => a + b[0], '');
		return combined.slice(0, 2).toUpperCase();
	};

	let userInitials = $derived(getUserInitials(session?.user?.name || 'User'));
</script>

<header
	class="mx-4 my-2 flex flex-row items-center justify-start rounded-lg border bg-card px-2 py-1 text-lg text-card-foreground shadow-md"
>
	<h1 class="text-2xl font-thin tracking-wide">
		<a
			href="/"
			class="flex items-center gap-0 rounded-lg border-b border-card-foreground px-1 transition-all hover:border-primary hover:text-primary"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" role="img">
				<title>Onigiri Icon</title>
				<path
					fill="currentColor"
					d="m231.53 146.57l-55.85-95.91l-.11-.19a56 56 0 0 0-95.14 0l-.11.19l-55.85 95.91A56 56 0 0 0 72.09 232h111.82a56 56 0 0 0 47.62-85.43m-12.68 48.88A39.49 39.49 0 0 1 183.91 216H176v-48a16 16 0 0 0-16-16H96a16 16 0 0 0-16 16v48h-7.91a40 40 0 0 1-34-61.09a2 2 0 0 0 .11-.2l55.85-95.9a40 40 0 0 1 67.84 0l55.85 95.9a2 2 0 0 0 .11.2a39.5 39.5 0 0 1 1 40.54"
				/>
			</svg>
			<span aria-hidden="true">nigiri</span>
			<span class="sr-only">anigiri</span>
		</a>
	</h1>

	<div class="ml-auto flex items-center gap-2">
		<Button on:click={toggleMode} variant="outline" size="icon" class="relative rounded-lg">
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

		{#if !session || !session.user}
			<Button variant="outline" class="rounded-md tracking-wide" on:click={() => signIn('discord')}>
				<Icon class="mr-2 h-[1.3em] w-[1.3em]" icon="fa6-brands:discord" />
				<span>Sign in</span>
			</Button>
		{:else}
			<UserMenu avatarUrl={session.user.image} fallback={userInitials}>
				<DropdownMenuItem
					on:click={() =>
						signOut({
							callbackUrl: `/`,
							redirect: true,
						})}
				>
					<LogOutIcon class="mr-2 h-4 w-4" />
					Sign Out
				</DropdownMenuItem>
			</UserMenu>
		{/if}
	</div>
</header>
