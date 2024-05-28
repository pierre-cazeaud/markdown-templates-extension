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
  import type { Template } from '../types';
  import EditTemplateForm from '../components/EditTemplateForm.svelte';
  import { appStore } from '../stores/appStore.svelte';
  import { templatesStore } from '../stores/templatesStore.svelte';
  import Page from '../layouts/Page.svelte';

  const { editPageTemplateProps, renderListPage } = appStore;
  const { createTemplate, deleteTemplate, readTemplate, updateTemplate } =
    templatesStore;

  const templateId = editPageTemplateProps?.templateId;
  let loadedTemplate = templateId ? readTemplate(templateId) : undefined;

  let content: Template['content'] = $state(loadedTemplate?.content || '');
  let title: Template['title'] = $state(loadedTemplate?.title || '');

  const onBackClick = () => {
    renderListPage();
  };

  const onCancelClick = () => {
    renderListPage();
  };

  const onDeleteClick = () => {
    if (templateId) {
      deleteTemplate(templateId);
      renderListPage();
    }
  };

  const onSaveClick = () => {
    if (!templateId)
      createTemplate({
        content,
        title,
        variables,
      });
    else {
      updateTemplate(templateId, {
        content,
        title,
        variables,
      });
    }

    renderListPage();
  };
</script>

<Page class="relative">
  <div class="flex flex-col gap-4 pr-0 transition-[padding]">
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
        {#if templateId}
          <Button
            colorVariant="destructive"
            icon={Trash2Icon}
            onClick={onDeleteClick}
            title="Delete template"
          />
        {/if}
      </div>
    </header>

    <EditTemplateForm bind:content bind:title />

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
</Page>
