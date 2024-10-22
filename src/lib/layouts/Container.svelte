<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children: Snippet,
    footer?: Snippet,
    header?: Snippet,
    isFullWidth?: boolean;
  };

  let { children, footer, header, isFullWidth }: Props = $props();

  document.body.classList.add('bg-background', 'text-on-background');
</script>

{#if header}
  <!-- empty:hidden is used as a work around because a snippet can not be wrapped in a if statement and passed down, only its content (see List) -->
  <header class="sticky top-0 z-10 w-full bg-surface/50 text-on-surface backdrop-blur-sm shadow-sm rounded empty:hidden">
    <div class="flex justify-between items-center max-w-screen-2xl py-2 px-4 mx-auto" class:px-8={isFullWidth}>
      {@render header()}
    </div>
  </header>
{/if}

<main
  class="flex flex-col min-h-[600px] max-w-screen-2xl mx-auto w-full p-4"
  class:min-h-screen={isFullWidth}
  class:p-8={isFullWidth}
  class:min-w-[600px]={!isFullWidth}
>

  {@render children()}
</main>

{#if footer}
  <footer class="sticky bottom-0 flex justify-center gap-4 mt-auto p-2" class:p-4={isFullWidth}>
    {@render footer()}
  </footer>
{/if}
