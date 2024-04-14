<script lang="ts">
  import type { Template } from '../types';
  import markdownit from 'markdown-it';
  import Button from './Button.svelte';
  import { FileCodeIcon, ScrollTextIcon } from 'lucide-svelte';

  type Props = {
    content: Template['content'];
    title: Template['title'];
  };

  let { content = $bindable(), title = $bindable() }: Props = $props();
  let originalContent = content.replaceAll('\n', '<br>');
  let originalTitle = title;

  let hasMissingContentError = $state(false);
  let hasMissingTitleError = $state(false);
  let showRenderedContent = $state(false);

  const md = markdownit();

  const handleTitleInput = (event: Event) => {
    const target = event.currentTarget as HTMLElement;

    if (!target.innerText) {
      hasMissingTitleError = true;
      return;
    }

    if (hasMissingTitleError) hasMissingTitleError = false;

    title = target.innerText;
  };

  const handleTitleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      // Prevent key insertion
      event.preventDefault();
      return false;
    }
  };

  const handleContentInput = (event: Event) => {
    const target = event.currentTarget as HTMLElement;

    if (!target.innerText) {
      hasMissingContentError = true;
      return;
    }

    if (hasMissingContentError) hasMissingContentError = false;

    content = target.innerText;
  };
</script>

<section class="flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <p class="text-base">Title</p>

    <p
      aria-multiline="false"
      class="border border-on-background bg-surface text-on-surface rounded text-base p-2"
      contenteditable="true"
      onkeydown={handleTitleKeyDown}
      oninput={handleTitleInput}
    >
      {originalTitle}
    </p>

    {#if hasMissingTitleError}
      <p class="text-on-destructive bg-destructive p-2 rounded">
        Title is mandatory
      </p>
    {/if}
  </div>

  <div class="flex flex-col gap-1">
    <div class="flex items-center justify-between">
      <p class="text-base">Content</p>

      <Button
        icon={showRenderedContent ? FileCodeIcon : ScrollTextIcon}
        colorVariant="secondary"
        onClick={() => (showRenderedContent = !showRenderedContent)}
      />
    </div>

    <div class="grid" class:grid-cols-2={showRenderedContent}>
      <code
        aria-multiline="true"
        class="border border-on-background bg-surface text-on-surface rounded text-base p-4 min-h-80 transition-all"
        class:rounded-tr-none={showRenderedContent}
        class:rounded-br-none={showRenderedContent}
        contenteditable="true"
        oninput={handleContentInput}>{@html originalContent}</code
      >

      {#if showRenderedContent}
        <aside class="p-4 bg-surface prose rounded-tr rounded-br break-words">
          {@html md.render(content)}
        </aside>
      {/if}
    </div>

    {#if hasMissingContentError}
      <p class="text-on-destructive bg-destructive p-2 rounded">
        Content is mandatory
      </p>
    {/if}
  </div>
</section>
