<script lang="ts">
  import type { State } from '../components/Form/types';
  import type { StoredTemplatesData, TemplateGroup, UUID } from '../types';
  import { ArrowLeftIcon, CheckIcon, RotateCcwIcon, Trash2Icon } from 'lucide-svelte';
  import { appStore } from '../stores/appStore.svelte';
  import { templatesStore } from '../stores/templatesStore.svelte';
  import Button from '../components/Button.svelte';
  import Page from '../layouts/Page.svelte';
  import { FORM_RESET_EVENT } from '../components/Form/Form.svelte';
  import TemplateGroupForm from '../components/Form/TemplateGroupForm.svelte';
  import Badge from '../components/Badge.svelte';

  const { editPageTemplateGroupProps, renderListPage } = appStore;
  const {
    createTemplateGroup,
    data,
    deleteTemplateGroup,
    getUngroupedTemplates,
    readTemplateGroup,
    updateTemplateGroup,
    updateOrderedTemplateList,
  } = templatesStore;

  const templateGroupId = editPageTemplateGroupProps?.templateGroupId;

  let loadedTemplateGroup = templateGroupId
    ? readTemplateGroup(templateGroupId)
    : undefined;

  let color: TemplateGroup['color'] = $state(
    loadedTemplateGroup?.color || 'white'
  );
  let icon: TemplateGroup['icon'] = $state(loadedTemplateGroup?.icon || '');
  let newOrderedTemplateList: StoredTemplatesData['orderedTemplateList'] =
    $state([...data.orderedTemplateList] || []);
  let templateIds: UUID[] = $state(
    loadedTemplateGroup?.templateIds
      ? [...loadedTemplateGroup?.templateIds]
      : []
  );
  let title: TemplateGroup['title'] = $state(loadedTemplateGroup?.title || '');
  let ungroupedTemplateIds: UUID[] = $state(getUngroupedTemplates());
  let formChangesCounter = $state<number | undefined>();
    let formState = $state<State | undefined>();

  const onBackClick = () => {
    renderListPage();
  };

  const onDeleteClick = () => {
    if (templateGroupId) {
      deleteTemplateGroup(templateGroupId);
      renderListPage();
    }
  };

  const onResetClick = () => {
    document.dispatchEvent(new CustomEvent(FORM_RESET_EVENT));
  };

  const onSaveClick = () => {
    if (!templateGroupId)
      createTemplateGroup({
        color,
        icon,
        templateIds,
        title,
      });
    else {
      updateTemplateGroup(templateGroupId, {
        color,
        icon,
        templateIds,
        title,
      });
    }

    // Ensure ungroupedTemplateIds as changed compared to the original data before saving to storage
    if (
      JSON.stringify(ungroupedTemplateIds) !==
      JSON.stringify(getUngroupedTemplates())
    )
      updateOrderedTemplateList(newOrderedTemplateList);

    renderListPage();
  };

  $effect(() => {
    // Push ungrouped templates back to newOrderedTemplateList
    for (const id of ungroupedTemplateIds) {
      if (!newOrderedTemplateList.some((item) => item.id === id))
        newOrderedTemplateList.push({
          id,
          type: 'template',
        });
    }

    // Remove grouped templates from newOrderedTemplateList
    for (const id of templateIds) {
      const templateIndex = newOrderedTemplateList.findIndex(
        (item) => item.id === id
      );
      if (templateIndex > -1) newOrderedTemplateList.splice(templateIndex, 1);
    }
  });

  const isSaveDisbled = $derived(!formChangesCounter || formState === 'invalid')
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
      {title || 'New template group'}
    </span>

    
    <div class="flex gap-2">
      {#if templateGroupId}
        <Button
          colorVariant='neutral'
          disabled={isSaveDisbled}
          icon={RotateCcwIcon}
          onClick={onResetClick}
          sizeVariant="small"
          title='Reset changes'
        />
      {/if}
        
      <Button
        class="relative"
        colorVariant='successful'
        disabled={isSaveDisbled}
        icon={CheckIcon}
        onClick={onSaveClick} 
        sizeVariant="small"
        title='Save changes'
      >
        {#if templateGroupId && formChangesCounter}
          <Badge colorVariant="successful">
            {formChangesCounter.toString()}
          </Badge>
        {/if}
      </Button>
        
      {#if templateGroupId}
        <Button
          colorVariant="destructive"
          icon={Trash2Icon}
          onClick={onDeleteClick}
          sizeVariant="small"
          title="Delete template"
        />
      {/if}
    </div>
  {/snippet}

  <TemplateGroupForm 
    bind:color
    bind:icon
    bind:formChangesCounter
    bind:formState
    bind:title
  />
</Page>
