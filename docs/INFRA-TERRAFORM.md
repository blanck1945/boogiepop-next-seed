# Infra Terraform — boogiepop-next-seed

Recursos en [`boogiepop-backend/infra/terraform/`](../../boogiepop-backend/infra/terraform/) (archivos `*_next_seed.tf`).

## Activar en `terraform.tfvars`

```hcl
enable_frontend_ecs  = true
enable_next_seed_ecs = true

# Opcional demo S3 (IAM task role)
# next_seed_demo_s3_bucket = "boogiepop-hub-manifest-653876198281"
# next_seed_demo_s3_prefix = "hub/"
```

Requisito: mismo stack que el hub (ALB compartido), igual que Streamlit.

## Recursos creados

| Recurso | Nombre típico |
|---------|----------------|
| ECR | `boogiepop-next-seed` |
| ECS service | `boogiepop-api-fe-next-seed-svc` |
| Log group | `/ecs/boogiepop-api-next-seed` |
| ALB rule | path `/next/*` (HTTP) o host dedicado (HTTPS) |

## Outputs útiles

```bash
terraform output ecr_next_seed_url
terraform output ecs_next_seed_service_name
terraform output next_seed_http_embed_url
terraform output next_seed_manifest_snippet
```

## GitLab CI (este repo)

Variables alineadas con Terraform:

| Variable GitLab | Valor típico |
|-----------------|--------------|
| `ECR_REGISTRY` | `653876198281.dkr.ecr.us-east-1.amazonaws.com` |
| `NEXT_ECR_REPOSITORY` | `boogiepop-next-seed` |
| `ECS_CLUSTER_NAME` | `boogiepop-api-cluster` |
| `ECS_NEXT_SEED_SERVICE_NAME` | `boogiepop-api-fe-next-seed-svc` |
| `NEXT_BASE_PATH` | `/next` (build Docker modo HTTP) |

## Repo GitLab

Creá el proyecto GitLab y empujá este seed (repo: **https://gitlab.com/boogiepop-phatom/boogiepop-next-seed**):

```bash
cd boogiepop-next-seed
git remote add origin https://gitlab.com/boogiepop-phatom/boogiepop-next-seed.git
git branch -M main
git push -u origin main
```

Si el remoto ya existe, usá `git remote set-url origin https://gitlab.com/boogiepop-phatom/boogiepop-next-seed.git`.

Configuren las variables CI en **Settings → CI/CD → Variables** (mismas credenciales AWS que host/react-seed).

## Orden de deploy

1. `terraform apply` (ECR + ECS service vacío)
2. Push a `main` en GitLab → imagen `:latest` + rollout ECS
3. Verificar `http://ALB/next/health`
4. Añadir entrada manifest → subir S3 → refrescar hub

Ver también [GITLAB-DEPLOY.md](./GITLAB-DEPLOY.md) y [HUB-MANIFEST.md](./HUB-MANIFEST.md).
