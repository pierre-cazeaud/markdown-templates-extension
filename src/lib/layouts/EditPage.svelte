<script lang="ts">
  import {
    ArrowLeftIcon,
    CheckIcon,
    EyeIcon,
    EyeOffIcon,
    PanelRightCloseIcon,
    PanelRightOpenIcon,
    Trash2Icon,
    XIcon,
  } from 'lucide-svelte';
  import Button from '../components/Button.svelte';
  import { store } from '../utils/store.svelte';
  import type { Template, UUID } from '../types';

  type Props = {
    onBackClick: () => void;
    templateId?: UUID;
  };

  let { onBackClick, templateId }: Props = $props();

  const templatesStore = store();

  let loadedTemplate = templateId
    ? templatesStore.readTemplate(templateId)
    : undefined;
  let content: Template['content'] = $state(loadedTemplate?.content || '');
  let title: Template['title'] = $state(loadedTemplate?.title || '');
  let variables: Template['variables'] = $state(loadedTemplate?.variables);

  let isShowingVariables = $state(false);
  let isSidebarOpen = $state(false);

  const handleTitleKeyDown = (event: KeyboardEvent) => {
    // console.log(event?.target?.textContent);
  };

  const handleTitleKeyUp = () => {};
  const onCancelClick = () => {};
  const onDeleteClick = () => {};
  const onSaveClick = () => {
    if (!templateId)
      templatesStore.createTemplate({
        content: 'test',
        title: 'Title',
        variables,
      });
    else {
      templatesStore.updateTemplate(templateId, {
        content,
        title,
        variables,
      });
    }
  };
</script>

<section class="relative">
  <!-- Main -->
  <div
    class="flex flex-col gap-4 pr-0 transition-[padding]"
    class:!pr-96={isSidebarOpen}
  >
    <header class="flex justify-between">
      <div>
        <Button
          colorVariant="secondary"
          icon={ArrowLeftIcon}
          onClick={onBackClick}
          title="Go back"
        />
      </div>

      <div class="flex gap-2">
        <Button
          colorVariant="destructive"
          icon={Trash2Icon}
          onClick={onDeleteClick}
          title="Delete template"
        />

        <Button
          colorVariant="interactive"
          icon={isShowingVariables ? EyeOffIcon : EyeIcon}
          onClick={() => (isShowingVariables = !isShowingVariables)}
          title="Toggle variables visibility"
        />

        <Button
          colorVariant="secondary"
          icon={isSidebarOpen ? PanelRightCloseIcon : PanelRightOpenIcon}
          onClick={() => (isSidebarOpen = !isSidebarOpen)}
          title="Toggle variables panel visibility"
        />
      </div>
    </header>

    <!-- Title -->
    <p
      aria-multiline="false"
      class="title border border-on-background bg-surface text-on-surface rounded text-2xl p-2"
      contenteditable="true"
      placeholder="Title"
      onKeydown={handleTitleKeyDown}
      onKeyup={handleTitleKeyUp}
    >
      {title}
    </p>

    <!-- Content -->
    <code
      aria-multiline="true"
      class="content border border-on-background bg-surface text-on-surface rounded text-base p-2 min-h-80"
      contenteditable="true"
      placeholder="Markdown content for your template">{content}</code
    >

    <footer class="flex justify-center gap-4 mt-auto">
      <Button icon={XIcon} onClick={onCancelClick} colorVariant={'destructive'}
        >Cancel changes</Button
      >
      <Button
        icon={CheckIcon}
        onClick={onSaveClick}
        colorVariant={'interactive'}>Save changes</Button
      >
    </footer>
  </div>

  <!-- Sidebar -->
  <sidebar
    class="fixed top-0 right-0 flex flex-col gap-4 border border-on-background rounded-tl-lg rounded-bl-lg w-96 h-full p-4 shadow-lg translate-x-96 transition"
    class:!translate-x-0={isSidebarOpen}
  >
    <header class="flex items-center justify-between">
      <div>
        <p class="text-lg">Variables</p>
      </div>

      <div class="flex gap-2">
        <Button
          colorVariant="secondary"
          icon={XIcon}
          onClick={() => (isSidebarOpen = false)}
          title="Close variables panel"
        />
      </div>
    </header>
  </sidebar>
</section>

<style>
  .title:empty:not(:focus):before {
    content: attr(placeholder);
    opacity: 0.5;
  }

  .content:empty:not(:focus):before {
    content: attr(placeholder);
    opacity: 0.5;
  }
</style>
