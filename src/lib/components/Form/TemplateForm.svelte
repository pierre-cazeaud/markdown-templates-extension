<script lang="ts">
  import type { State } from './types';
  import type { Template } from '../../types';
  import Form from './Form.svelte';

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
  let formState = $state<State>('neutral');
  let originalContent = content;
  let originalTitle = title;

  const handleTitleInput = (event: Event) => {
    title = (event.target as HTMLInputElement).value;
  };

  const handleContentInput = (event: Event) => {
    content = (event.target as HTMLTextAreaElement).value;
  };

  $effect(() => {
    isSaveDisabled = formState === 'invalid';
  });
</script>

<Form
  bind:formState
  inputs={[
    {
      label: 'Title',
      onInput: handleTitleInput,
      required: true,
      requiredError: 'Please enter a valid title',
      type: 'text',
      value: originalTitle,
    },
    {
      label: 'Content',
      onInput: handleContentInput,
      required: true,
      requiredError: 'Please enter some valid content',
      type: 'markdown',
      value: originalContent,
    },
  ]}
></Form>
