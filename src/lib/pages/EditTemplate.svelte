<script lang="ts">
  import type { State } from '../components/Form/types';
  import type { Template } from '../types';
  import {
    ArrowLeftIcon,
    CheckIcon,
    RotateCcwIcon,
    Trash2Icon,
  } from 'lucide-svelte';
  import Button from '../components/Button.svelte';
  import TemplateForm from '../components/Form/TemplateForm.svelte';
  import { appStore } from '../stores/appStore.svelte';
  import { templatesStore } from '../stores/templatesStore.svelte';
  import Page from '../layouts/Page.svelte';
  import Badge from '../components/Badge.svelte';
  import { FORM_RESET_EVENT } from '../components/Form/Form.svelte';

  const { editPageTemplateProps, renderListPage } = appStore;
  const { createTemplate, deleteTemplate, readTemplate, updateTemplate } =
    templatesStore;

  const templateId = editPageTemplateProps?.templateId;
  let loadedTemplate = templateId ? readTemplate(templateId) : undefined;

  let content: Template['content'] = $state(loadedTemplate?.content || '');
  let formChangesCounter = $state<number | undefined>();
  let formState = $state<State | undefined>();
  let title: Template['title'] = $state(loadedTemplate?.title || '');

  const onBackClick = () => {
    renderListPage();
  };
  
  const onDeleteClick = () => {
    if (templateId) {
      deleteTemplate(templateId);
      renderListPage();
    }
  };
  
  const onResetClick = () => {
    document.dispatchEvent(new CustomEvent(FORM_RESET_EVENT));
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
  
  const isSaveDisbled = $derived(formChangesCounter === 0 || formState === 'invalid')
</script>

<Page>
  {#snippet header()}
    <Button
      colorVariant="neutral"
      icon={ArrowLeftIcon}
      onClick={onBackClick}
      sizeVariant="small"
      title="Go back"
    />
  
    <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-semibold">
      {title || 'New template'}
    </span>

    {#if templateId}
      <div class="flex gap-2">
        <Button
          colorVariant='neutral'
          disabled={isSaveDisbled}
          icon={RotateCcwIcon}
          onClick={onResetClick}
          sizeVariant="small"
          title='Reset changes'
        />
          
        <Button
          class="relative"
          colorVariant='successful'
          disabled={isSaveDisbled}
          icon={CheckIcon}
          onClick={onSaveClick} 
          sizeVariant="small"
          title='Save changes'
        >
          {#if formChangesCounter}
            <Badge colorVariant="successful">
              {formChangesCounter.toString()}
            </Badge>
          {/if}
        </Button>
          
        <Button
          colorVariant="destructive"
          icon={Trash2Icon}
          onClick={onDeleteClick}
          sizeVariant="small"
          title="Delete template"
        />
      </div>
    {/if}
  {/snippet}

  <TemplateForm
    bind:content
    bind:formChangesCounter
    bind:formState
    bind:title
  />
</Page>