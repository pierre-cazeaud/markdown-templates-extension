# Markdown Templates

Browser extension (Chrome MV3 + Firefox) for writing, organizing, copying, and pasting Markdown templates. [Chrome Web Store](https://chromewebstore.google.com/detail/markdown-templates/kegciajfmipmaooiooimicmgipnfpien) · [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/markdown-templates/)

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Dev server (Chrome) |
| `npm run dev:firefox` | Dev server (Firefox) |
| `npm run build` | Production build |
| `npm run zip` | Package for stores |
| `npm run check` | Type-check (svelte-check) |

## Stack

WXT 0.20 · Svelte 5 (runes) · Tailwind CSS 3.4 · TypeScript 6 · Lucide icons · markdown-it · SortableJS

## Architecture

Two entrypoints — `popup` (browser action) and `options` (full tab, opened via `browser.runtime.openOptionsPage()`). No background script.

SPA routing via `appStore.activeRoute` → `ROUTES_COMPONENT` lookup (no router library). Three singleton stores at module scope:

- **`appStore`** — routing, page props, app origin
- **`iconsStore`** — Lucide icon registry (34 icons)
- **`templatesStore`** — all CRUD + storage persistence (async init)

Storage at `src/lib/utils/storage.ts`: `browser.storage.sync` with manual `JSON.stringify`/`JSON.parse`. The WXT `storage.defineItem` helper has a bug (saves arrays as objects) and must not be used.

### Conventions

Arrange imports, interfaces, exports, CSS class lists, and switch-case branches **alphabetically** unless a logical grouping is more readable.

## Data model

```
sync:templatesData (JSON)
├── orderedTemplateList: { id: UUID, type: "template" | "templateGroup" }[]
├── templates: Record<UUID, { title, content, creationTimestamp, editTimestamp }>
└── templateGroups: Record<UUID, { title, color?, icon?, templateIds?, creationTimestamp, editTimestamp }>
```

All CRUD methods on `templatesStore` auto-set `creationTimestamp` and `editTimestamp`. Deleting a group reassigns its `templateIds` back to the ungrouped list.

## Key gotchas

- **Tailwind dynamic classes**: `bg-${color}-100` etc. won't tree-shake without entries in `tailwind.config.js` safelist. Always update both `COLOR_PICKER_LIST` (`src/lib/constants/`) and `tailwind.config.js` when adding/changing a color.
- **Contenteditable editor**: The markdown editor uses `<div contenteditable>` (not `<textarea>`). Custom paste handling strips rich text to plain Markdown. The `Enter` key is blocked in the title field. The widget bar (`MarkdownWidgetBar.svelte`) manipulates `window.getSelection()` ranges — this pattern must be preserved.
- **WXT storage bug**: `storage.defineItem` serializes arrays as `{0: 'one', 1: 'two'}` on save. The manual JSON approach in `src/lib/utils/storage.ts` works around this.
- **Lucide icons**: Adding/changing icons requires updating both `iconsStore` and the corresponding Lucide import.
- **No tests**: No test runner exists. The TDD skill under `.agents/skills/` can scaffold one when needed.

## Available skills

`codebase-design` · `decision-mapping` · `diagnosing-bugs` · `grill-me` · `grill-with-docs` · `grilling` · `handoff` · `implement` · `improve-codebase-architecture` · `obsidian-vault` · `qa` · `request-refactor-plan` · `resolving-merge-conflicts` · `review` · `tdd`
