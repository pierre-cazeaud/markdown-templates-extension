<script module lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  
  export type InputErrorProps = HTMLAttributes<HTMLParagraphElement> & {
    text: string;
  };
</script>

<script lang="ts">
  let { text }: InputErrorProps = $props();
</script>

<p class="InputError text-red-500">
  {text}
</p>