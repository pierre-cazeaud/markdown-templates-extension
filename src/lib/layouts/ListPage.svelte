<script lang="ts">
  import Button from '@/lib/components/Button.svelte';
  import NoTemplate from '@/lib/layouts/NoTemplate.svelte';
  import { ArrowDownToLineIcon, Edit2Icon, PlusIcon } from 'lucide-svelte';
  import { appStore } from '../stores/appStore.svelte.js';
  import { templatesStore } from '../stores/templatesStore.svelte.js';

  const { renderEditPage } = appStore;
  const { data, isLoading, readTemplate } = templatesStore;
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

  {#each Object.keys(data.templateGroups) as templateGroupId}
    {@const templateGroup = data.templateGroups[templateGroupId]}

    <section class="grid grid-cols-4 gap-3">
      {#if templateGroup?.templatesId && Object.keys(templateGroup?.templatesId).length > 0}
        {#each Object.values(templateGroup.templatesId) as templateId}
          <div>
            <span>{readTemplate(templateId).title}</span>
            <button
              onclick={() => renderEditPage({ templateGroupId, templateId })}
            >
              <Edit2Icon />
            </button>
          </div>
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
