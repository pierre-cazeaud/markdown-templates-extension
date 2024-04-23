<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & {
    children: Snippet,
  };

  let { class: classes, children }: Props = $props();
</script>

<div class={`flex flex-col grow gap-4 ${classes || ''}`} in:fade={{duration: 150}}>
  {@render children()}
</div>



