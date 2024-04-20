<script lang="ts">
  import {
    ClipboardIcon,
    Edit2Icon,
    StarIcon,
    StarOffIcon,
  } from 'lucide-svelte';
  import { templatesStore } from '../stores/templatesStore.svelte';
  import { appStore } from '../stores/appStore.svelte';
  import Button from './Button.svelte';
  import Label from './Label.svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { UUID } from '../types';

  type Props = HTMLAttributes<HTMLElement> & {
    hasActions?: boolean;
    templateId: UUID;
  };

  let {
    class: classes,
    hasActions = true,
    templateId,
    ...props
  }: Props = $props();
  const { renderEditTemplatePage } = appStore;
  const { createFavorite, deleteFavorite, readIsFavorite, readTemplate } =
    templatesStore;
  let isFavorite = $state(readIsFavorite(templateId));

  const content = readTemplate(templateId).content;
  const title = readTemplate(templateId).title;

  const copyContentToClipBoard = async () => {
    const type = 'text/plain';
    const blob = new Blob([content], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    await navigator.clipboard.write(data);
  };

  const getContentExerpt = (content: string) => {
    return content.replaceAll('\n', '<br>');
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      deleteFavorite(templateId);
      isFavorite = false;
    } else {
      createFavorite(templateId);
      isFavorite = true;
    }
  };
</script>

<article
  class={`flex flex-col gap-2 bg-surface text-on-surface border rounded p-3 ${classes || ''}`}
>
  <header>
    <Label>
      {title}
    </Label>
  </header>

  <p aria-multiline="true" class="line-clamp-3">
    {@html getContentExerpt(content)}
  </p>

  {#if hasActions}
    <footer class="flex border-t border-slate-200 pt-2 mt-auto">
      <Button
        colorVariant="secondary"
        icon={ClipboardIcon}
        onClick={copyContentToClipBoard}
        sizeVariant="small"
      />

      <Button
        colorVariant="secondary"
        icon={isFavorite ? StarOffIcon : StarIcon}
        onClick={toggleFavorite}
        sizeVariant="small"
      />

      <Button
        colorVariant="secondary"
        icon={Edit2Icon}
        onClick={() => renderEditTemplatePage({ templateId })}
        sizeVariant="small"
      />
    </footer>
  {/if}
</article>
