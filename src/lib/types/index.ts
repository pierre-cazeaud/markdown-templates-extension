export type StoredTemplatesData = {
  orderedTemplateList: {
    id: UUID
    type: 'template' | 'templateGroup';
  }[];
  templateGroups: Record<UUID, TemplateGroup>;
  templates: Record<UUID, Template>;
};

export type Template = {
  content: string;
  title: string;
};

export type TemplateGroup = {
  color?: string;
  icon?: string;
  templateIds?: UUID[];
  title: string;
};

export type UUID = `${string}-${string}-${string}-${string}-${string}`;
