export type StoredTemplatesData = {
  orderedTemplateList: {
    id: UUID;
    type: 'template' | 'templateGroup';
  }[];
  templateGroups: Record<UUID, TemplateGroup>;
  templates: Record<UUID, Template>;
};

export type Template = {
  content: string;
  creationTimestamp: Timestamp;
  editTimestamp: Timestamp;
  title: string;
};

export type TemplateGroup = {
  color?: string;
  creationTimestamp: Timestamp;
  editTimestamp: Timestamp;
  icon?: string;
  templateIds?: UUID[];
  title: string;
};

type Timestamp = number;

export type UUID = `${string}-${string}-${string}-${string}-${string}`;
