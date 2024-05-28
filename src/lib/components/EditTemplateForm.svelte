<script lang="ts">
  import type { Template } from '../types';
  import markdownit from 'markdown-it';
  import Button from './Button.svelte';
  import { EyeIcon, EyeOffIcon } from 'lucide-svelte';
  import { fade } from 'svelte/transition';
  import MarkdownWidgetBar from './MarkdownWidgetBar.svelte';

  type Props = {
    content: Template['content'];
    isSaveDisabled: boolean;
    title: Template['title'];
  };

  let {
    content = $bindable(),
    isSaveDisabled = $bindable(),
    title = $bindable(),
  }: Props = $props();
  let originalContent = content;
  let originalTitle = title;

  let codeRef = $state<HTMLElement>();
  let showRenderedContent = $state(true);

  let hasContentInputBeenTouched = $state(false);
  let hasTitleInputBeenTouched = $state(false);
  let hasMissingContentError = $derived.by(
    () => hasContentInputBeenTouched && content === ''
  );
  let hasMissingTitleError = $derived.by(
    () => hasTitleInputBeenTouched && title === ''
  );

  const md = markdownit();

  const handleTitleInput = (event: Event) => {
    const target = event.currentTarget as HTMLElement;
    if (!hasTitleInputBeenTouched) hasTitleInputBeenTouched = true;
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
    if (!hasContentInputBeenTouched) hasContentInputBeenTouched = true;
    content = target.innerText;
  };

  const handleContentPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;

    const pastedText = event.clipboardData?.getData('text');
    if (!pastedText) return;

    const range = document.getSelection()?.getRangeAt(0);
    if (!range) return;
    range.deleteContents();

    const textNode = document.createTextNode(pastedText);
    range.insertNode(textNode);
    range.selectNodeContents(textNode);
    range.collapse(false);

    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    selection.addRange(range);

    content = target.innerText;
  };

  $effect(() => {
    isSaveDisabled =
      content === '' ||
      title === '' ||
      hasMissingContentError ||
      hasMissingTitleError;
  });
</script>

<section class="flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <p class="text-base">Title</p>

    <p
      aria-multiline="false"
      class="border bg-surface text-on-surface rounded text-base p-2"
      contenteditable="true"
      oninput={handleTitleInput}
      onkeydown={handleTitleKeyDown}
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
          class="flex p-4 min-h-80 text-base transition-all outline-hover-surface outline-1 whitespace-pre-wrap overflow-x-auto"
          contenteditable="true"
          oninput={handleContentInput}
          onpaste={handleContentPaste}
        >
          {originalContent}
        </code>
      </div>

      {#if showRenderedContent}
        <aside
          class="max-w-none p-4 bg-surface border prose rounded break-words [&>pre]:whitespace-pre-wrap"
        >
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
