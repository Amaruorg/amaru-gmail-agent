These files were replaced by direct usage in the `api/openrouter` route (OpenRouter + AI SDK).

**TODO**
- Refactor `api/openrouter` to use a shared singleton client defined in `ai/service.ts`.
- Refactor `getEmailsSummary()` from `ai/actions.ts` into `ai/client.ts`.

Kept temporarily for future reference.