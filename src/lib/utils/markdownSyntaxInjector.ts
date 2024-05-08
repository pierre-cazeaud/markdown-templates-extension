const SELECTED_CONTENT_MARKER = '0';

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
  'table'
}

const replaceSelectedText = (textEditorRef: HTMLElement, replacementText: string) => {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;

  const selectedElement = selection.focusNode;
  if (selectedElement !== textEditorRef && selectedElement?.parentElement !== textEditorRef) return;

  const range = selection.getRangeAt(0);

  if (selection.type === 'Caret') {
    const selectedContentIndex = replacementText.indexOf(SELECTED_CONTENT_MARKER);
    const newContent = replacementText.replace(SELECTED_CONTENT_MARKER, '');

    const node = document.createTextNode(newContent)
    range.insertNode(node);
    range.setStart(node, selectedContentIndex);
    range.setEnd(node, selectedContentIndex);
  }
  else {
    const oldContent = range.toString();
    const replacedContent = replacementText.replace(SELECTED_CONTENT_MARKER, oldContent);
    const newContent = oldContent.replace(oldContent, replacedContent);

    const selectedContentIndex = newContent.indexOf(oldContent) + oldContent.length;
    const node = document.createTextNode(newContent)
    range.deleteContents();
    range.insertNode(node);
    range.setStart(node, selectedContentIndex);
    range.setEnd(node, selectedContentIndex);
  }

  textEditorRef.focus();
}


const injectBold = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `**${SELECTED_CONTENT_MARKER}**`);
}

const injectCode = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `\`${SELECTED_CONTENT_MARKER}\``);
}

const injectCodeMultiline = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `\n\n${'```'}\n${SELECTED_CONTENT_MARKER}\n${'```'}\n`);
}

const injectH1 = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `# ${SELECTED_CONTENT_MARKER}`);
}

const injectH2 = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `## ${SELECTED_CONTENT_MARKER}`);
}

const injectH3 = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `### ${SELECTED_CONTENT_MARKER}`);
}

const injectH4 = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `#### ${SELECTED_CONTENT_MARKER}`);
}

const injectH5 = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `##### ${SELECTED_CONTENT_MARKER}`);
}

const injectH6 = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `###### ${SELECTED_CONTENT_MARKER}`);
}

const injectItalic = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `*${SELECTED_CONTENT_MARKER}*`);
}

const injectLink = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `[${SELECTED_CONTENT_MARKER}]()*`);
}

const injectList = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `\n- ${SELECTED_CONTENT_MARKER}`);
}

const injectQuote = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `> ${SELECTED_CONTENT_MARKER}`);
}

const injectStrikethrough = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `~~${SELECTED_CONTENT_MARKER}~~`);
}

const injectTable = (textEditorRef: HTMLElement) => {
  replaceSelectedText(textEditorRef, `\n\n| ${SELECTED_CONTENT_MARKER}      | Description |\n| ----------- | ----------- |\n| Header      | Title       |\n| Paragraph   | Text        |\n`);
}

const markdownFactory: Record<MarkdownElement, (textEditorRef: HTMLElement) => void> = {
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
}

export const injectMarkdown = (textEditorRef: HTMLElement, type: MarkdownElement) => {
  return markdownFactory[type](textEditorRef);
}