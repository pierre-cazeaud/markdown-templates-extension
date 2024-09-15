<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { UUID } from '../types';
  import { ClipboardIcon, Edit2Icon } from 'lucide-svelte';
  import { templatesStore } from '../stores/templatesStore.svelte';
  import { appStore } from '../stores/appStore.svelte';
  import Button from './Button.svelte';
  import markdownit from 'markdown-it';
  import Title from './Text/Title.svelte';

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
</script>

<article
  class={`template-card flex flex-col gap-3 bg-surface text-on-surface border rounded-md p-3 ${classes || ''}`}
  {...props}
>
  <header>
    <Title text={title} />
  </header>

  {#if content}
    <!-- Use inert to prevent focus and clicks on the rendered template -->
    <div class="flex justify-center items-center p-4 rounded border" inert>
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
