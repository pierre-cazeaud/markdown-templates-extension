<script lang="ts">
  import Button from '@/lib/components/Button.svelte';
  import Container from '@/lib/layouts/Container.svelte';
  import { appStore } from '@/lib/stores/appStore.svelte';
  import { Maximize2Icon } from 'lucide-svelte';

  const PageComponent = $derived(appStore.Page);
</script>

<Container>
  <header class="ml-auto mb-4">
    <Button
      colorVariant="secondary"
      icon={Maximize2Icon}
      onClick={() => browser.runtime.openOptionsPage()}
    />
  </header>

  <PageComponent />
</Container>
