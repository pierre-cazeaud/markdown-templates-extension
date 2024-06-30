<script lang="ts">
  import Container from '@/lib/layouts/Container.svelte';
  import { appStore } from '@/lib/stores/appStore.svelte';

  const PageComponent = $derived(appStore.Page);
  appStore.appOrigin = 'popup';
</script>

<Container>
  <PageComponent />
</Container>
