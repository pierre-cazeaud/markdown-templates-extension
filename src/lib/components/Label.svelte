<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLParagraphElement> & {
    variant?: 'small';
  };

  let { class: classes, variant, ...props }: Props = $props();
</script>

<p
  class={`font-semibold ${classes || ''} ${variant === 'small' ? 'text-sm' : 'text-base'}`}
  {...props}
>
  <slot />
</p>
