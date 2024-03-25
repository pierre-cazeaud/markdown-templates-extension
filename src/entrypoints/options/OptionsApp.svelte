<script lang="ts">
  import Button from '@/lib/components/Button.svelte';
  import Container from '@/lib/layouts/Container.svelte';
  import EditPage from '@/lib/layouts/EditPage.svelte';
  import ListPage from '@/lib/layouts/ListPage.svelte';
  import NoTemplate from '@/lib/layouts/NoTemplate.svelte';
  import { ArrowDownToLineIcon, CogIcon, PlusIcon } from 'lucide-svelte';
  // import svelteLogo from '../../assets/svelte.svg';

  let isEditing = $state(false);
  let isEditingId = undefined;
</script>

<Container isFullWidth>
  {#if !isEditing}
    <ListPage
      onCreateClick={() => (isEditing = true)}
      onImportClick={() => console.log('Import')}
    />
  {:else}
    <EditPage onBackClick={() => (isEditing = false)} />
  {/if}
</Container>
