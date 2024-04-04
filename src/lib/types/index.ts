export type StoredTemplatesData = {
  templateGroups: Record<string, TemplateGroup>;
  templates: Record<UUID, Template>;
  favorites: string[];
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
