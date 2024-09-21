<script module lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { State } from './types';

  export type TextInputProps = HTMLInputAttributes & {
    state?: State;
    value: string;
  };
</script>

<script lang="ts">
  let { class: classes, state = 'neutral', value, ...props }: TextInputProps = $props();

  const stateClasses: Record<State, string> = {
    'invalid': 'border-red-500 focus:outline-red-500',
    'neutral': '',
    'valid': ''
  }
</script>

<input
  class={`border bg-surface  rounded text-base p-2 transition ${stateClasses[state]} ${classes || ''}`}
  type="text"
  {value}
  {...props}
/>