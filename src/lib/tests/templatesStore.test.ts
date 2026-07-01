import { vi } from 'vitest';

const { mockStorage, resetUuidCounter, mockRandomUUID } = vi.hoisted(() => {
  const store: Record<string, string> = {};
  let counter = 0;

  return {
    mockStorage: {
      get: vi.fn(async (key: string) => ({
        [key]: store[key] ?? null,
      })),
      set: vi.fn(async (items: Record<string, string>) => {
        Object.assign(store, items);
      }),
      clear: () => {
        Object.keys(store).forEach((k) => delete store[k]);
      },
      getStore: (): Record<string, string> => store,
      setStore: (data: Record<string, string>) => {
        Object.assign(store, data);
      },
    },
    resetUuidCounter: () => {
      counter = 0;
    },
    mockRandomUUID: vi.fn(() => {
      counter++;
      return `00000000-0000-0000-0000-${String(counter).padStart(12, '0')}`;
    }),
  };
});

vi.mock('webextension-polyfill', () => ({
  default: {
    storage: {
      sync: {
        get: mockStorage.get,
        set: mockStorage.set,
      },
    },
  },
}));

import { describe, it, expect, beforeEach } from 'vitest';
import { initTemplatesStore } from '../stores/templatesStore.svelte';
import type { StoredTemplatesData, UUID } from '../types';

const TIMESTAMP = new Date('2025-01-01T00:00:00Z').getTime();

describe('templatesStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01T00:00:00Z'));
    vi.spyOn(crypto, 'randomUUID').mockImplementation(
      mockRandomUUID as () => UUID
    );
    resetUuidCounter();
    mockStorage.clear();
  });

  describe('initialization', () => {
    it('initializes with empty data when storage is empty', async () => {
      const store = await initTemplatesStore();

      expect(store.data).toEqual({
        orderedTemplateList: [],
        templateGroups: {},
        templates: {},
      });
      expect(store.isLoading).toBe(false);
    });

    it('loads existing data from storage', async () => {
      const existingData: StoredTemplatesData = {
        orderedTemplateList: [
          { id: '00000000-0000-0000-0000-000000000001', type: 'template' },
        ],
        templates: {
          '00000000-0000-0000-0000-000000000001': {
            title: 'Existing',
            content: 'Loaded from storage',
            creationTimestamp: 1000,
            editTimestamp: 2000,
          },
        },
        templateGroups: {},
      };
      mockStorage.getStore()['templatesData'] = JSON.stringify(existingData);

      const store = await initTemplatesStore();

      expect(store.data).toEqual(existingData);
    });
  });

  describe('createTemplate', () => {
    it('creates a template with auto-generated ID and timestamps', async () => {
      const store = await initTemplatesStore();
      store.createTemplate({ title: 'Test', content: 'Hello' });

      const templateId = '00000000-0000-0000-0000-000000000001';
      expect(store.data.templates[templateId]).toEqual({
        title: 'Test',
        content: 'Hello',
        creationTimestamp: TIMESTAMP,
        editTimestamp: TIMESTAMP,
      });
    });

    it('appends to orderedTemplateList', async () => {
      const store = await initTemplatesStore();
      store.createTemplate({ title: 'A', content: 'A' });

      expect(store.data.orderedTemplateList).toEqual([
        { id: '00000000-0000-0000-0000-000000000001', type: 'template' },
      ]);
    });

    it('adds template to group when templateGroupId is provided', async () => {
      const store = await initTemplatesStore();
      store.createTemplateGroup({ title: 'Group', templateIds: [] });
      const groupId = '00000000-0000-0000-0000-000000000001';

      store.createTemplate({ title: 'Test', content: 'Content' }, groupId);
      const templateId = '00000000-0000-0000-0000-000000000002';

      expect(
        store.data.templateGroups[groupId].templateIds
      ).toContain(templateId);
    });

    it('persists to storage', async () => {
      const store = await initTemplatesStore();
      store.createTemplate({ title: 'Test', content: 'Content' });

      const raw = mockStorage.getStore()['templatesData'];
      const saved = JSON.parse(raw);
      expect(saved.templates).toEqual(store.data.templates);
    });
  });

  describe('readTemplate', () => {
    it('returns a template by ID', async () => {
      const store = await initTemplatesStore();
      store.createTemplate({ title: 'Test', content: 'Hello' });

      const template = store.readTemplate(
        '00000000-0000-0000-0000-000000000001'
      );

      expect(template).toEqual({
        title: 'Test',
        content: 'Hello',
        creationTimestamp: TIMESTAMP,
        editTimestamp: TIMESTAMP,
      });
    });

    it('returns undefined for non-existent ID', async () => {
      const store = await initTemplatesStore();
      expect(
        store.readTemplate('00000000-0000-0000-0000-000000000001')
      ).toBeUndefined();
    });
  });

  describe('updateTemplate', () => {
    it('updates fields and bumps editTimestamp', async () => {
      const store = await initTemplatesStore();
      store.createTemplate({ title: 'Original', content: 'Original' });
      const id = '00000000-0000-0000-0000-000000000001';

      vi.setSystemTime(new Date('2025-06-01T00:00:00Z'));
      store.updateTemplate(id, { title: 'Updated' });

      expect(store.data.templates[id]?.title).toBe('Updated');
      expect(store.data.templates[id]?.content).toBe('Original');
      expect(store.data.templates[id]?.creationTimestamp).toBe(TIMESTAMP);
      expect(store.data.templates[id]?.editTimestamp).toBe(
        new Date('2025-06-01T00:00:00Z').getTime()
      );
    });

    it('persists to storage', async () => {
      const store = await initTemplatesStore();
      store.createTemplate({ title: 'T', content: 'C' });
      const id = '00000000-0000-0000-0000-000000000001';

      store.updateTemplate(id, { title: 'New' });

      const raw = mockStorage.getStore()['templatesData'];
      const saved = JSON.parse(raw);
      expect(saved.templates[id].title).toBe('New');
    });
  });

  describe('deleteTemplate', () => {
    it('removes template from templates and orderedTemplateList', async () => {
      const store = await initTemplatesStore();
      store.createTemplate({ title: 'Test', content: 'Hello' });
      const id = '00000000-0000-0000-0000-000000000001';
      expect(store.data.templates[id]).toBeDefined();

      store.deleteTemplate(id);

      expect(store.data.templates[id]).toBeUndefined();
      expect(store.data.orderedTemplateList).toHaveLength(0);
    });

    it('removes template from group templateIds', async () => {
      const store = await initTemplatesStore();
      store.createTemplateGroup({ title: 'Group', templateIds: [] });
      const groupId = '00000000-0000-0000-0000-000000000001';
      store.createTemplate({ title: 'T', content: 'C' }, groupId);
      const templateId = '00000000-0000-0000-0000-000000000002';

      store.deleteTemplate(templateId);

      expect(
        store.data.templateGroups[groupId].templateIds
      ).not.toContain(templateId);
    });

    it('persists to storage', async () => {
      const store = await initTemplatesStore();
      store.createTemplate({ title: 'T', content: 'C' });
      const id = '00000000-0000-0000-0000-000000000001';

      store.deleteTemplate(id);

      const raw = mockStorage.getStore()['templatesData'];
      const saved = JSON.parse(raw);
      expect(saved.templates[id]).toBeUndefined();
    });
  });

  describe('createTemplateGroup', () => {
    it('creates a group with auto-generated ID and timestamps', async () => {
      const store = await initTemplatesStore();
      store.createTemplateGroup({ title: 'Group', color: 'blue' });

      const groupId = '00000000-0000-0000-0000-000000000001';
      expect(store.data.templateGroups[groupId]).toEqual({
        title: 'Group',
        color: 'blue',
        creationTimestamp: TIMESTAMP,
        editTimestamp: TIMESTAMP,
      });
    });

    it('appends to orderedTemplateList', async () => {
      const store = await initTemplatesStore();
      store.createTemplateGroup({ title: 'Group' });

      expect(store.data.orderedTemplateList).toEqual([
        { id: '00000000-0000-0000-0000-000000000001', type: 'templateGroup' },
      ]);
    });

    it('persists to storage', async () => {
      const store = await initTemplatesStore();
      store.createTemplateGroup({ title: 'Group' });

      const raw = mockStorage.getStore()['templatesData'];
      const saved = JSON.parse(raw);
      expect(saved.templateGroups).toEqual(store.data.templateGroups);
    });
  });

  describe('readTemplateGroup', () => {
    it('returns a group by ID', async () => {
      const store = await initTemplatesStore();
      store.createTemplateGroup({ title: 'Group' });

      const group = store.readTemplateGroup(
        '00000000-0000-0000-0000-000000000001'
      );

      expect(group?.title).toBe('Group');
    });

    it('returns undefined for non-existent ID', async () => {
      const store = await initTemplatesStore();
      expect(
        store.readTemplateGroup('00000000-0000-0000-0000-000000000001')
      ).toBeUndefined();
    });
  });

  describe('updateTemplateGroup', () => {
    it('updates fields and bumps editTimestamp', async () => {
      const store = await initTemplatesStore();
      store.createTemplateGroup({ title: 'Original' });
      const id = '00000000-0000-0000-0000-000000000001';

      vi.setSystemTime(new Date('2025-06-01T00:00:00Z'));
      store.updateTemplateGroup(id, { title: 'Updated', color: 'red' });

      expect(store.data.templateGroups[id]?.title).toBe('Updated');
      expect(store.data.templateGroups[id]?.color).toBe('red');
      expect(store.data.templateGroups[id]?.creationTimestamp).toBe(TIMESTAMP);
      expect(store.data.templateGroups[id]?.editTimestamp).toBe(
        new Date('2025-06-01T00:00:00Z').getTime()
      );
    });
  });

  describe('deleteTemplateGroup', () => {
    it('removes group and reassigns members to ungrouped', async () => {
      const store = await initTemplatesStore();
      store.createTemplateGroup({ title: 'Group', templateIds: [] });
      const groupId = '00000000-0000-0000-0000-000000000001';
      store.createTemplate({ title: 'T1', content: 'C1' }, groupId);
      const t1Id = '00000000-0000-0000-0000-000000000002';
      store.createTemplate({ title: 'T2', content: 'C2' }, groupId);
      const t2Id = '00000000-0000-0000-0000-000000000003';

      store.deleteTemplateGroup(groupId);

      expect(store.data.templateGroups[groupId]).toBeUndefined();
      expect(store.data.orderedTemplateList).toContainEqual({
        id: t1Id,
        type: 'template',
      });
      expect(store.data.orderedTemplateList).toContainEqual({
        id: t2Id,
        type: 'template',
      });
      expect(store.data.orderedTemplateList).not.toContainEqual({
        id: groupId,
        type: 'templateGroup',
      });
    });

    it('persists to storage', async () => {
      const store = await initTemplatesStore();
      store.createTemplateGroup({ title: 'Group' });
      const groupId = '00000000-0000-0000-0000-000000000001';

      store.deleteTemplateGroup(groupId);

      const raw = mockStorage.getStore()['templatesData'];
      const saved = JSON.parse(raw);
      expect(saved.templateGroups[groupId]).toBeUndefined();
    });
  });

  describe('ordered template list', () => {
    it('deleteOrderedTemplateItem removes item by ID', async () => {
      const store = await initTemplatesStore();
      store.createTemplate({ title: 'A', content: 'A' });
      const id = '00000000-0000-0000-0000-000000000001';
      expect(store.data.orderedTemplateList).toHaveLength(1);

      store.deleteOrderedTemplateItem(id);

      expect(store.data.orderedTemplateList).toHaveLength(0);
    });

    it('getUngroupedTemplates returns all template IDs from orderedTemplateList', async () => {
      const store = await initTemplatesStore();
      store.createTemplate({ title: 'Ungrouped', content: 'U' });
      store.createTemplateGroup({ title: 'Group', templateIds: [] });
      store.createTemplate({ title: 'Grouped', content: 'G' }, '00000000-0000-0000-0000-000000000002');

      const ungrouped = store.getUngroupedTemplates();

      expect(ungrouped).toEqual([
        '00000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000003',
      ]);
    });

    it('updateOrderedTemplateList replaces the list and persists', async () => {
      const store = await initTemplatesStore();
      store.createTemplate({ title: 'A', content: 'A' });
      store.createTemplate({ title: 'B', content: 'B' });
      const id1 = '00000000-0000-0000-0000-000000000001';
      const id2 = '00000000-0000-0000-0000-000000000002';

      store.updateOrderedTemplateList([
        { id: id2, type: 'template' },
        { id: id1, type: 'template' },
      ]);

      expect(store.data.orderedTemplateList).toEqual([
        { id: id2, type: 'template' },
        { id: id1, type: 'template' },
      ]);
      const raw = mockStorage.getStore()['templatesData'];
      const saved = JSON.parse(raw);
      expect(saved.orderedTemplateList).toEqual([
        { id: id2, type: 'template' },
        { id: id1, type: 'template' },
      ]);
    });
  });
});
