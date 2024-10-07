<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { AvatarFallback, AvatarImage, Avatar } from '$lib/components/ui/avatar';
	import Icon from '@iconify/svelte';
	import { signOut } from '@auth/sveltekit/client';

	type DropdownMenuItem = {
		name: string;
		icon: any;
		href?: string;
		onclick?: () => void;
	};

	const defaultItems: DropdownMenuItem[] = [
		{
			name: 'Profile',
			icon: 'lucide:user',
			href: '/my/profile',
		},
		{
			name: 'My Lists',
			icon: 'lucide:list',
			href: '/my/lists',
		},
		{
			name: 'Settings',
			icon: 'lucide:settings',
			href: '/my/settings',
		},
	];

	let {
		children,
		avatarUrl,
		items = defaultItems,
		fallback = 'User',
	}: { children?: Snippet; items?: DropdownMenuItem[]; avatarUrl?: string | null; fallback?: string } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" size="sm" class="w-9 rounded-full" builders={[builder]}>
			<Avatar>
				<AvatarImage src={avatarUrl} />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" side="bottom" align="end">
		{#each items as { name, icon, ...props }}
			<DropdownMenu.Item {...props}>
				<Icon {icon} class="mr-2 h-4 w-4" />
				{name}
			</DropdownMenu.Item>
		{/each}
		{#if children}
			{@render children()}
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
