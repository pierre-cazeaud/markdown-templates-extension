<script lang="ts">
  import type { State } from './types';
  import InputError from './InputError.svelte';
  import Label from './Label.svelte';
  import MarkdownEditor from './MarkdownEditor.svelte';
  import TextInput from './TextInput.svelte';
  import { fly } from 'svelte/transition';

  type Props = {
    inputs: {
      label: string;
      onInput: (event: Event) => void;
      required: boolean;
      requiredError: string;
      type: 'markdown' | 'text';
      value: string;
    }[];
    formState: State;
  };

  let { formState = $bindable(), inputs = $bindable() }: Props = $props();
  let inputsState = $state<State[]>([]);

  const handleFormInput = (event: Event) => {
    formState = (event.currentTarget as HTMLFormElement).checkValidity()
      ? 'valid'
      : 'invalid';
  };

  const handleFormSubmit = (event: Event) => {
    event.preventDefault();
  };

  const handleInputInput = (event: Event, index: number) => {
    inputs[index]?.onInput?.(event);
    inputsState[index] = (
      event.currentTarget as HTMLInputElement
    ).checkValidity()
      ? 'valid'
      : 'invalid';
  };
</script>

<form
  class="flex flex-col gap-4"
  oninput={handleFormInput}
  onsubmit={handleFormSubmit}
>
  {#each inputs as input, index}
    <div class="flex flex-col gap-2 group">
      <Label state={inputsState[index]} text={input.label} />

      {#if input.type === 'markdown'}
        <MarkdownEditor
          inputState={inputsState[index]}
          onInput={(event) => handleInputInput(event, index)}
          required={input.required}
          value={input.value}
        />
      {:else if input.type === 'text'}
        <TextInput
          oninput={(event) => handleInputInput(event, index)}
          state={inputsState[index]}
          required={input.required}
          value={input.value}
        />

        {#if input.requiredError && inputsState[index] === 'invalid'}
          <div transition:fly={{ y: -10 }}>
            <InputError text={input.requiredError} />
          </div>
        {/if}
      {/if}
    </div>
  {/each}
</form>
