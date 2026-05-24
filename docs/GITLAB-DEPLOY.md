# GitLab CI/CD — Next seed (`boogiepop-next-seed`)

Basado en **[boogiepop-react-seed](../boogiepop-react-seed/.gitlab-ci.yml)** y **[docs/GITLAB-DEPLOY.md](../boogiepop-react-seed/docs/GITLAB-DEPLOY.md)** del remote Vite.

## Diferencia clave vs react-seed

| | react-seed | next-seed |
|--|------------|-----------|
| Artefacto | nginx + estáticos | **Node** (`next start` / `server.js` standalone) |
| Build CI | `dist/` | `.next/` |
| ECR repo default | `boogiepop-remote` | `boogiepop-next-seed` |
| ECS service default | `boogiepop-api-fe-remote-svc` | `boogiepop-api-fe-next-seed-svc` |

Mismo puerto **8080** y health **`/health`** para ALB/ECS.

## Flujo por rama

| Momento | Pipeline | Deploy |
|---------|----------|--------|
| **MR → `main`** | `lint` + `next-build` | — |
| **Merge → `main`** | + `docker-publish-next-prod` + `deploy-next-ecs-prod` | **Automático** |
| **Push `develop`** | + jobs **manual** | Staging (`:develop`) |

## Variables GitLab

Mismas credenciales AWS que host/react-seed:

| Variable | Uso |
|----------|-----|
| **`ECR_REGISTRY`** | `653876198281.dkr.ecr.us-east-1.amazonaws.com` |
| **`AWS_ACCESS_KEY_ID`** / **`AWS_SECRET_ACCESS_KEY`** | ECR + ECS |
| **`ECS_CLUSTER_NAME`** | Default: `boogiepop-api-cluster` |
| **`ECS_NEXT_SEED_SERVICE_NAME`** | Default: `boogiepop-api-fe-next-seed-svc` |
| **`NEXT_ECR_REPOSITORY`** | Default: `boogiepop-next-seed` |

## Infra previa

1. Crear repositorio ECR **`boogiepop-next-seed`** (o override `NEXT_ECR_REPOSITORY`).
2. Crear servicio ECS **`boogiepop-api-fe-next-seed-svc`** con task role IAM para AWS demo.
3. Regla ALB/path o subdominio hacia el target group del servicio.
4. (Opcional) Entrada **`iframeUrl`** en manifest del hub.

Plantilla task: [`ecs/task-definition.sample.json`](../ecs/task-definition.sample.json).
