<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children: Snippet,
    isFullWidth?: boolean;
  };

  let { children, isFullWidth }: Props = $props();

  document.body.classList.add('bg-background', 'text-on-background');
</script>

<main
  class="flex flex-col min-h-[600px] max-w-screen-2xl mx-auto w-full p-8"
  class:min-h-screen={isFullWidth}
  class:min-w-[600px]={!isFullWidth}
>
  {@render children()}
</main>
