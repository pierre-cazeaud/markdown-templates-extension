<script module lang="ts">
  export const FORM_RESET_EVENT = 'resetForm';
</script>

<script lang="ts">
  import type { State } from './types';
  import InputError from './InputError.svelte';
  import Label from './Label.svelte';
  import MarkdownEditor from './MarkdownEditor.svelte';
  import TextInput from './TextInput.svelte';
  import { fly } from 'svelte/transition';
  import ColorPicker from './ColorPicker.svelte';
  import IconPicker from './IconPicker.svelte';
  import TemplatePicker from './TemplatePicker.svelte';

  type Props = {
    inputs: {
      label: string;
      onInput: (event: Event) => void;
      required?: boolean;
      requiredError?: string;
      type: 'color' | 'icon' | 'markdown' | 'template' | 'text';
      value: string;
    }[];
    onFormChangesCounterChange?: (newCount: number) => {};
    onFormStateChange?: (newState: State) => {};
  };

  let {
    inputs = $bindable(),
    onFormChangesCounterChange,
    onFormStateChange,
  }: Props = $props();
  let formChangesCounter = $state<number>(0);
  let formState = $state<State>('neutral');
  let inputsState = $state<State[]>([]);
  let originalFormData = $state<FormData>();
  let ref = $state<HTMLFormElement>();

  const handleFormInput = (event: Event) => {
    formState = (event.currentTarget as HTMLFormElement).checkValidity()
      ? 'valid'
      : 'invalid';
    updateChangesCounter();
    onFormStateChange?.(formState);
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

  const resetForm = () => {
    if (!originalFormData) return;

    originalFormData.keys().forEach((key) => {
      const input = document.querySelector(`[name=${key}]`) as HTMLInputElement;
      const inputOriginalValue = originalFormData?.get(key);
      if (!input || !inputOriginalValue) return;

      if(input.type === 'radio') {
        const currentInput = document.querySelector(`[name=${key}]:checked`) as HTMLInputElement;
        const originalInput = document.querySelector(`[name=${key}][value=${inputOriginalValue}]`) as HTMLInputElement;
        // Swap checked attributes to be retrieved by FormData
        currentInput.checked = false;
        originalInput.checked = true;
        // Trigger event to ensure states are updated
        originalInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      else {
        input.value = inputOriginalValue.toString();
        // Trigger event to ensure states are updated
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  };

  const updateChangesCounter = () => {
    let newChangesCounter = 0;
    const currentFormData = new FormData(ref);
    currentFormData.keys().forEach((key) => {
      if (currentFormData.get(key) !== originalFormData?.get(key))
        newChangesCounter++;
    });
    formChangesCounter = newChangesCounter;
    onFormChangesCounterChange?.(newChangesCounter);
  };

  $effect(() => {
    if (!originalFormData && ref) originalFormData = new FormData(ref);
  });

  $effect(() => {
    document.addEventListener(FORM_RESET_EVENT, resetForm);
    return () => document.removeEventListener(FORM_RESET_EVENT, resetForm);
  });
</script>

<form
  bind:this={ref}
  class="flex flex-col gap-4"
  oninput={handleFormInput}
  onsubmit={handleFormSubmit}
>
  {#each inputs as input, index}
    <div class="flex flex-col gap-2 group">
      <Label state={inputsState[index]} text={input.label} />

      {#if input.type === 'color'}
        <ColorPicker 
          name={input.label}
          onInput={(event) => handleInputInput(event, index)}
          value={input.value}
        />
      {:else if input.type === 'icon'}
        <IconPicker 
          name={input.label}
          onInput={(event) => handleInputInput(event, index)}
          value={input.value}
        />
      {:else if input.type === 'markdown'}
        <MarkdownEditor
          inputState={inputsState[index]}
          name={input.label}
          onInput={(event) => handleInputInput(event, index)}
          required={input.required}
          value={input.value}
        />
      {:else if input.type === 'template'}
        <!-- <TemplatePicker
          bind:groupedTemplateIds={templateIds}
          bind:ungroupedTemplateIds
        /> -->
      {:else if input.type === 'text'}
        <TextInput
          name={input.label}
          oninput={(event) => handleInputInput(event, index)}
          state={inputsState[index]}
          required={input.required}
          value={input.value}
          />
      {/if}

      {#if input.requiredError && inputsState[index] === 'invalid'}
        <div transition:fly={{ y: -10 }}>
          <InputError text={input.requiredError} />
        </div>
      {/if}
    </div>
  {/each}
</form>
