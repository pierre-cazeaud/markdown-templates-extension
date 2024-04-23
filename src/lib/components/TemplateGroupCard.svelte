<script lang="ts">
  import { Edit2Icon, FilePlus2Icon } from 'lucide-svelte';
  import { appStore } from '../stores/appStore.svelte';
  import Button from './Button.svelte';
  import Label from './Label.svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { TemplateGroup, UUID } from '../types';
  import TemplateCard from './TemplateCard.svelte';
  import { iconsStore } from '../stores/iconsStore.svelte';

  type Props = HTMLAttributes<HTMLElement> & {
    templateGroup: TemplateGroup;
    templateGroupId: UUID;
  };

  let {
    class: classes,
    templateGroup,
    templateGroupId,
    ...props
  }: Props = $props();

  const { renderEditTemplateGroupPage } = appStore;
  const dynamicColor =
    templateGroup.color === 'white' ? 'slate' : templateGroup.color;
</script>

<article
  class={`flex flex-col gap-4 p-3 bg-${templateGroup.color}-100 rounded border`}
  {...props}
>
  <header class="flex items-center justify-between">
    <Label
      class={`flex items-center gap-2 text-${dynamicColor}-600`}
      variant="large"
    >
      {#if templateGroup.icon}
        <svelte:component
          this={iconsStore.list[templateGroup.icon]}
          size="20"
          strokeWidth="2"
        />
      {/if}

      {templateGroup.title}
    </Label>

    <Button
      colorVariant="dynamic"
      {dynamicColor}
      icon={Edit2Icon}
      onClick={() => renderEditTemplateGroupPage({ templateGroupId })}
      sizeVariant="small"
    />
  </header>

  {#if templateGroup.templateIds && templateGroup.templateIds?.length > 0}
    <div class="grid grid-cols-3 gap-2 items-start h-full">
      {#each templateGroup.templateIds as templateId}
        <TemplateCard class="border-0" {templateId} />
      {/each}
    </div>
  {:else}
    <div class={`flex flex-col gap-4 p-12 grow items-center justify-center`}>
      <p class="text-sm text-center text-slate-500">
        No template is linked to this group.
      </p>

      <Button
        colorVariant="dynamic"
        {dynamicColor}
        icon={FilePlus2Icon}
        onClick={() => renderEditTemplateGroupPage({ templateGroupId })}
      >
        Add template
      </Button>
    </div>
  {/if}
</article>
