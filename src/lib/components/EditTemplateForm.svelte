<script lang="ts">
  import type { Template } from '../types';

  type Props = {
    content: Template['content'];
    title: Template['title'];
  };

  let { content = $bindable(), title = $bindable() }: Props = $props();

  const handleTitleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      // Prevent key insertion
      event.preventDefault();
      return false;
    }
  };
</script>

<section class="flex flex-col gap-4">
  <p
    aria-multiline="false"
    class="title border border-on-background bg-surface text-on-surface rounded text-2xl p-2"
    contenteditable="true"
    onKeydown={handleTitleKeyDown}
    placeholder="Title"
    bind:textContent={title}
  >
    {title}
  </p>

  <code
    aria-multiline="true"
    class="content border border-on-background bg-surface text-on-surface rounded text-base p-2 min-h-80"
    contenteditable="true"
    placeholder="Markdown content for your template"
    bind:textContent={content}>{content}</code
  >
</section>
