import type { StoredTemplatesData } from '../types';
import { storage } from 'wxt/storage';

export const templatesStorage =
  storage.defineItem<StoredTemplatesData>('sync:templatesData');

export const saveTemplatesToStorage = (newData: StoredTemplatesData) => {
  templatesStorage.setValue(newData);
};
