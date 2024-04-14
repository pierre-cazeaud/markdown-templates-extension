export type StoredTemplatesData = {
  templateGroups: Record<UUID | 'default', TemplateGroup>;
  templates: Record<UUID, Template>;
  favorites: UUID[];
};

export type Template = {
  content: string;
  title: string;
  variables?: {
    key: string;
    value: string;
  }[];
};

export type TemplateGroup = {
  icon?: string;
  templatesId?: UUID[];
  title?: string;
};

export type UUID = `${string}-${string}-${string}-${string}-${string}`;
