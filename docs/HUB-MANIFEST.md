# Hub manifest — entrada para boogiepop-next-seed

**No editar** [`boogiepop-host/manifest/hub-apps-manifest.aws.json`](../../boogiepop-host/manifest/hub-apps-manifest.aws.json) desde este seed salvo pedido explícito. Copiá el fragmento a mano y subí con el script del host.

## 1. Obtener `iframeUrl` desde Terraform

Tras `terraform apply` con `enable_next_seed_ecs = true`:

```bash
cd boogiepop-backend/infra/terraform
terraform output next_seed_http_embed_url
# ej. http://boogiepop-api-alb-....elb.amazonaws.com/next/?embed=true

terraform output -json next_seed_manifest_snippet
```

## 2. Fragmento para `apps[]`

Modo HTTP (ALB path `/next/`):

```json
{
  "id": "next-seed",
  "title": "Next.js fullstack seed",
  "subtitle": "React + API + AWS SDK en un repo (iframe).",
  "kind": "next",
  "iframeUrl": "http://TU-ALB/next/?embed=true",
  "accent": "indigo"
}
```

Reemplazá `iframeUrl` por el output `next_seed_http_embed_url` (sin inventar la URL).

## 3. Subir manifest a S3

Desde el repo **boogiepop-host** (con la entrada ya mergeada en el JSON local):

```powershell
.\scripts\upload-hub-manifest-aws.ps1
```

O el comando del output `hub_manifest_upload_hint`.

## 4. Host

El hub reconoce `kind: "next"` igual que Streamlit: ruta **`/hub/app/next-seed`** (id del manifest).

Cambios en host: [`fetchHubManifest.ts`](../../boogiepop-host/src/features/registry/fetchHubManifest.ts) acepta `kind: "next"`.
