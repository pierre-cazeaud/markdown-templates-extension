<script lang="ts">
  import Button from '@/lib/components/Button.svelte';
  import NoTemplate from '@/lib/layouts/NoTemplate.svelte';
  import { FilePlusIcon, PackagePlusIcon } from 'lucide-svelte';
  import { appStore } from '../stores/appStore.svelte.js';
  import { templatesStore } from '../stores/templatesStore.svelte.js';
  import TemplateCard from '../components/TemplateCard.svelte';
  import TemplateGroupCard from '../components/TemplateGroupCard.svelte';
  import Page from '../layouts/Page.svelte';

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
  {:else if data.orderedTemplateList.length > 0}
    <section class="grid grid-cols-4 gap-4">
      {#each data.orderedTemplateList as { id, type }}
        {#if type === 'template'}
          <TemplateCard templateId={id} />
        {:else}
          <TemplateGroupCard templateGroupId={id} />
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
