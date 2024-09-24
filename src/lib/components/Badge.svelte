<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { fly } from 'svelte/transition';

  type ColorVariant = 'destructive' | 'interactive' | 'neutral' | 'successful';

  type Props = HTMLAttributes<HTMLSpanElement> & {
    colorVariant?: ColorVariant;
    text: string;
  };

  let {
    class: classes,
    colorVariant = 'neutral',
    text,
    ...props
  }: Props = $props();

  const colorClasses: Record<ColorVariant, string> = {
    destructive: 'border-destructive',
    interactive: 'border-interactive',
    neutral: 'border-neutral',
    successful: 'border-successful',
  };
</script>

<span
  class={`flex justify-center items-center size-5 rounded-full border bg-surface text-on-surface text-xs ${colorClasses[colorVariant]} ${classes || ''}`}
  transition:fly={{ y: 4 }}
  {...props}
>
  {text}
</span>
