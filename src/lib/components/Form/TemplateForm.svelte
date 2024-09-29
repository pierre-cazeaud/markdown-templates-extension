<script lang="ts">
  import type { Template } from '../../types';
  import type { State } from './types';
  import Form from './Form.svelte';

  type Props = {
    content: Template['content'];
    formChangesCounter: number | undefined;
    formState: State | undefined;
    title: Template['title'];
  };

  let {
    content = $bindable(),
    formChangesCounter = $bindable(),
    formState = $bindable(),
    title = $bindable(),
  }: Props = $props();
  let originalContent = content;
  let originalTitle = title;

  const handleContentInput = (event: Event) => {
    content = (event.target as HTMLTextAreaElement).value;
  };

  const handleTitleInput = (event: Event) => {
    title = (event.target as HTMLInputElement).value;
  };
</script>

<Form
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
  onFormChangesCounterChange={(newCount) => (formChangesCounter = newCount)}
  onFormStateChange={(newState) => (formState = newState)}
/>
