<script lang="ts">
  import { CheckIcon } from 'lucide-svelte';
  import { COLOR_PICKER_LIST } from '../constants';
  import { fade } from 'svelte/transition';
  import PickerContainer from '../layouts/PickerContainer.svelte';

  type Props = {
    activeColor?: string;
  };

  let { activeColor = $bindable() }: Props = $props();
</script>

<PickerContainer title="Color">
  {#each COLOR_PICKER_LIST as color}
    <div class="relative">
      <button
        class={`bg-${color}-300 border rounded-full size-8`}
        disabled={activeColor === color}
        onclick={() => (activeColor = color)}
      ></button>

      {#if activeColor === color}
        <span
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
          class:!text-slate-300={activeColor === 'white'}
          transition:fade={{ duration: 200 }}
        >
          <CheckIcon size="20" />
        </span>
      {/if}
    </div>
  {/each}
</PickerContainer>
