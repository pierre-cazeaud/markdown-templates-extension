<script lang="ts">
  import Button from '@/lib/components/Button.svelte';
  import Container from '@/lib/layouts/Container.svelte';
  import { appStore } from '@/lib/stores/appStore.svelte';
  import { CogIcon } from 'lucide-svelte';

  const PageComponent = $derived(appStore.Page);
</script>

<Container>
  <header class="ml-auto">
    <Button
      colorVariant="secondary"
      icon={CogIcon}
      onClick={() => console.log('Settings')}
    />
  </header>

  <PageComponent />
</Container>
