<script lang="ts">
  import Label from '../components/Form/Label.svelte';

  type Props = {
    title: string;
  };

  let { title }: Props = $props();
</script>

<section class="flex flex-col gap-2">
  <Label text={title} />

  <div
    class="flex flex-col gap-4 h-full p-4 rounded-lg bg-surface text-on-surface border"
  >
    <div class="flex flex-wrap gap-4">
      <slot />
    </div>
  </div>
</section>
