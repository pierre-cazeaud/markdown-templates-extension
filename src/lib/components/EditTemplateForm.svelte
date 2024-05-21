<script lang="ts">
  import type { Template } from '../types';
  import markdownit from 'markdown-it';
  import Button from './Button.svelte';
  import { EyeIcon, EyeOffIcon } from 'lucide-svelte';
  import { fade } from 'svelte/transition';
  import MarkdownWidgetBar from './MarkdownWidgetBar.svelte';

  type Props = {
    content: Template['content'];
    title: Template['title'];
  };

  let { content = $bindable(), title = $bindable() }: Props = $props();
  let originalContent = content;
  let originalTitle = title;

  let codeRef = $state<HTMLElement>();
  let hasMissingContentError = $state(false);
  let hasMissingTitleError = $state(false);
  let showRenderedContent = $state(true);

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
    // console.log(target.innerHTML);

    if (!target.innerText) {
      hasMissingContentError = true;
      return;
    }

    if (hasMissingContentError) hasMissingContentError = false;

    content = target.innerText;
  };

  $effect(() => {
    if (hasMissingContentError || hasMissingTitleError)
      console.log('Unable to save');
    else console.log('Able to save');
  });
</script>

<section class="flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <p class="text-base">Title</p>

    <p
      aria-multiline="false"
      class="border bg-surface text-on-surface rounded text-base p-2"
      contenteditable="true"
      onkeydown={handleTitleKeyDown}
      oninput={handleTitleInput}
    >
      {originalTitle}
    </p>

    {#if hasMissingTitleError}
      <p class="text-on-destructive bg-destructive p-2 rounded" transition:fade>
        Title is mandatory
      </p>
    {/if}
  </div>

  <div class="flex flex-col gap-1">
    <div class="flex items-center justify-between">
      <p class="text-base">Content</p>

      <Button
        icon={showRenderedContent ? EyeOffIcon : EyeIcon}
        colorVariant="secondary"
        onClick={() => (showRenderedContent = !showRenderedContent)}
      />
    </div>

    <div class="grid gap-4" class:grid-cols-2={showRenderedContent}>
      <div class="bg-surface border text-on-surface rounded">
        {#if codeRef}
          <MarkdownWidgetBar textEditorRef={codeRef} />
        {/if}

        <!-- whitespace-pre helps rendering the code content that contains linebreaks and white spaces -->
        <code
          aria-multiline="true"
          bind:this={codeRef}
          class="flex p-4 min-h-80 text-base transition-all outline-hover-surface outline-1 whitespace-pre"
          contenteditable="true"
          oninput={handleContentInput}
        >
          {originalContent}
        </code>
      </div>

      {#if showRenderedContent}
        <aside class="p-4 bg-surface border prose rounded break-words">
          {@html md.render(content)}
        </aside>
      {/if}
    </div>

    {#if hasMissingContentError}
      <p class="text-on-destructive bg-destructive p-2 rounded" transition:fade>
        Content is mandatory
      </p>
    {/if}
  </div>
</section>
