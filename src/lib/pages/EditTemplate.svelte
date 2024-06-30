<script lang="ts">
  import {
    ArrowLeftIcon,
    CheckIcon,
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
  let isSaveDisabled = $state(true);
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
      });
    else {
      updateTemplate(templateId, {
        content,
        title,
      });
    }

    renderListPage();
  };
</script>

<Page>
  {#snippet header()}
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
  {/snippet}

  <EditTemplateForm bind:content bind:isSaveDisabled bind:title />

  {#snippet footer()}
    <Button icon={XIcon} onClick={onCancelClick} colorVariant={'destructive'}
      >Cancel changes</Button
    >
    <Button
      colorVariant={'interactive'}
      disabled={isSaveDisabled}
      icon={CheckIcon}
      onClick={onSaveClick}>Save changes</Button
    >
  {/snippet}
</Page>
