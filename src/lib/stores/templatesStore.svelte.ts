import { saveTemplatesToStorage, templatesStorage } from '../utils/storage';
import type { StoredTemplatesData, Template, UUID } from '../types';

const removeItemFromArray = (array: any[] | undefined, itemValue: any) => {
  if (!array) return;
  array.splice(array.indexOf(itemValue), 1);
};

const initTemplatesStore = async () => {
  let isLoading = $state(true);
  let data = $state<StoredTemplatesData>({
    favorites: [],
    templateGroups: {
      default: {
        templatesId: [],
      },
    },
    templates: {},
  });

  const newData = await templatesStorage.getValue();
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

    createTemplate(newTemplate: Template, templateGroupId = 'default') {
      const id = crypto.randomUUID();
      data.templates[id] = newTemplate;
      data.templateGroups?.[templateGroupId].templatesId?.push(id);

      saveTemplatesToStorage(data);
    },

    deleteTemplate(templateId: UUID, templateGroupId = 'default') {
      delete data?.templates?.[templateId];

      removeItemFromArray(
        data?.templateGroups?.[templateGroupId]?.templatesId,
        templateId
      );
    },

    readTemplate(templateId: UUID) {
      return data.templates?.[templateId];
    },

    updateTemplate(templateId: UUID, newTemplateData: Partial<Template>) {
      data.templates[templateId] = {
        ...data.templates[templateId],
        ...newTemplateData,
      };

      saveTemplatesToStorage(data);
    },
  };
};

export const templatesStore = await initTemplatesStore();
