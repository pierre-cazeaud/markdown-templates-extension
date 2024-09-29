<script lang="ts">
  import Badge from '../Badge.svelte';
  import { iconsStore } from '../../stores/iconsStore.svelte';
  import { CheckIcon } from 'lucide-svelte';

  type Props = {
    name: string;
    onInput: (event: Event) => void;
    value: string;
  };

  let { name, onInput, value }: Props = $props();
  let currentIcon = $state(value);
  const icons = Object.keys(iconsStore.list);

  const handleInput = (event: Event) => {
    currentIcon = (event.target as HTMLInputElement).value;
  };
</script>

<div
  class="p-4 rounded-lg bg-surface text-on-surface border"
  oninput={handleInput}
>
  <div class="flex flex-wrap gap-4">
    {#each icons as icon}
      <label class="relative flex items-center justify-center size-8">
        <input
          checked={value === icon}
          class="peer/input absolute opacity-0"
          {name}
          oninput={onInput}
          type="radio"
          value={icon}
        />

        <svelte:component
          this={iconsStore.list[icon]}
          size="24"
          strokeWidth="1"
        />

        {#if currentIcon === icon}
          <Badge colorVariant="successful" styleVariant="filled">
            <CheckIcon size="10" />
          </Badge>
        {/if}
      </label>
    {/each}
  </div>
</div>
