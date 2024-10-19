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
  color?: TemplateGroupColors;
  creationTimestamp: Timestamp;
  editTimestamp: Timestamp;
  icon?: string;
  templateIds?: UUID[];
  title: string;
};

export type TemplateGroupColors =
  | 'amber'
  | 'blue'
  | 'cyan'
  | 'fuchsia'
  | 'green'
  | 'indigo'
  | 'lime'
  | 'orange'
  | 'red'
  | 'slate'
  | 'teal'
  | 'violet'
  | 'yellow'
  | 'white';

type Timestamp = number;

export type UUID = `${string}-${string}-${string}-${string}-${string}`;
