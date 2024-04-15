<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLParagraphElement>;

  let { class: classes, ...props }: Props = $props();
</script>

<p class={`text-base font-semibold ${classes}`} {...props}>
  <slot />
</p>
