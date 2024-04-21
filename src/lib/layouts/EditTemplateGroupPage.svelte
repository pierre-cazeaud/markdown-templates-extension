<script lang="ts">
  import { ArrowLeftIcon, CheckIcon, Trash2Icon, XIcon } from 'lucide-svelte';
  import { appStore } from '../stores/appStore.svelte';
  import { templatesStore } from '../stores/templatesStore.svelte';
  import Button from '../components/Button.svelte';
  import ColorPicker from '../components/ColorPicker.svelte';
  import IconPicker from '../components/IconPicker.svelte';
  import Label from '../components/Label.svelte';
  import TextInput from '../components/TextInput.svelte';
  import TemplatePicker from '../components/TemplatePicker.svelte';
  import type { TemplateGroup, UUID } from '../types';
  import type { FormEventHandler } from 'svelte/elements';

  const { editPageTemplateGroupProps, renderListPage } = appStore;
  const {
    createTemplateGroup,
    data,
    deleteTemplateGroup,
    readTemplateGroup,
    updateTemplateGroup,
    updateUngroupedTemplates,
  } = templatesStore;

  const templateGroupId = editPageTemplateGroupProps?.templateGroupId;

  let loadedTemplateGroup = templateGroupId
    ? readTemplateGroup(templateGroupId)
    : undefined;

  let color: TemplateGroup['color'] = $state(
    loadedTemplateGroup?.color || 'white'
  );
  let icon: TemplateGroup['icon'] = $state(loadedTemplateGroup?.icon || '');
  let templateIds: UUID[] = $state(loadedTemplateGroup?.templateIds || []);
  let title: TemplateGroup['title'] = $state(loadedTemplateGroup?.title || '');
  let ungroupedTemplateIds: UUID[] = $state(data.ungroupedTemplates || []);

  const onBackClick = () => {
    renderListPage();
  };

  const onCancelClick = () => {
    renderListPage();
  };

  const onDeleteClick = () => {
    if (templateGroupId) {
      deleteTemplateGroup(templateGroupId);
      renderListPage();
    }
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

    updateUngroupedTemplates(ungroupedTemplateIds);
    renderListPage();
  };

  const onTitleChange: FormEventHandler<HTMLInputElement> = ({
    currentTarget,
  }) => {
    title = currentTarget?.value;
  };
</script>

<section class="relative">
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
        {#if templateGroupId}
          <Button
            colorVariant="destructive"
            icon={Trash2Icon}
            onClick={onDeleteClick}
            title="Delete template"
          />
        {/if}
      </div>
    </header>

    <section class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <Label>Title</Label>
        <TextInput onchange={onTitleChange} bind:value={title} />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <ColorPicker bind:activeColor={color} />
        <IconPicker bind:activeIcon={icon} />
      </div>

      <TemplatePicker
        bind:groupedTemplateIds={templateIds}
        bind:ungroupedTemplateIds
      />
    </section>

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
</section>
