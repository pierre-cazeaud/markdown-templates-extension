<script module lang="ts">
  import type { TitleProps } from '../Text/Title.svelte';
  import type { State } from './types';

  export type LabelProps = TitleProps & {
    isRequired?: boolean;
    state?: State;
  };
</script>

<script lang="ts">
  import Title from '../Text/Title.svelte';
  import type { TextVariant } from '../Text/types';

  const stateClasses: Record<State, string> = {
    'invalid': 'text-red-500',
    'neutral': '',
    'valid': ''
  }

  const variantClasses: Record<TextVariant, string> = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg',
  };

  let { children, class: classes, isRequired, state = 'neutral', variant = 'default', ...props }: LabelProps = $props();
</script>


<Title class="font-semibold {stateClasses[state]} {variantClasses[variant]} {classes || ''}" {...props}>
  {@render children()}{#if isRequired}<span class="text-xs align-text-top">*</span>{/if}
</Title>

