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
  import markdownit from 'markdown-it';
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
  const { readTemplate } = templatesStore;
  const content = readTemplate(templateId).content;
  const title = readTemplate(templateId).title;
  const md = markdownit();

  const copyContentToClipBoard = async () => {
    const type = 'text/plain';
    const blob = new Blob([content], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    await navigator.clipboard.write(data);
  };

  const getContentExerpt = (content: string) => {
    return content.replaceAll('\n', '<br>');
  };
</script>

<article
  class={`template-card flex flex-col gap-3 bg-surface text-on-surface border rounded-md p-3 ${classes || ''}`}
  {...props}
>
  <header>
    <Label>
      {title}
    </Label>
  </header>

  {#if content}
    <div class="flex justify-center items-center p-4 rounded border">
      <p
        class="prose contrast-75 line-clamp-5 [&>pre]:whitespace-pre-wrap"
        style="zoom: 40%"
      >
        {@html md.render(content)}
      </p>
    </div>
  {/if}

  {#if hasActions}
    <footer class="flex mt-auto">
      <Button
        colorVariant="secondary"
        icon={ClipboardIcon}
        onClick={copyContentToClipBoard}
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
