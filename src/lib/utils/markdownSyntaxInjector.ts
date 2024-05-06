const REPLACE_MARKER = '0';

export enum MarkdownElement {
  'bold',
  'code',
  'codeMultiline',
  'italic',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'link',
  'list',
  'quote',
  'table'
}

const replaceSelectedText = (textEditorRef: HTMLElement, replacementText: string) => {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;

  const selectedElement = selection.focusNode;
  if (selectedElement !== textEditorRef && selectedElement?.parentElement !== textEditorRef) return;

  const range = selection.getRangeAt(0);

  if (selection.type === 'Caret') {
    const replaceMarkerIndex = replacementText.indexOf(REPLACE_MARKER);
    const newContent = replacementText.replace(REPLACE_MARKER, '');

    const node = document.createTextNode(newContent)
    range.insertNode(node);
    range.setStart(node, replaceMarkerIndex);
    range.setEnd(node, replaceMarkerIndex);
    textEditorRef.focus();
  }
  else {
    const oldContent = range.toString();
    const replacedContent = replacementText.replace(REPLACE_MARKER, oldContent);
    const newContent = oldContent.replace(oldContent, replacedContent);
    range.deleteContents();
    range.insertNode(document.createTextNode(newContent));
  }
}


const injectBold = (textEditorRef: HTMLElement) => {
  const boldString = `**${REPLACE_MARKER}**`;
  const selection = window.getSelection();
  // const selectedElement = selection.focusNode;
  // if (selectedElement?.parentElement !== textEditorRef) return;
  if (selection) replaceSelectedText(textEditorRef, boldString);
}

const markdownFactory: Record<MarkdownElement, (textEditorRef: HTMLElement) => void> = {
  [MarkdownElement.bold]: injectBold
}

export const injectMarkdown = (textEditorRef: HTMLElement, type: MarkdownElement) => {
  return markdownFactory[type](textEditorRef);
}