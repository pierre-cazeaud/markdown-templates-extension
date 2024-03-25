<script lang="ts">
  type Props = {
    isFullWidth?: boolean;
  };

  let { isFullWidth }: Props = $props();

  document.body.classList.add('bg-background', 'text-on-background');
</script>

<main
  class="flex flex-col gap-4 min-h-[600px] min-w-[600px] max-w-screen-2xl mx-auto w-full p-4"
  class:min-h-screen={isFullWidth}
>
  <slot />
</main>
