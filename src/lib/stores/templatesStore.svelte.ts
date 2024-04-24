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
    favorites: [],
    templateGroups: {},
    templates: {},
    ungroupedTemplates: [],
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
    createTemplate(newTemplate: Template, templateGroupId?: UUID) {
      const id = crypto.randomUUID();
      data.templates[id] = newTemplate;

      templateGroupId
        ? data.templateGroups?.[templateGroupId].templateIds?.push(id)
        : data.ungroupedTemplates.push(id);

      setTemplatesStorage(data);
    },

    deleteTemplate(templateId: UUID) {
      delete data?.templates?.[templateId];

      if (data.ungroupedTemplates.includes(templateId)) {
        removeItemFromArray(data.ungroupedTemplates, templateId);
        setTemplatesStorage(data);
        return;
      }

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
      };

      setTemplatesStorage(data);
    },

    // Templates groups
    createTemplateGroup(newGroup: TemplateGroup) {
      const id = crypto.randomUUID();
      data.templateGroups[id] = newGroup;

      setTemplatesStorage(data);
    },

    deleteTemplateGroup(groupId: UUID) {
      const { templateIds } = data.templateGroups[groupId];
      if (templateIds) data.ungroupedTemplates = [...data.ungroupedTemplates, ...templateIds];

      delete data?.templateGroups?.[groupId];
      setTemplatesStorage(data);
    },

    readTemplateGroup(groupId: UUID) {
      return data.templateGroups?.[groupId];
    },

    updateTemplateGroup(groupId: UUID, newGroupData: Partial<TemplateGroup>) {
      data.templateGroups[groupId] = {
        ...data.templateGroups[groupId],
        ...newGroupData,
      };

      setTemplatesStorage(data);
    },

    // Favorites
    createFavorite(templateId: UUID) {
      data.favorites.push(templateId);
      setTemplatesStorage(data);
    },

    deleteFavorite(templateId: UUID) {
      data.favorites.splice(data.favorites.indexOf(templateId), 1);
      setTemplatesStorage(data);
    },

    readIsFavorite(templateId: UUID) {
      return data.favorites?.includes(templateId);
    },

    // Ungrouped Templates
    updateUngroupedTemplates(newUngroupedTemplates: UUID[]) {
      data.ungroupedTemplates = newUngroupedTemplates;
      setTemplatesStorage(data);
    },
  };
};

export const templatesStore = await initTemplatesStore();
