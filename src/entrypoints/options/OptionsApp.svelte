<script lang="ts">
  import { appStore } from '@/lib/stores/appStore.svelte';
  import Container from '@/lib/layouts/Container.svelte';

  const PageComponent = $derived(appStore.Page);
</script>

<Container isFullWidth>
  <PageComponent />
</Container>
