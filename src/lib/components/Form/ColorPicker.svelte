<script lang="ts">
  import { CheckIcon } from 'lucide-svelte';
  import { COLOR_PICKER_LIST } from '../../constants';
  import Badge from '../Badge.svelte';

  type Props = {
    name: string;
    onInput: (event: Event) => void;
    value: string;
  };

  let { name, onInput, value }: Props = $props();
  let currentColor = $state(value);

  const handleInput = (event: Event) => {
    currentColor = (event.target as HTMLInputElement).value;
  };
</script>

<div
  class="h-full p-4 rounded-lg bg-surface text-on-surface border"
  oninput={handleInput}
>
  <div class="flex flex-wrap gap-4">
    {#each COLOR_PICKER_LIST as color}
      <label class={`relative bg-${color}-300 border rounded-full size-8`}>
        <input
          checked={value === color}
          class="absolute opacity-0"
          {name}
          oninput={onInput}
          type="radio"
          value={color}
        />

        {#if currentColor === color}
          <Badge colorVariant="successful">
            <CheckIcon size="10" />
          </Badge>
        {/if}
      </label>
    {/each}
  </div>
</div>
