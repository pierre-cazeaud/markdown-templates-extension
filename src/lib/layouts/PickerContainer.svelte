<script lang="ts">
  import Label from '../components/Label.svelte';

  type Props = {
    title: string;
  };

  let { title }: Props = $props();
</script>

<div
  class="flex flex-col gap-4 p-4 rounded-lg bg-surface text-on-surface border"
>
  <Label>{title}</Label>

  <div class="flex flex-wrap gap-4">
    <slot />
  </div>
</div>
