const CONTENT_INSERTION_MARKER = '[-><-]';

export enum MarkdownElement {
  'bold',
  'code',
  'codeMultiline',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'italic',
  'link',
  'list',
  'quote',
  'strikethrough',
  'table',
}

const replaceSelectedText = (
  textEditorRef: HTMLTextAreaElement,
  replacementText: string
) => {
  const isSelectionCaret =
    textEditorRef.selectionStart === textEditorRef.selectionEnd;
  const beforeSelectionContent = textEditorRef.value.slice(
    0,
    textEditorRef.selectionStart
  );
  const afterSelectionContent = textEditorRef.value.slice(
    textEditorRef.selectionEnd,
    textEditorRef.value.length
  );

  if (isSelectionCaret) {
    const newContent = replacementText.replace(CONTENT_INSERTION_MARKER, '');
    textEditorRef.value = `${beforeSelectionContent}${newContent}${afterSelectionContent}`;
    textEditorRef.focus();
    textEditorRef.selectionEnd =
      `${beforeSelectionContent}${newContent}`.length;
  } else {
    const selectedContent = textEditorRef.value.slice(
      textEditorRef.selectionStart,
      textEditorRef.selectionEnd
    );
    const newContent = replacementText.replace(
      CONTENT_INSERTION_MARKER,
      selectedContent
    );
    textEditorRef.value = `${beforeSelectionContent}${newContent}${afterSelectionContent}`;
    textEditorRef.focus();
    textEditorRef.selectionEnd =
      `${beforeSelectionContent}${newContent}`.length;
  }
};

const injectBold = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(textEditorRef, `**${CONTENT_INSERTION_MARKER}**`);
};

const injectCode = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(textEditorRef, `\`${CONTENT_INSERTION_MARKER}\``);
};

const injectCodeMultiline = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(
    textEditorRef,
    `\n${'```'}\n${CONTENT_INSERTION_MARKER}\n${'```'}\n`
  );
};

const injectH1 = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(textEditorRef, `# ${CONTENT_INSERTION_MARKER}`);
};

const injectH2 = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(textEditorRef, `## ${CONTENT_INSERTION_MARKER}`);
};

const injectH3 = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(textEditorRef, `### ${CONTENT_INSERTION_MARKER}`);
};

const injectH4 = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(textEditorRef, `#### ${CONTENT_INSERTION_MARKER}`);
};

const injectH5 = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(textEditorRef, `##### ${CONTENT_INSERTION_MARKER}`);
};

const injectH6 = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(textEditorRef, `###### ${CONTENT_INSERTION_MARKER}`);
};

const injectItalic = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(textEditorRef, `*${CONTENT_INSERTION_MARKER}*`);
};

const injectLink = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(textEditorRef, `[${CONTENT_INSERTION_MARKER}]()`);
};

const injectList = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(textEditorRef, `\n- ${CONTENT_INSERTION_MARKER}`);
};

const injectQuote = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(textEditorRef, `\n> ${CONTENT_INSERTION_MARKER}`);
};

const injectStrikethrough = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(textEditorRef, `~~${CONTENT_INSERTION_MARKER}~~`);
};

const injectTable = (textEditorRef: HTMLTextAreaElement) => {
  replaceSelectedText(
    textEditorRef,
    `\n| ${CONTENT_INSERTION_MARKER}      | Description |\n| ----------- | ----------- |\n| Header      | Title       |\n| Paragraph   | Text        |\n`
  );
};

const markdownFactory: Record<
  MarkdownElement,
  (textEditorRef: HTMLTextAreaElement) => void
> = {
  [MarkdownElement.bold]: injectBold,
  [MarkdownElement.code]: injectCode,
  [MarkdownElement.codeMultiline]: injectCodeMultiline,
  [MarkdownElement.h1]: injectH1,
  [MarkdownElement.h2]: injectH2,
  [MarkdownElement.h3]: injectH3,
  [MarkdownElement.h4]: injectH4,
  [MarkdownElement.h5]: injectH5,
  [MarkdownElement.h6]: injectH6,
  [MarkdownElement.italic]: injectItalic,
  [MarkdownElement.link]: injectLink,
  [MarkdownElement.list]: injectList,
  [MarkdownElement.quote]: injectQuote,
  [MarkdownElement.strikethrough]: injectStrikethrough,
  [MarkdownElement.table]: injectTable,
};

export const injectMarkdown = (
  textEditorRef: HTMLTextAreaElement,
  type: MarkdownElement
) => {
  return markdownFactory[type](textEditorRef);
};
