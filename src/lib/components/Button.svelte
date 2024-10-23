<script lang="ts">
  import type { Icon } from 'lucide-svelte';
  import type { ComponentType, Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type ButtonColorVariant =
    | 'destructive'
    | 'dynamic'
    | 'interactive'
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'successful';

  type Props = HTMLButtonAttributes & {
    children?: Snippet;
    colorVariant?: ButtonColorVariant;
    dynamicColor?: string;
    icon?: ComponentType<Icon>;
    onClick: () => void;
    sizeVariant?: 'small';
    title?: string;
  };

  let {
    class: classes,
    children,
    colorVariant = 'primary',
    dynamicColor,
    icon,
    onClick,
    sizeVariant,
    title,
    ...props
  }: Props = $props();

  if (colorVariant === 'dynamic' && !dynamicColor)
    console.error(
      'colorVariant property was passed as "dynamic" but the property dynamicColor was not'
    );

  const colorClasses: Record<ButtonColorVariant, string> = {
    destructive:
      'p-2 bg-destructive text-on-destructive hover:bg-hover-destructive hover:text-hover-on-destructive',
    dynamic: `p-2 text-${dynamicColor}-600 hover:bg-${dynamicColor}-500 hover:text-white`,
    interactive:
      'p-2 bg-interactive text-on-interactive hover:bg-hover-interactive hover:text-hover-on-interactive',
    neutral: 'p-2 bg-neutral text-on-neutral hover:bg-hover-neutral hover:text-hover-on-neutral',
    primary:
      'px-4 py-2 bg-gradient-to-tr from-primary to-pink-600 text-on-primary hover:hue-rotate-15 hover:text-hover-on-primary',
    secondary:
      'p-2 text-secondary hover:bg-hover-secondary hover:text-hover-on-secondary',
    successful:
      'p-2 bg-successful text-on-successful hover:bg-hover-successful hover:text-hover-on-successful',
  };
</script>

<button
  onclick={onClick}
  class="flex items-center gap-1 rounded transition select-none {colorClasses[colorVariant]} {classes || ''}"
  class:cursor-not-allowed={props.disabled}
  class:opacity-50={props.disabled}
  {title}
  {...props}
>
  <svelte:component this={icon} size={sizeVariant === 'small' ? 16 : 20} />

  {#if children}
    {@render children()}
  {/if}
</button>
