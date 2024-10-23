<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { UUID } from '../types';
  import { Edit2Icon, FilePlus2Icon } from 'lucide-svelte';
  import { appStore } from '../stores/appStore.svelte';
  import Button from './Button.svelte';
  import TemplateCard from './TemplateCard.svelte';
  import { iconsStore } from '../stores/iconsStore.svelte';
  import { templatesStore } from '../stores/templatesStore.svelte';
  import Title from './Text/Title.svelte';

  type Props = HTMLAttributes<HTMLElement> & {
    templateGroupId: UUID;
  };

  let { class: classes, templateGroupId, ...props }: Props = $props();
  const { renderEditTemplateGroupPage } = appStore;
  const { readTemplateGroup } = templatesStore;

  const templateGroup = readTemplateGroup(templateGroupId);
  const dynamicColor =
    templateGroup.color === 'white' ? 'slate' : templateGroup.color;
</script>

<article
  class="flex flex-col gap-2 p-3 bg-{templateGroup.color}-100 rounded border sm:has-[.template-card:nth-last-child(n+2)]:col-span-2 md:has-[.template-card:nth-last-child(n+3)]:col-span-3 lg:has-[.template-card:nth-last-child(n+4)]:col-span-4 {classes ||
    ''}"
  {...props}
>
  <header class="flex items-center justify-between">
    <div class="flex items-center gap-2 text-{dynamicColor}-600">
      {#if templateGroup.icon}
        <svelte:component
          this={iconsStore.list[templateGroup.icon]}
          size="20"
          strokeWidth="2"
        />
      {/if}

      <Title variant="large">
        {templateGroup.title}
      </Title>
    </div>

    <Button
      colorVariant="dynamic"
      {dynamicColor}
      icon={Edit2Icon}
      onClick={() => renderEditTemplateGroupPage({ templateGroupId })}
      sizeVariant="small"
    />
  </header>

  {#if templateGroup.templateIds && templateGroup.templateIds?.length > 0}
    <div
      class="grid grid-cols-1 sm:has-[.template-card:nth-last-child(n+2)]:grid-cols-2 md:has-[.template-card:nth-last-child(n+3)]:grid-cols-3 lg:has-[.template-card:nth-last-child(n+4)]:grid-cols-4 gap-2 h-full"
    >
      {#each templateGroup.templateIds as templateId}
        <TemplateCard
          class={templateGroup.color !== 'white' ? 'border-0' : ''}
          {templateId}
        />
      {/each}
    </div>
  {:else}
    <div class="flex flex-col gap-4 py-12 grow items-center justify-center">
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
