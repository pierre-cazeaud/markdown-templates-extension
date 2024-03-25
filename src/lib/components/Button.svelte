<script lang="ts">
  import type { ComponentType } from 'svelte';
  import type { Icon } from 'lucide-svelte';

  type ButtonColorVariant =
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'interactive';

  type Props = {
    colorVariant?: ButtonColorVariant;
    icon?: ComponentType<Icon>;
    onClick: () => void;
    sizeVariant?: 'small';
    title?: string;
  };

  let {
    colorVariant = 'primary',
    icon,
    onClick,
    sizeVariant,
    title,
  }: Props = $props();

  const colorClasses: Record<ButtonColorVariant, string> = {
    primary:
      'px-4 py-2 bg-gradient-to-tr from-primary to-pink-600 text-on-primary transition hover:hue-rotate-15 hover:text-hover-on-primary',
    secondary:
      'p-2 text-secondary hover:bg-hover-secondary hover:text-hover-on-secondary',
    destructive:
      'p-2 bg-destructive text-on-destructive hover:bg-hover-destructive hover:text-hover-on-destructive',
    interactive:
      'p-2 bg-interactive text-on-interactive hover:bg-hover-interactive hover:text-hover-on-interactive',
  };
</script>

<button
  onclick={onClick}
  class={`flex items-center gap-1 rounded transition  ${colorClasses[colorVariant]}`}
  {title}
>
  <svelte:component this={icon} size={sizeVariant === 'small' ? 16 : 20} />
  <slot />
</button>
