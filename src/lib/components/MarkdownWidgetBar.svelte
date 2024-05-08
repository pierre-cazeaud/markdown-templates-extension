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
    StrikethroughIcon,
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

  const handleButtonClick = (element: MarkdownElement) => {
    injectMarkdown(textEditorRef, element);

    // Ensure the content is updated
    textEditorRef.dispatchEvent(new Event('input'));
  };
</script>

<div class="flex flex-wrap gap-1 p-1 border-b">
  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.h1)}
  >
    <Heading1Icon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.h2)}
  >
    <Heading2Icon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.h3)}
  >
    <Heading3Icon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.h4)}
  >
    <Heading4Icon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.h5)}
  >
    <Heading5Icon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.h6)}
  >
    <Heading6Icon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.bold)}
  >
    <BoldIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.italic)}
  >
    <ItalicIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.strikethrough)}
  >
    <StrikethroughIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.link)}
  >
    <LinkIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.quote)}
  >
    <QuoteIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.list)}
  >
    <ListIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.code)}
  >
    <CodeIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.codeMultiline)}
  >
    <BracesIcon size={16} />
  </Button>

  <Button
    colorVariant="secondary"
    onClick={() => handleButtonClick(MarkdownElement.table)}
  >
    <TableIcon size={16} />
  </Button>
</div>
