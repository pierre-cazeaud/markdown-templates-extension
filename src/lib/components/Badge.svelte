<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { TemplateGroupColors } from '../types';
  import { fly } from 'svelte/transition';

  type ColorVariant = 'destructive' | 'interactive' | 'neutral' | 'successful' | TemplateGroupColors;
  type PositionVariant = 'relative' | 'bottomRight';

  type Props = HTMLAttributes<HTMLSpanElement> & {
    children: Snippet;
    colorVariant?: ColorVariant;
    positionVariant? : PositionVariant;
  };

  let {
    children,
    class: classes,
    colorVariant = 'neutral',
    positionVariant = 'bottomRight',
    ...props
  }: Props = $props();

  const getStyleClasses = (color: ColorVariant) => {
    const classes = {
      destructive: 'bg-destructive',
      interactive: 'bg-interactive',
      neutral: 'bg-neutral',
      successful: 'bg-successful',
      amber: 'bg-amber-100',
      blue: 'bg-blue-100',
      cyan: 'bg-cyan-100',
      fuchsia: 'bg-fuchsia-100',
      green: 'bg-green-100',
      indigo: 'bg-indigo-100',
      lime: 'bg-lime-100',
      orange: 'bg-orange-100',
      red: 'bg-red-100',
      slate: 'bg-slate-100',
      teal: 'bg-teal-100',
      violet: 'bg-violet-100',
      yellow: 'bg-yellow-100',
      white: 'bg-white-100',
    };

    return classes[color];
  };

  const getPositionClasses = (position: PositionVariant) => {
    const classes = {
        bottomRight: 'absolute -bottom-1.5 -right-1.5',
        relative: '',
      };

      return classes[position];
  }
</script>

<span
  class="flex justify-center items-center p-1 rounded-full text-on-surface text-[0.625rem] {getPositionClasses(positionVariant)} {getStyleClasses(colorVariant)} {classes || ''}"
  transition:fly={{ y: 4 }}
  {...props}
>
  {@render children()}
</span>
