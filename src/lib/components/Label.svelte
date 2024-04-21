<script lang="ts" >
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  type Variant = 'small' | 'default' | 'large';

  type Props = HTMLAttributes<HTMLParagraphElement> & {
    children: Snippet;
    variant?: Variant;
  };

  const variantClasses: Record<Variant, string> = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg',
  };

  let { children, class: classes, variant = 'default', ...props }: Props = $props();
</script>

<p
  class={`font-semibold ${classes || ''} ${variantClasses[variant]}`}
  {...props}
>
  {@render children()}
</p>
