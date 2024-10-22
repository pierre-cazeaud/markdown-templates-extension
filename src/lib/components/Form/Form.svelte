<script module lang="ts">
  export const FORM_RESET_EVENT = 'resetForm';
</script>

<script lang="ts">
  import type { State } from './types';
  import type { UUID } from '@/lib/types';
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
      isHalfWidth?: boolean;
      label: string;
      onInput?: (event: Event) => void;
      onTemplatesInput?: (event: Event, value: UUID[]) => void;
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

    if(inputs[index].required) {
      inputsState[index] = (
        event.currentTarget as HTMLInputElement
      ).checkValidity()
        ? 'valid'
        : 'invalid';
    }
  };

  const handleTemplatesPickerInput = (event: Event, index: number) => {
    const currentFormData = new FormData(ref);
    const key = inputs[index].label;
    const data = currentFormData.getAll(key) as UUID[];
    inputs[index]?.onTemplatesInput?.(event, data);

    if(inputs[index].required) {
      inputsState[index] = data.length > 0 ? 'valid' : 'invalid';
    }
  };

  const resetForm = () => {
    const currentFormData = new FormData(ref);
    const uniqueFormDataKeys = new Set([...currentFormData.keys(), ...originalFormData?.keys() || []]);
    if (!uniqueFormDataKeys) return;

    uniqueFormDataKeys.forEach((key) => {
      const input = document.querySelector(`[name="${key}"]`) as HTMLInputElement;
      if (!input) return;

      if(input.type === 'radio') {
        const inputOriginalValue = originalFormData?.get(key);
        const currentInput = document.querySelector(`[name="${key}"]:checked`) as HTMLInputElement;
        const originalInput = document.querySelector(`[name="${key}"][value=${inputOriginalValue}]`) as HTMLInputElement;
        // Swap checked attributes to be retrieved by FormData
        currentInput.checked = false;
        originalInput.checked = true;
        // Trigger event to ensure states are updated
        originalInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      else if(input.type === 'checkbox') {
        const originalValues = originalFormData?.getAll(key) || [];
        const currentValues = currentFormData?.getAll(key);
        const mergedValues = new Set([...originalValues , ...currentValues]);

        mergedValues.forEach(value => {
          const input = document.querySelector(`[name="${key}"][value="${value}"]`) as HTMLInputElement;
          const isInputChecked = originalValues.includes(value);
          if(input.checked !== isInputChecked) {
            input.checked = isInputChecked;
            // Trigger event to ensure states are updated
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
        })
      }
      else {
        const inputOriginalValue = originalFormData?.get(key);
        if(inputOriginalValue) input.value = inputOriginalValue.toString();
        // Trigger event to ensure states are updated
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  };

  const updateChangesCounter = () => {
    let newChangesCounter = 0;
    const currentFormData = new FormData(ref);
    // Ensure we have a unique set of keys as: 
    //   - two similar formData.keys() are being merged 
    //   - input like checkboxes are stored multiple times with the same key
    const uniqueFormDataKeys = new Set([...currentFormData.keys(), ...originalFormData?.keys() || []]);

    uniqueFormDataKeys.forEach((key) => {
      if(!originalFormData?.get(key)) {
        newChangesCounter++;
        return;
      };

      // Use getAll for checkboxes special case and toString as two arrays are never equal
      if (currentFormData.getAll(key).toString() !== originalFormData?.getAll(key).toString()) {
        newChangesCounter++;
      }
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
  class="grid grid-cols-4 gap-4"
  oninput={handleFormInput}
  onsubmit={handleFormSubmit}
>
  {#each inputs as input, index}
    <div class="flex flex-col gap-2 group col-span-4" class:md:col-span-2={input.isHalfWidth}>
      <Label isRequired={input.required} state={inputsState[index]}>
        {input.label}
      </Label>

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
        <TemplatePicker 
          name={input.label}
          onInput={(event) => handleTemplatesPickerInput(event, index)}
          value={input.value}
        />
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
