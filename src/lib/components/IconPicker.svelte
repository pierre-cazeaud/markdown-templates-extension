<script lang="ts">
  import { fade } from 'svelte/transition';
  import PickerContainer from '../layouts/PickerContainer.svelte';
  import { iconsStore } from '../stores/iconsStore.svelte';
  import { CheckIcon } from 'lucide-svelte';

  type Props = {
    activeIcon?: string;
  };

  const icons = Object.keys(iconsStore.list);
  let { activeIcon = $bindable() }: Props = $props();
</script>

<PickerContainer title="Icons">
  {#each icons as icon}
    <div class="relative">
      <button
        disabled={activeIcon === icon}
        onclick={() => (activeIcon = icon)}
      >
        <svelte:component
          this={iconsStore.list[icon]}
          size="32"
          strokeWidth="1"
        />
      </button>

      {#if activeIcon === icon}
        <span
          class="absolute flex items-center justify-center -bottom-1 -right-1 size-4 text-on-successful bg-successful rounded-full"
          transition:fade={{ duration: 200 }}
        >
          <CheckIcon size="10" />
        </span>
      {/if}
    </div>
  {/each}
</PickerContainer>
