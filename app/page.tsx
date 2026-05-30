import { AwsDemoPanel } from './components/AwsDemoPanel'
import { AuthSdkPanel } from './components/AuthSdkPanel'

const features = [
  {
    title: 'Next.js App Router',
    body: 'UI React y API en el mismo repositorio. Un solo npm run dev para desarrollo local.',
  },
  {
    title: 'Route Handlers + AWS SDK',
    body: (
      <>
        Endpoints en <span className="bp-inline-code">app/api/**/route.ts</span> con{' '}
        <span className="bp-inline-code">@aws-sdk/client-s3</span> (extensible a más servicios).
      </>
    ),
  },
  {
    title: 'Deploy como react-seed',
    body: 'Docker standalone → ECR → ECS en puerto 8080, health en /health, GitLab CI alineado al remote Vite.',
  },
  {
    title: 'boogiepop-ui',
    body: 'Tokens --bp-* y componentes Button, Card, Input, Select, Text coherentes con boogiepop-react-seed.',
  },
]

export default function Home() {
  return (
    <div className="min-h-svh bg-bp-bg">
      <main className="mx-auto max-w-3xl px-6 py-12 text-left">
        <header className="space-y-4">
          <h1 className="text-[1.75rem] font-semibold text-bp-body sm:text-[2rem]">
            Next.js fullstack seed
          </h1>
          <p className="max-w-2xl text-bp-muted">
            Plantilla para equipos que quieren <strong>React + Node + AWS</strong> en un solo
            proyecto, sin levantar un backend Nest aparte. Desplegable con el mismo flujo CI/CD que{' '}
            <span className="bp-inline-code">boogiepop-react-seed</span>.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#demo-aws" className="bp-btn-primary">
              Ir a demo AWS
            </a>
            <a
              href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers"
              target="_blank"
              rel="noreferrer"
              className="bp-btn-secondary"
            >
              Route Handlers
            </a>
          </div>
        </header>

        <section id="detalle-del-seed" className="mt-12 space-y-6">
          <h2 className="text-xl font-semibold">Qué incluye</h2>
          <ul className="space-y-4">
            {features.map((feature) => (
              <li key={feature.title} className="bp-card">
                <h3 className="font-semibold text-bp-body">{feature.title}</h3>
                <p className="mt-2 text-bp-muted">{feature.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <div id="demo-aws" className="mt-12">
          <AwsDemoPanel />
        </div>

        <AuthSdkPanel />

        <section className="mt-12 space-y-3 bp-card">
          <h2 className="text-lg font-semibold text-bp-body">Variables de entorno</h2>
          <ul className="list-disc space-y-1 pl-5 text-bp-muted">
            <li>
              <span className="bp-inline-code">AWS_REGION</span> — región del SDK (default{' '}
              <span className="bp-inline-code">us-east-1</span>)
            </li>
            <li>
              <span className="bp-inline-code">AWS_DEMO_S3_BUCKET</span> — bucket opcional para la
              demo de listado
            </li>
            <li>
              <span className="bp-inline-code">AWS_DEMO_S3_PREFIX</span> — prefijo acotado dentro del
              bucket
            </li>
            <li>
              <span className="bp-inline-code">PORT</span> — puerto en ECS (default{' '}
              <span className="bp-inline-code">8080</span>)
            </li>
          </ul>
        </section>
      </main>
    </div>
  )
}
