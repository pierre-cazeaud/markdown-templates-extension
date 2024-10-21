import { getTemplatesStorage, setTemplatesStorage } from '../utils/storage';
import { removeItemFromArray } from '../utils/array';
import type {
  StoredTemplatesData,
  Template,
  TemplateGroup,
  UUID,
} from '../types';

const handleTemplateGroupUpdateOfTemplateIds = (
  data: StoredTemplatesData,
  groupId: UUID,
  newTemplateIds: UUID[]
) => {
  // Stored and new template ids are the same
  const storedTemplateIds = data.templateGroups[groupId].templateIds;
  if (
    JSON.stringify(data.templateGroups[groupId].templateIds) ===
    JSON.stringify(newTemplateIds)
  )
    return;

  // Make sure we take care of stored and new templates
  const templateIds = new Set([
    ...(storedTemplateIds || []),
    ...newTemplateIds,
  ]);

  templateIds.forEach((id) => {
    // Template is already in group but is not inside newly defined templates
    if (
      !newTemplateIds.includes(id) &&
      data.templateGroups[groupId].templateIds
    ) {
      removeItemFromArray(data.templateGroups[groupId].templateIds, id);
      data.orderedTemplateList.push({ id, type: 'template' });
    }
    // Template is inside data.orderedTemplateList (ungrouped)
    else if (data.orderedTemplateList.some((template) => template.id === id)) {
      removeItemFromArray(data.orderedTemplateList, id);
      data.templateGroups[groupId].templateIds
        ? data.templateGroups[groupId].templateIds.push(id)
        : (data.templateGroups[groupId].templateIds = [id]);
    }
    // Template is inside another group
    else {
      Object.keys(data.templateGroups).forEach((key) => {
        if (data.templateGroups[key as UUID].templateIds?.includes(id)) {
          removeItemFromArray(data.templateGroups[key as UUID].templateIds, id);
          data.templateGroups[groupId].templateIds
            ? data.templateGroups[groupId].templateIds.push(id)
            : (data.templateGroups[groupId].templateIds = [id]);
        }
      });
    }
  });
};

const initTemplatesStore = async () => {
  let isLoading = $state(true);
  let data = $state<StoredTemplatesData>({
    orderedTemplateList: [],
    templateGroups: {},
    templates: {},
  });

  const newData = await getTemplatesStorage();

  if (newData) data = newData;
  isLoading = false;

  return {
    get isLoading() {
      return isLoading;
    },

    set isLoading(newValue) {
      isLoading = newValue;
    },

    get data() {
      return data;
    },

    set data(newValue) {
      data = newValue;
    },

    // Templates
    createTemplate(
      newTemplate: Omit<Template, 'creationTimestamp' | 'editTimestamp'>,
      templateGroupId?: UUID
    ) {
      const id = crypto.randomUUID();
      const timestamp = Date.now();
      data.templates[id] = {
        ...newTemplate,
        creationTimestamp: timestamp,
        editTimestamp: timestamp,
      };

      if (templateGroupId)
        data.templateGroups?.[templateGroupId].templateIds?.push(id);

      data.orderedTemplateList.push({
        id,
        type: 'template',
      });

      setTemplatesStorage(data);
    },

    deleteTemplate(templateId: UUID) {
      delete data?.templates?.[templateId];

      templatesStore.deleteOrderedTemplateItem(templateId);

      let targetGroupId;
      for (const id of Object.keys(data.templateGroups)) {
        if (data.templateGroups[id as UUID].templateIds?.includes(templateId))
          targetGroupId = id as UUID;
      }

      if (targetGroupId) {
        removeItemFromArray(
          data?.templateGroups?.[targetGroupId]?.templateIds,
          templateId
        );
      }

      setTemplatesStorage(data);
    },

    getGroupIdOfTemplate(templateId: UUID) {
      return Object.keys(data.templateGroups).find((groupId) =>
        data.templateGroups[groupId as UUID].templateIds?.includes(templateId)
      );
    },

    readTemplate(templateId: UUID) {
      return data.templates?.[templateId];
    },

    updateTemplate(templateId: UUID, newTemplateData: Partial<Template>) {
      data.templates[templateId] = {
        ...data.templates[templateId],
        ...newTemplateData,
        editTimestamp: Date.now(),
      };

      setTemplatesStorage(data);
    },

    // Templates groups
    createTemplateGroup(
      newGroupData: Omit<TemplateGroup, 'creationTimestamp' | 'editTimestamp'>
    ) {
      const id = crypto.randomUUID();
      const timestamp = Date.now();
      const { templateIds: newTemplateIds, ...newGroupDataRest } = newGroupData;

      data.templateGroups[id] = {
        ...newGroupDataRest,
        creationTimestamp: timestamp,
        editTimestamp: timestamp,
      };

      data.orderedTemplateList.push({
        id,
        type: 'templateGroup',
      });

      if (newTemplateIds)
        handleTemplateGroupUpdateOfTemplateIds(data, id, newTemplateIds);

      setTemplatesStorage(data);
    },

    deleteTemplateGroup(groupId: UUID) {
      const { templateIds } = data.templateGroups[groupId];

      templatesStore.deleteOrderedTemplateItem(groupId);
      delete data?.templateGroups?.[groupId];

      if (templateIds) {
        templateIds.forEach((id) =>
          data.orderedTemplateList.push({ id, type: 'template' })
        );
      }

      setTemplatesStorage(data);
    },

    readTemplateGroup(groupId: UUID) {
      return data.templateGroups?.[groupId];
    },

    updateTemplateGroup(groupId: UUID, newGroupData: Partial<TemplateGroup>) {
      const { templateIds: newTemplateIds, ...newGroupDataRest } = newGroupData;

      data.templateGroups[groupId] = {
        ...data.templateGroups[groupId],
        ...newGroupDataRest,
        editTimestamp: Date.now(),
      };

      handleTemplateGroupUpdateOfTemplateIds(
        data,
        groupId,
        newTemplateIds as UUID[]
      );

      setTemplatesStorage(data);
    },

    // Ordered template list
    deleteOrderedTemplateItem(id: UUID) {
      const templateIndex = data.orderedTemplateList.findIndex(
        (item) => item.id === id
      );
      if (templateIndex > -1) data.orderedTemplateList.splice(templateIndex, 1);
    },

    getUngroupedTemplates() {
      const ungroupedTemplates: UUID[] = [];

      data.orderedTemplateList.forEach((item) => {
        if (item.type === 'template') ungroupedTemplates.push(item.id);
      });

      return ungroupedTemplates;
    },

    updateOrderedTemplateList(
      newOrderedTemplateList: StoredTemplatesData['orderedTemplateList']
    ) {
      data.orderedTemplateList = newOrderedTemplateList;
      setTemplatesStorage(data);
    },
  };
};

export const templatesStore = await initTemplatesStore();
