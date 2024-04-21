<script lang="ts">
  import { CheckIcon, XIcon } from 'lucide-svelte';
  import Label from './Label.svelte';
  import TemplateCard from './TemplateCard.svelte';
  import { removeItemFromArray } from '../utils/array';
  import type { UUID } from '../types';

  type Props = {
    ungroupedTemplateIds: UUID[];
    groupedTemplateIds: UUID[];
  };

  let {
    ungroupedTemplateIds = $bindable(),
    groupedTemplateIds = $bindable(),
  }: Props = $props();

  let ungroupedTemplates = $state(ungroupedTemplateIds);
  let groupedTemplates = $state(groupedTemplateIds);

  const addTemplate = (templateId: UUID) => {
    // ungroupedTemplates = ungroupedTemplates.filter((id) => id !== templateId); // Seems like filter creates a new ref of the array and it breaks the bond created with the parent?
    removeItemFromArray(ungroupedTemplates, templateId);
    groupedTemplates.push(templateId);
  };

  const removeTemplate = (templateId: UUID) => {
    // groupedTemplates = groupedTemplates.filter((id) => id !== templateId); // Seems like filter creates a new ref of the array and it breaks the bond created with the parent?
    removeItemFromArray(groupedTemplates, templateId);
    ungroupedTemplates.push(templateId);
  };
</script>

<section class="flex flex-col gap-2">
  <Label>Templates</Label>

  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col gap-2">
      <Label variant="small">In this group</Label>

      <div
        class="flex flex-col gap-2 p-4 bg-surface text-on-surface rounded-lg border h-full"
      >
        <div class="grid grid-cols-3 gap-2 items-start">
          {#if groupedTemplates}
            {#each groupedTemplates as id (id)}
              <button
                class="relative h-full text-start group"
                onclick={() => removeTemplate(id)}
              >
                <TemplateCard
                  class="h-full transition-opacity opacity-100 group-hover:opacity-50"
                  hasActions={false}
                  templateId={id}
                />

                <XIcon
                  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 p-2 bg-destructive text-on-destructive rounded-full transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                />
              </button>
            {/each}
          {/if}
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <Label variant="small">Ungrouped</Label>

      <div
        class="flex flex-col gap-2 p-4 bg-surface text-on-surface rounded-lg border h-full"
      >
        <div class="grid grid-cols-3 gap-2 items-start">
          {#if ungroupedTemplates}
            {#each ungroupedTemplates as id (id)}
              <button
                class="relative h-full text-start group"
                onclick={() => addTemplate(id)}
              >
                <TemplateCard
                  class="h-full transition-opacity opacity-100 group-hover:opacity-50"
                  hasActions={false}
                  templateId={id}
                />

                <CheckIcon
                  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 p-2 bg-successful text-on-successful rounded-full transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                />
              </button>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
