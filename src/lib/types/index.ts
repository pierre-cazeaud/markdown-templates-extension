export type StoredTemplatesData = {
  favorites: UUID[];
  templateGroups: Record<UUID, TemplateGroup>;
  templates: Record<UUID, Template>;
  ungroupedTemplates: UUID[];
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
  color?: string;
  icon?: string;
  templatesId?: UUID[];
  title?: string;
};

export type UUID = `${string}-${string}-${string}-${string}-${string}`;
