<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLInputElement>;

  let { class: classes, ...props }: Props = $props();
</script>

<input
  class={`border bg-surface text-on-surface rounded text-base p-2  ${classes}`}
  type="text"
  {...props}
/>
