<script lang="ts">
  import {
    BoldIcon,
    BracesIcon,
    CodeIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    Heading4Icon,
    Heading5Icon,
    Heading6Icon,
    ItalicIcon,
    LinkIcon,
    ListIcon,
    QuoteIcon,
    TableIcon,
  } from 'lucide-svelte';
  import Button from './Button.svelte';
  import {
    injectMarkdown,
    MarkdownElement,
  } from '../utils/markdownSyntaxInjector';

  type Props = {
    textEditorRef: HTMLElement;
  };

  let { textEditorRef }: Props = $props();
</script>

<div class="flex flex-wrap gap-1 p-1 border-b">
  <Button
    colorVariant="secondary"
    onClick={() => injectMarkdown(textEditorRef, MarkdownElement.h1)}
  >
    <Heading1Icon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => injectMarkdown(textEditorRef, MarkdownElement.h2)}
  >
    <Heading2Icon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => injectMarkdown(textEditorRef, MarkdownElement.h3)}
  >
    <Heading3Icon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => injectMarkdown(textEditorRef, MarkdownElement.h4)}
  >
    <Heading4Icon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => injectMarkdown(textEditorRef, MarkdownElement.h5)}
  >
    <Heading5Icon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => injectMarkdown(textEditorRef, MarkdownElement.h6)}
  >
    <Heading6Icon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => injectMarkdown(textEditorRef, MarkdownElement.bold)}
  >
    <BoldIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => injectMarkdown(textEditorRef, MarkdownElement.italic)}
  >
    <ItalicIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => injectMarkdown(textEditorRef, MarkdownElement.link)}
  >
    <LinkIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => injectMarkdown(textEditorRef, MarkdownElement.quote)}
  >
    <QuoteIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => injectMarkdown(textEditorRef, MarkdownElement.list)}
  >
    <ListIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => injectMarkdown(textEditorRef, MarkdownElement.code)}
  >
    <CodeIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => injectMarkdown(textEditorRef, MarkdownElement.codeMultiline)}
  >
    <BracesIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => injectMarkdown(textEditorRef, MarkdownElement.table)}
  >
    <TableIcon size={16} />
  </Button>
</div>
