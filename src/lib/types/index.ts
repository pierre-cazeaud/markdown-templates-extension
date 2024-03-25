export type StoredTemplatesData = {
  templateGroups?: Record<string, TemplateGroup>;
  templates?: Record<string, Template[]>;
  favorites?: string[];
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
  templatesId?: string[];
  title?: string;
};
