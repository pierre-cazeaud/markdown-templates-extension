import { getTemplatesStorage, setTemplatesStorage } from '../utils/storage';
import { removeItemFromArray } from '../utils/array';
import type {
  StoredTemplatesData,
  Template,
  TemplateGroup,
  UUID,
} from '../types';

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
      newGroup: Omit<TemplateGroup, 'creationTimestamp' | 'editTimestamp'>
    ) {
      const id = crypto.randomUUID();
      const timestamp = Date.now();
      data.templateGroups[id] = {
        ...newGroup,
        creationTimestamp: timestamp,
        editTimestamp: timestamp,
      };

      data.orderedTemplateList.push({
        id,
        type: 'templateGroup',
      });

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
      data.templateGroups[groupId] = {
        ...data.templateGroups[groupId],
        ...newGroupData,
        editTimestamp: Date.now(),
      };

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
