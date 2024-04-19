<script lang="ts">
  import Button from '@/lib/components/Button.svelte';
  import NoTemplate from '@/lib/layouts/NoTemplate.svelte';
  import { FilePlusIcon, PackagePlusIcon } from 'lucide-svelte';
  import { appStore } from '../stores/appStore.svelte.js';
  import { templatesStore } from '../stores/templatesStore.svelte.js';
  import TemplateCard from '../components/TemplateCard.svelte';
  import type { UUID } from '../types/index.js';

  const { renderEditTemplatePage, renderEditTemplateGroupPage } = appStore;
  const { data, isLoading } = templatesStore;
  const hasTemplates = Object.keys(data?.templates).length > 0;

  const onCreateClick = () => {
    appStore.editPageTemplateProps = undefined;
    renderEditTemplatePage();
  };

  const onCreateGroupClick = () => {
    appStore.editPageTemplateGroupProps = undefined;
    renderEditTemplateGroupPage();
  };
</script>

{#if isLoading}
  Loading
{:else if !hasTemplates}
  <NoTemplate />
{:else}
  <h1 class="text-xl">Templates</h1>

  {#each data.ungroupedTemplates as templateId}
    <section class="grid grid-cols-4 gap-3">
      <TemplateCard {templateId} />
    </section>
  {/each}

  {#each Object.entries(data.templateGroups) as [templateGroupId, templateGroup]}
    <section class="grid grid-cols-4 gap-3">
      {#if templateGroup?.templateIds && templateGroup?.templateIds?.length > 0}
        {#each templateGroup.templateIds as templateId}
          <TemplateCard {templateId} />
        {/each}
      {/if}
    </section>
  {/each}
{/if}

<footer class="flex justify-center gap-4 mt-auto">
  <Button icon={FilePlusIcon} onClick={onCreateClick}>Create template</Button>
  <Button icon={PackagePlusIcon} onClick={onCreateGroupClick}
    >Create group</Button
  >
</footer>
