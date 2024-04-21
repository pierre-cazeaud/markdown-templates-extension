import type { StoredTemplatesData } from '../types';
import browser from 'webextension-polyfill';

// Commented out because causing an issue when saving an array.
// Array becomes an object with key/value using array index and array value at index.
// ['one', 'two'] --> {0: 'one', 1: 'two'}

// import { storage } from 'wxt/storage';

// export const templatesStorage =
//   storage.defineItem<StoredTemplatesData>('sync:templatesData');

//   export const saveTemplatesToStorage = (newData: StoredTemplatesData) => {
//     templatesStorage.setValue(newData);
//   };

const STORAGE_KEY = 'templatesData';

export const getTemplatesStorage = async (): Promise<
  StoredTemplatesData | undefined
> => {
  try {
    const data = await browser.storage.sync.get(STORAGE_KEY);
    if (data?.[STORAGE_KEY]) return JSON.parse(data?.[STORAGE_KEY]);
  } catch (error) {
    console.error(
      'An error occured while getting templates using the storage API'
    );
    console.error(error);
  }
};

export const setTemplatesStorage = async (data: StoredTemplatesData) => {
  try {
    return await browser.storage.sync.set({
      [STORAGE_KEY]: JSON.stringify(data),
    });
  } catch (error) {
    console.error(
      'An error occured while setting templates using the storage API'
    );
    console.error(error);
  }
};
