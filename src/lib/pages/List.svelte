<script lang="ts">
  import Button from '@/lib/components/Button.svelte';
  import NoTemplate from '@/lib/layouts/NoTemplate.svelte';
  import { FilePlusIcon, Maximize2Icon, PackagePlusIcon } from 'lucide-svelte';
  import Sortable, { type SortableEvent } from 'sortablejs';

  import { appStore } from '../stores/appStore.svelte.js';
  import { templatesStore } from '../stores/templatesStore.svelte.js';
  import TemplateCard from '../components/TemplateCard.svelte';
  import TemplateGroupCard from '../components/TemplateGroupCard.svelte';
  import Page from '../layouts/Page.svelte';
  import { moveItemInArray } from '../utils/array.js';

  const { appOrigin, renderEditTemplatePage, renderEditTemplateGroupPage } = appStore;
  const { data, isLoading, updateOrderedTemplateList } = templatesStore;
  const hasTemplates = Object.keys(data?.templates).length > 0;
  const hasTemplateGroups = Object.keys(data?.templateGroups).length > 0;

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
    if (listRef) {
      Sortable.create(listRef, {
        animation: 150,
        easing: 'cubic-bezier(1, 0, 0, 1)',
        ghostClass: 'ring-2',

        // Changed sorting within list
        onUpdate: function (event: SortableEvent) {
          const { oldIndex, newIndex } = event;
          const newOrderTemplateList = [...data.orderedTemplateList];
          moveItemInArray(newOrderTemplateList, oldIndex as number, newIndex as number);
          updateOrderedTemplateList(newOrderTemplateList);
        },
      });
    }
  });
</script>

<Page>
  {#if isLoading}
    Loading
  {:else if !hasTemplates && !hasTemplateGroups}
    <NoTemplate />
  {:else if data.orderedTemplateList.length > 0}
    <section
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      bind:this={listRef}
    >
      {#each data.orderedTemplateList as { id, type } (id)}
        {#if type === 'template'}
          <TemplateCard class="transition-shadow" templateId={id} />
        {:else}
          <TemplateGroupCard class="transition-shadow" templateGroupId={id} />
        {/if}
      {/each}
    </section>
  {/if}
  
  {#snippet footer()}
    {#if appOrigin === 'popup'}
      <Button icon={Maximize2Icon} onClick={() => browser.runtime.openOptionsPage()}>Open fullwidth</Button>
    {/if}
    <Button icon={FilePlusIcon} onClick={onCreateClick}>Create template</Button>
    <Button icon={PackagePlusIcon} onClick={onCreateGroupClick}>Create group</Button>
  {/snippet}
</Page>
