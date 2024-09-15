<script module lang="ts">
  import type { TextVariant } from './types';
  
  export type TitleProps = HTMLAttributes<HTMLParagraphElement> & {
    text: string;
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

  let { class: classes, text, variant = 'default', ...props }: TitleProps = $props();
</script>

<p
  class={`font-semibold ${variantClasses[variant]} ${classes || ''}`}
  {...props}
>
  {text}
</p>
