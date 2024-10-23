<script lang="ts">
  import type { UUID } from '../../types';
  import { templatesStore } from '@/lib/stores/templatesStore.svelte';
  import { removeItemFromArray } from '@/lib/utils/array';
  import TemplateCard from '../TemplateCard.svelte';
  import Badge from '../Badge.svelte';
  import { CheckIcon } from 'lucide-svelte';

  type Props = {
    name: string;
    onInput: (event: Event) => void;
    value: string | undefined;
  };

  let { name, onInput, value }: Props = $props();
  
  const { data, getGroupIdOfTemplate, readTemplateGroup } = templatesStore;
  const originalTemplatesInGroup = value?.split(',') || [];
  let checkedInputs = $state(originalTemplatesInGroup);

  const handleInput = (event: Event, id: UUID) => {
    onInput(event);
    checkedInputs.includes(id) ? removeItemFromArray(checkedInputs, id) : checkedInputs.push(id);
  }
</script>

<section class="p-4 bg-surface text-on-surface rounded-lg border">
  <div class="grid grid-cols-4 gap-4">
    {#each Object.keys(data.templates) as id (id)}
      {@const isOriginalyInGroup = originalTemplatesInGroup.includes(id as UUID)}
      {@const foreignGroupId = !isOriginalyInGroup ? getGroupIdOfTemplate(id as UUID) : ''}
      {@const groupData = readTemplateGroup(foreignGroupId as UUID)}
      
      <label class="relative h-full">
        <input
          checked={originalTemplatesInGroup.includes(id as UUID)}
          class="hidden peer"
          name={name}
          oninput={(event) => handleInput(event, id as UUID)}
          type="checkbox"
          value={id}
        />

        <TemplateCard
          class="h-full outline-{groupData?.color} peer-checked:outline peer-checked:outline-successful"
          {...groupData && {
            groupBadge: {
              color: groupData.color,
              icon: groupData.icon,
              title: groupData.title
            }
          }}
          hasActions={false}
          templateId={id as UUID}
        />

        {#if checkedInputs.includes(id)}
          <Badge colorVariant="successful">
            <CheckIcon size="10" />
          </Badge>
        {/if}
      </label>
    {/each}
  </div>
</section>
