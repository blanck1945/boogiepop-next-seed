# Guía para agentes (Boogiepop Next Seed)

Contrato técnico del seed **fullstack Next.js**. Para índice spec-kit: [spec-kit/README.md](spec-kit/README.md).

## Propósito

**Next.js App Router** con **Route Handlers** y **AWS SDK en servidor**, desplegado como contenedor **Node standalone** → **ECR → ECS** (puerto **8080**, `/health`).

No es remote Module Federation. Para MF usar [boogiepop-react-seed](../boogiepop-react-seed).

## Inventario

| Ruta | Rol |
|------|-----|
| [app/page.tsx](app/page.tsx) | Landing + secciones del seed |
| [app/components/AwsDemoPanel.tsx](app/components/AwsDemoPanel.tsx) | Cliente: llama `/api/aws-demo` |
| [app/api/aws-demo/route.ts](app/api/aws-demo/route.ts) | Demo S3 (servidor) |
| [app/health/route.ts](app/health/route.ts) | Probe ALB/ECS |
| [lib/aws/s3-client.ts](lib/aws/s3-client.ts) | Factory `S3Client` |
| [next.config.ts](next.config.ts) | `output: 'standalone'` |
| [Dockerfile](Dockerfile) | Build multi-stage → `node server.js` |
| [.gitlab-ci.yml](.gitlab-ci.yml) | lint → next-build → ECR → ECS |

## Convenciones

1. **AWS solo en servidor** — Route Handlers, Server Actions o `lib/` importado desde ellos. Nunca `@aws-sdk/*` en `'use client'`.
2. **Dependencias pinned** — sin `^`/`~` en `package.json`; commitear lockfile.
3. **Puerto 8080** en Docker/ECS; no cambiar sin alinear task definition y ALB.
4. **Manifest hub** — solo lectura/sugerencia; no editar ni subir S3 salvo pedido explícito del usuario.

## Modificable sin drama

- [app/page.tsx](app/page.tsx), [app/components/](app/components/)
- Nuevos `app/api/**/route.ts` y `lib/`
- [app/globals.css](app/globals.css) (tema `.st-*`)

## Tocar con cautela

- [next.config.ts](next.config.ts), [Dockerfile](Dockerfile), [.gitlab-ci.yml](.gitlab-ci.yml)
- [package.json](package.json) / lockfile

## Checklist PR

- [ ] `npm run lint` y `npm run build` OK
- [ ] Sin secretos AWS en cliente ni en commits
- [ ] Si cambia puerto/health → actualizar Dockerfile + ECS sample + docs
