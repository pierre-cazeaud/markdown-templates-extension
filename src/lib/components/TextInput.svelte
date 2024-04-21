<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLInputElement> & {
    value: string;
  };

  let { class: classes, value = $bindable(), ...props }: Props = $props();
</script>

<input
  class={`border bg-surface text-on-surface rounded text-base p-2 ${classes || ''}`}
  type="text"
  {value}
  {...props}
/>
