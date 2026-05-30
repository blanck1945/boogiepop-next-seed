# Boogiepop Next Seed

Leé [AGENTS.md](AGENTS.md) — ahí está el contrato completo (qué tocar, qué no, convenciones AWS, infra).

## Contexto rápido

- Fullstack **Next.js 15 App Router** — UI + Route Handlers en el mismo repo
- **AWS SDK solo en servidor** — Route Handlers y `lib/`; nunca en `'use client'`
- Node standalone → Docker → ECS puerto **8080**, healthcheck `/health` — contractuales, no cambiar
- UI: `boogiepop-ui` — tokens `--bp-*`, clases `.bp-*`, componentes `Button/Card/Input/Select/Text`
- Auth: `boogiepop-auth-sdk` — `useBoogiepopSession()` (hook React client), `resolveBoogiepopSession()` (server)

## Reglas operativas

- Usá `/plan` para cambios en `next.config.ts`, `Dockerfile` o archivos CI
- No ejecutés `npm run build` ni `git push` sin que el usuario lo pida
- Corré `npm run lint` antes de dar una tarea por terminada
