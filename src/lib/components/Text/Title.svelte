<script module lang="ts">
  import type { Snippet } from 'svelte';
  import type { TextVariant } from './types';
  
  export type TitleProps = HTMLAttributes<HTMLParagraphElement> & {
    children: Snippet;
    variant?: TextVariant;
  };
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  const variantClasses: Record<TextVariant, string> = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg',
  };

  let { children, class: classes, variant = 'default', ...props }: TitleProps = $props();
</script>

<p
  class="font-semibold {variantClasses[variant]} {classes || ''}"
  {...props}
>
  {@render children()}
</p>
