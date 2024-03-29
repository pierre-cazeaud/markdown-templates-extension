<script lang="ts">
  import Button from '@/lib/components/Button.svelte';
  import NoTemplate from '@/lib/layouts/NoTemplate.svelte';
  import { ArrowDownToLineIcon, PlusIcon } from 'lucide-svelte';
  import { appStore } from '../stores/appStore.svelte.js';
  import { templatesStore } from '../stores/templatesStore.svelte.js';

  const { renderEditPage } = appStore;
  const { data, isLoading } = templatesStore;
  const hasTemplates = Object.keys(data?.templates).length > 0;

  const onCreateClick = () => {
    renderEditPage();
  };

  const onImportClick = () => {};
</script>

{#if isLoading}
  Loading
{:else if !hasTemplates}
  <NoTemplate />
{:else}
  <h1 class="text-xl">Templates</h1>

  <section class="grid grid-cols-4 gap-3">
    {#each Object.keys(data.templates) as templateId}
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
