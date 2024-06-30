<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & {
    children: Snippet,
    footer?: Snippet,
    header?: Snippet,
  };

  let { class: classes, children, footer, header }: Props = $props();
</script>

<div class={`flex flex-col grow gap-4 ${classes || ''}`} in:fade={{duration: 150}}>
  {#if header}
    <!-- empty:hidden is used as a work around because a snippet can not be wrapped in a if statement, only its content -->
    <header class="flex justify-between w-full empty:hidden">
      {@render header()}
    </header>
  {/if}
  
  {@render children()}
  
  {#if footer}
    <footer class="sticky bottom-4 flex justify-center gap-4 mt-auto">
      {@render footer()}
    </footer>
  {/if}
</div>



