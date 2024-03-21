<script lang="ts">
  import Button from '@/lib/components/Button.svelte';
  import NoTemplate from '@/lib/layouts/NoTemplate.svelte';
  import { ArrowDownToLineIcon, CogIcon, PlusIcon } from 'lucide-svelte';
  // import svelteLogo from '../../assets/svelte.svg';

  const items = undefined;
</script>

<main
  class="flex flex-col gap-4 min-h-[600px] min-w-[600px] p-4 bg-background text-on-background"
>
  <header class="ml-auto">
    <Button
      colorVariant="secondary"
      icon={CogIcon}
      onClick={() => console.log('Settings')}
    />
  </header>

  {#if !items}
    <NoTemplate />
  {:else}
    <h1 class="text-xl">Templates</h1>
  {/if}

  <footer class="flex justify-center gap-4 mt-auto">
    <Button icon={ArrowDownToLineIcon} onClick={() => console.log('Import')}
      >Import template</Button
    >
    <Button icon={PlusIcon} onClick={() => console.log('Create')}
      >Create template</Button
    >
  </footer>
</main>
