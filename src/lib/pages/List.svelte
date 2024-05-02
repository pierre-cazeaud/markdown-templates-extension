<script lang="ts">
  import Button from '@/lib/components/Button.svelte';
  import NoTemplate from '@/lib/layouts/NoTemplate.svelte';
  import { FilePlusIcon, PackagePlusIcon } from 'lucide-svelte';
  import Sortable, { type SortableEvent } from 'sortablejs';

  import { appStore } from '../stores/appStore.svelte.js';
  import { templatesStore } from '../stores/templatesStore.svelte.js';
  import TemplateCard from '../components/TemplateCard.svelte';
  import TemplateGroupCard from '../components/TemplateGroupCard.svelte';
  import Page from '../layouts/Page.svelte';
  import { moveItemInArray } from '../utils/array.js';

  const { renderEditTemplatePage, renderEditTemplateGroupPage } = appStore;
  const { data, isLoading, updateOrderedTemplateList } = templatesStore;
  const hasTemplates = Object.keys(data?.templates).length > 0;

  let listRef = $state<HTMLElement>();

  const onCreateClick = () => {
    appStore.editPageTemplateProps = undefined;
    renderEditTemplatePage();
  };

  const onCreateGroupClick = () => {
    appStore.editPageTemplateGroupProps = undefined;
    renderEditTemplateGroupPage();
  };

  $effect(() => {
    Sortable.create(listRef, {
      animation: 150,
      easing: 'cubic-bezier(1, 0, 0, 1)',
      ghostClass: 'ring-2',

      // Changed sorting within list
      onUpdate: function (event: SortableEvent) {
        const { oldIndex, newIndex } = event;
        const newOrderTemplateList = [...data.orderedTemplateList];
        moveItemInArray(newOrderTemplateList, oldIndex, newIndex);
        updateOrderedTemplateList(newOrderTemplateList);
      },
    });
  });
</script>

<Page>
  {#if isLoading}
    Loading
  {:else if !hasTemplates}
    <NoTemplate />
  {:else if data.orderedTemplateList.length > 0}
    <section class="grid grid-cols-4 gap-4" bind:this={listRef}>
      {#each data.orderedTemplateList as { id, type } (id)}
        {#if type === 'template'}
          <TemplateCard class="transition-shadow" templateId={id} />
        {:else}
          <TemplateGroupCard class="transition-shadow" templateGroupId={id} />
        {/if}
      {/each}
    </section>
  {/if}

  <footer class="flex justify-center gap-4 mt-auto">
    <Button icon={FilePlusIcon} onClick={onCreateClick}>Create template</Button>
    <Button icon={PackagePlusIcon} onClick={onCreateGroupClick}
      >Create group</Button
    >
  </footer>
</Page>
