<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { fly } from 'svelte/transition';

  type ColorVariant = 'destructive' | 'interactive' | 'neutral' | 'successful';
  type StyleVariant = 'bordered' | 'filled';

  type Props = HTMLAttributes<HTMLSpanElement> & {
    children: Snippet;
    colorVariant?: ColorVariant;
    styleVariant?: StyleVariant;
  };

  let {
    children,
    class: classes,
    colorVariant = 'neutral',
    styleVariant = 'bordered',
    ...props
  }: Props = $props();

  const getStyleClasses = (color: ColorVariant, style: StyleVariant) => {
    if (style === 'bordered') {
      const classes = {
        destructive: 'border-destructive bg-surface',
        interactive: 'border-interactive bg-surface',
        neutral: 'border-neutral bg-surface',
        successful: 'border-successful bg-surface',
      };

      return classes[color];
    } else {
      const classes = {
        destructive: 'border-destructive bg-destructive',
        interactive: 'border-interactive bg-interactive',
        neutral: 'border-neutral bg-neutral',
        successful: 'border-successful bg-successful',
      };

      return classes[color];
    }
  };
</script>

<span
  class={`absolute -bottom-1.5 -right-1.5 flex justify-center items-center size-5 rounded-full border text-on-surface text-xs ${getStyleClasses(colorVariant, styleVariant)} ${classes || ''}`}
  transition:fly={{ y: 4 }}
  {...props}
>
  {@render children()}
</span>
