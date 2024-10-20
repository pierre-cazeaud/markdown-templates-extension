<script lang="ts">
  import type { TemplateGroup, TemplateGroupColors, UUID } from '../../types';
  import type { State } from './types';
  import { COLOR_PICKER_LIST } from '@/lib/constants';
  import { iconsStore } from '@/lib/stores/iconsStore.svelte';
  import Form from './Form.svelte';

  type Props = {
    color: TemplateGroup['color'];
    icon: TemplateGroup['icon'];
    formChangesCounter: number | undefined;
    formState: State | undefined;
    templateIds: TemplateGroup['templateIds'];
    title: TemplateGroup['title'];
  };

  let {
    color = $bindable(),
    icon = $bindable(),
    formChangesCounter = $bindable(),
    formState = $bindable(),
    templateIds = $bindable(),
    title = $bindable(),
  }: Props = $props();

  let originalColor = color || COLOR_PICKER_LIST[0];
  let originalIcon = icon || Object.keys(iconsStore.list)[0];
  let originalTemplateIds = templateIds?.join(',') || '';
  let originalTitle = title;

  const handleColorInput = (event: Event) => {
    color = (event.target as HTMLInputElement).value as TemplateGroupColors;
  };

  const handleIconInput = (event: Event) => {
    icon = (event.target as HTMLInputElement).value;
  };

  const handleTitleInput = (event: Event) => {
    title = (event.target as HTMLInputElement).value;
  };

  const handleTemplatesInput = (event: Event, value: UUID[]) => {
    templateIds = value;
  };
</script>

<Form
  inputs={[
    {
      label: 'Title',
      onInput: handleTitleInput,
      required: true,
      requiredError: 'Please enter a valid title',
      type: 'text',
      value: originalTitle,
    },
    {
      label: 'Color',
      onInput: handleColorInput,
      type: 'color',
      value: originalColor,
    },
    {
      label: 'Icon',
      onInput: handleIconInput,
      type: 'icon',
      value: originalIcon,
    },
    {
      label: 'Templates',
      onTemplatesInput: handleTemplatesInput,
      type: 'template',
      value: originalTemplateIds,
    },
  ]}
  onFormChangesCounterChange={(newCount) => (formChangesCounter = newCount)}
  onFormStateChange={(newState) => (formState = newState)}
/>
