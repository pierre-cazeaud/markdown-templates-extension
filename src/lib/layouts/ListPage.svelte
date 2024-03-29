<script lang="ts">
  import Button from '@/lib/components/Button.svelte';
  import NoTemplate from '@/lib/layouts/NoTemplate.svelte';
  import { ArrowDownToLineIcon, PlusIcon } from 'lucide-svelte';
  import { store } from '../utils/store.svelte.ts';

  type Props = {
    onCreateClick: () => void;
    onImportClick: () => void;
  };

  let templatesStore = store();

  let { onCreateClick, onImportClick }: Props = $props();
</script>

{#if templatesStore.isLoading}
  Loading
{:else if !templatesStore?.data?.templates}
  <NoTemplate />
{:else}
  <h1 class="text-xl">Templates</h1>

  <section class="grid grid-cols-4 gap-3">
    {#each Object.keys(templatesStore.data.templates) as templateId}
      <span>{templateId}</span>
    {/each}
  </section>
{/if}

<footer class="flex justify-center gap-4 mt-auto">
  <Button icon={ArrowDownToLineIcon} onClick={onImportClick}
    >Import template</Button
  >
  <Button icon={PlusIcon} onClick={onCreateClick}>Create template</Button>
</footer>
