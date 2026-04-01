# ZoomTranslate — Project Rules for Claude Code

## Stack
- Runtime: Node.js 20 + pnpm 9
- Web: Next.js 15 (App Router) + TypeScript strict
- Extension: Chrome MV3, vanilla JS (no bundler needed for MVP)
- Backend: Supabase (project ref: woqkueabensezxjvlzjr)
- Styling: CSS custom properties (no Tailwind in extension, Tailwind v4 in web)
- Linting: ESLint + Prettier
- Validation: Zod for all env vars and API responses

## Architecture Rules
- Extension and web NEVER share bundled code directly — use postMessage or Supabase Realtime
- All Supabase queries go through `packages/supabase/client.ts`
- Translation adapters must implement `ITranslationAdapter` interface
- Audio never leaves the device — only text is sent to external APIs
- All new tables need RLS policies

## Naming Conventions
- Components: PascalCase
- Utilities/hooks: camelCase
- DB tables: snake_case
- CSS variables: --color-*, --space-*, --text-*

## Commit Format
- feat: new feature
- fix: bug fix
- chore: tooling/config
- docs: documentation
- refactor: code restructure

## Do NOT
- Hardcode API keys
- Use localStorage (blocked in extension sandboxes, use chrome.storage.local)
- Skip RLS policies on new tables
- Use any CSS framework other than specified above
