# Stack — boogiepop-next-seed

- **Runtime:** Node ≥ 22
- **Framework:** Next.js 15 App Router, React 19, TypeScript
- **Estilos:** Tailwind CSS v4 (`@tailwindcss/postcss`)
- **AWS:** `@aws-sdk/client-s3` en Route Handlers
- **Dev:** `npm run dev` (Turbopack) — puerto 3000 por defecto
- **Prod:** `output: 'standalone'` → Docker → `node server.js` en **8080**
- **CI:** GitLab — lint, `next build`, Docker arm64 → ECR, ECS update

Variables: ver [README.md](../README.md) y `.env.example`.
