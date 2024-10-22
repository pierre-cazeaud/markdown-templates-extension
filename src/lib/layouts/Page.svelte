<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import Container from './Container.svelte';
  import { appStore } from '../stores/appStore.svelte';

  type Props = HTMLAttributes<HTMLDivElement> & {
    children: Snippet,
    footer?: Snippet,
    header?: Snippet,
  };

  let { class: classes, children, footer, header }: Props = $props();
  const { appOrigin } = appStore;
</script>

<Container footer={footer} header={header} isFullWidth={appOrigin !== 'popup'}>
  <div class={`flex flex-col grow gap-4 ${classes || ''}`} in:fade={{duration: 150}}>
    {@render children()}
  </div>
</Container>




