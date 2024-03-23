<script lang="ts">
  type Props = {
    isFullWidth?: boolean;
  };

  let { isFullWidth }: Props = $props();
</script>

<main
  class="flex flex-col gap-4 min-h-[600px] min-w-[600px] max-w-screen-2xl w-full p-4 bg-background text-on-background"
  class:min-h-screen={isFullWidth}
>
  <slot />
</main>
