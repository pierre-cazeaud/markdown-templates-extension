<script lang="ts">
  import Button from '@/lib/components/Button.svelte';
  import NoTemplate from '@/lib/layouts/NoTemplate.svelte';
  import { FilePlusIcon, PackagePlusIcon } from 'lucide-svelte';
  import { appStore } from '../stores/appStore.svelte.js';
  import { templatesStore } from '../stores/templatesStore.svelte.js';
  import TemplateCard from '../components/TemplateCard.svelte';
  import TemplateGroupCard from '../components/TemplateGroupCard.svelte';
  import Page from '../layouts/Page.svelte';
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

<Page>
  {#if isLoading}
    Loading
  {:else if !hasTemplates}
    <NoTemplate />
  {:else}
    {#if data.ungroupedTemplates.length > 0}
      <section class="grid grid-cols-4 gap-3">
        {#each data.ungroupedTemplates as templateId}
          <TemplateCard {templateId} />
        {/each}
      </section>
    {/if}
    
    {#if Object.entries(data.templateGroups).length > 0}
      <section class="grid grid-cols-2 gap-3">
        {#each Object.entries(data.templateGroups) as [templateGroupId, templateGroup]}
        <TemplateGroupCard {templateGroup} templateGroupId={templateGroupId as UUID} />
        {/each}
      </section>
    {/if}
  {/if}

  <footer class="flex justify-center gap-4 mt-auto">
    <Button icon={FilePlusIcon} onClick={onCreateClick}>Create template</Button>
    <Button icon={PackagePlusIcon} onClick={onCreateGroupClick}
    >Create group</Button
    >
  </footer>
</Page>
