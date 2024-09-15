<script lang="ts">
  import type { State } from './types';
  import type { Template } from '../../types';
  import markdownit from 'markdown-it';
  import Button from '../Button.svelte';
  import { EyeIcon, EyeOffIcon } from 'lucide-svelte';
  import { fade } from 'svelte/transition';
  import MarkdownWidgetBar from '../MarkdownWidgetBar.svelte';
  import TextField from './TextField.svelte';
  import Title from '../Text/Title.svelte';

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
  let titleInputState = $state<State>('neutral');

  let codeRef = $state<HTMLElement>();
  let showRenderedContent = $state(true);

  let hasContentInputBeenTouched = $state(false);
  let hasMissingContentError = $derived.by(
    () => hasContentInputBeenTouched && content === ''
  );

  const md = markdownit();

  const handleTitleInput = (
    event: Event & { target: EventTarget & HTMLInputElement }
  ) => {
    title = event.target.value;
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
      titleInputState === 'invalid';
  });
</script>

<section class="flex flex-col gap-4">
  <TextField
    input={{
      oninput: handleTitleInput,
      value: originalTitle,
      required: true,
    }}
    inputErrorMessage="Please enter a valid title"
    bind:inputState={titleInputState}
    label={{ text: 'Title' }}
  />

  <div class="flex flex-col gap-1">
    <div class="flex items-center justify-between">
      <Title text="Content" />

      <Button
        icon={showRenderedContent ? EyeOffIcon : EyeIcon}
        colorVariant="secondary"
        onClick={() => (showRenderedContent = !showRenderedContent)}
      />
    </div>

    <div
      class="grid grid-cols-1 gap-4"
      class:md:grid-cols-2={showRenderedContent}
    >
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
        Please provide some content
      </p>
    {/if}
  </div>
</section>
