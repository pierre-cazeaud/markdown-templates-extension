<script module lang="ts">
  import type { State } from './types';
  export type MardkownEditorProps = {
    inputState?: State;
    name: string;
    onInput: (event: Event) => void;
    required: boolean;
    value: string;
  };
</script>

<script lang="ts">
  import markdownit from 'markdown-it';
  import MarkdownWidgetBar from '../MarkdownWidgetBar.svelte';

  let { inputState = 'neutral', name, onInput, required, value }: MardkownEditorProps = $props();
  let codeRef = $state<HTMLTextAreaElement>();
  let showRenderedContent = $state(true);
  let updatedValue = $state(value);
  const md = markdownit();

  const stateClasses: Record<State, string> = {
    'invalid': 'border-red-500 focus:outline-red-500',
    'neutral': '',
    'valid': ''
  }
</script>

<div class='grid grid-cols-1 gap-4' class:md:grid-cols-2={showRenderedContent}>
  <div class="@container bg-surface border text-on-surface rounded">
    {#if codeRef}
      <MarkdownWidgetBar textEditorRef={codeRef} />
    {/if}

    <!-- whitespace-pre helps rendering the textarea content that contains linebreaks and white spaces -->
    <!-- height calculated by removing widget bar height -->
    <textarea
      bind:this={codeRef}
      class={`flex p-4 min-h-80 text-base transition-all outline-1 whitespace-pre-wrap overflow-x-auto w-full resize-none h-[calc(100%-77px)] @[34rem]:h-[calc(100%-41px)] ${stateClasses[inputState]}`}
      {name}
      oninput={(event) => {
        onInput(event);
        updatedValue = event.currentTarget.value;
      }}
      {required}
      {value}
      ></textarea>
  </div>

  {#if showRenderedContent}
    <aside
      class="max-w-none p-4 bg-surface border prose rounded break-words [&>pre]:whitespace-pre-wrap"
    >
      {@html md.render(updatedValue)}
    </aside>
  {/if}
</div>
