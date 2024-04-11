<script lang="ts">
  import Button from '@/lib/components/Button.svelte';
  import NoTemplate from '@/lib/layouts/NoTemplate.svelte';
  import { ArrowDownToLineIcon, Edit2Icon, PlusIcon } from 'lucide-svelte';
  import { appStore } from '../stores/appStore.svelte.js';
  import { templatesStore } from '../stores/templatesStore.svelte.js';
  import TemplateCard from '../components/TemplateCard.svelte';
  import type { UUID } from '../types/index.js';

  const { renderEditPage } = appStore;
  const { data, isLoading } = templatesStore;
  const hasTemplates = Object.keys(data?.templates).length > 0;

  const onCreateClick = () => {
    appStore.editPageTemplateProps = undefined;
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

  {#each Object.entries(data.templateGroups) as [templateGroupId, templateGroup]}
    <section class="grid grid-cols-4 gap-3">
      {#if templateGroup?.templatesId && templateGroup?.templatesId?.length > 0}
        {#each templateGroup.templatesId as templateId}
          <TemplateCard templateGroupId={(templateGroupId as UUID)} {templateId} />
        {/each}
      {/if}
    </section>
  {/each}
{/if}

<footer class="flex justify-center gap-4 mt-auto">
  <Button icon={ArrowDownToLineIcon} onClick={onImportClick}
    >Import template</Button
  >
  <Button icon={PlusIcon} onClick={onCreateClick}>Create template</Button>
</footer>
