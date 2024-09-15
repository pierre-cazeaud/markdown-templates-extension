<script lang="ts">
  import InputError from './InputError.svelte';
  import Label from './Form/Label.svelte';
  import TextInput from './Form/TextInput.svelte';
  import { fly } from 'svelte/transition';
  import type { LabelProps } from './Form/Label.svelte';
  import type { State } from './Form/types';
  import type { TextInputProps } from './Form/TextInput.svelte';

  type Props = {
    input: TextInputProps;
    inputErrorMessage: string;
    inputState: State;
    label: LabelProps;
  };

  let {
    input,
    inputErrorMessage,
    inputState = $bindable(),
    label,
  }: Props = $props();
  let { oninput: inputOnInput, ...inputProps } = input;
  let inputRef = $state<HTMLInputElement>();

  const handleInput = (
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) => {
    inputOnInput?.(event);
    inputState = inputRef?.checkValidity() ? 'valid' : 'invalid';
  };
</script>

<div class="flex flex-col gap-2 group">
  <Label state={inputState} {...label} />
  <TextInput
    oninput={handleInput}
    bind:ref={inputRef}
    state={inputState}
    {...inputProps}
  />

  {#if inputErrorMessage && inputState === 'invalid'}
    <div transition:fly={{ y: -10 }}>
      <InputError text={inputErrorMessage} />
    </div>
  {/if}
</div>
