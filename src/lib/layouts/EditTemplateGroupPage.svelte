<script lang="ts">
  import { ArrowLeftIcon, CheckIcon, Trash2Icon, XIcon } from 'lucide-svelte';
  import Button from '../components/Button.svelte';
  import { appStore } from '../stores/appStore.svelte';
  import { templatesStore } from '../stores/templatesStore.svelte';
  import ColorPicker from '../components/ColorPicker.svelte';
  import Label from '../components/Label.svelte';
  import TextInput from '../components/TextInput.svelte';
  import type { TemplateGroup } from '../types';
  import type { FormEventHandler } from 'svelte/elements';
  import IconPicker from '../components/IconPicker.svelte';

  const { editPageTemplateProps, renderListPage } = appStore;
  const {
    createTemplateGroup,
    deleteTemplateGroup,
    readTemplateGroup,
    updateTemplateGroup,
  } = templatesStore;

  const templateGroupId = editPageTemplateProps?.templateGroupId;
  console.log(templateGroupId);
  
  let loadedTemplateGroup = templateGroupId
    ? readTemplateGroup(templateGroupId)
    : undefined;

  let color: TemplateGroup['color'] = $state(loadedTemplateGroup?.title || 'white');
  let icon: TemplateGroup['icon'] = $state(loadedTemplateGroup?.title || '');
  let title: TemplateGroup['title'] = $state(loadedTemplateGroup?.title || '');

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
        title,
      });
    else {
      updateTemplateGroup(templateGroupId, {
        color,
        icon,
        title,
      });
    }

    renderListPage();
  };

  const onTitleChange: FormEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    title = currentTarget?.value;
  }
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
        <TextInput onchange={onTitleChange} />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <ColorPicker activeColor={color} onChooseColor={(newColor: string) => color = newColor} />
        <IconPicker activeIcon={icon} onChooseIcon={(newIcon: string) => icon = newIcon} />
      </div>
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
