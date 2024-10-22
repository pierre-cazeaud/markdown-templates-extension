<script lang="ts">
  import { appStore } from '@/lib/stores/appStore.svelte';

  const PageComponent = $derived(appStore.Page);
</script>

<PageComponent />
