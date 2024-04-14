import { getTemplatesStorage, setTemplatesStorage } from '../utils/storage';
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
    createTemplate(newTemplate: Template, templateGroupId: UUID | 'default' = 'default') {
      const id = crypto.randomUUID();
      data.templates[id] = newTemplate;
      data.templateGroups?.[templateGroupId].templatesId?.push(id);

      setTemplatesStorage(data);
    },

    deleteTemplate(templateId: UUID, templateGroupId: UUID | 'default' = 'default') {
      delete data?.templates?.[templateId];

      removeItemFromArray(
        data?.templateGroups?.[templateGroupId]?.templatesId,
        templateId
      );

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
  };
};

export const templatesStore = await initTemplatesStore();
