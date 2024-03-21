<script lang="ts">
  import type { ComponentType } from 'svelte';
  import type { Icon } from 'lucide-svelte';

  type ButtonColorVariant = 'primary' | 'secondary';

  type Props = {
    colorVariant?: ButtonColorVariant;
    icon?: ComponentType<Icon>;
    sizeVariant?: 'small';
    onClick: () => void;
  };

  let {
    colorVariant = 'primary',
    icon,
    sizeVariant,
    onClick,
  }: Props = $props();

  const colorClasses: Record<ButtonColorVariant, string> = {
    primary:
      'px-4 py-2 bg-gradient-to-tr from-primary to-pink-600 text-on-primary transition hover:hue-rotate-15 hover:text-hover-on-primary',
    secondary:
      'p-2 text-secondary hover:bg-hover-secondary hover:text-hover-on-secondary',
  };
</script>

<button
  onclick={onClick}
  class={`flex items-center gap-1 rounded transition  ${colorClasses[colorVariant]}`}
>
  <svelte:component this={icon} size={sizeVariant === 'small' ? 16 : 20} />
  <slot />
</button>
