<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	type Props = {
		count: number;
		perPage: number;
		page: number;
		siblingCount?: number;
		onPageChange: (page: number) => void;
	};

	let {
		//
		count = 0,
		perPage = 25,
		page = $bindable(1),
		onPageChange,
		siblingCount = 3,
	}: Props = $props();
</script>

<Pagination.Root
	bind:page
	{count}
	{perPage}
	{onPageChange}
	{siblingCount}
	class="rounded-lg border bg-card shadow-md"
	let:pages
	let:currentPage
	asChild
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
