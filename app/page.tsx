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
        Endpoints en <span className="st-inline-code">app/api/**/route.ts</span> con{' '}
        <span className="st-inline-code">@aws-sdk/client-s3</span> (extensible a más servicios).
      </>
    ),
  },
  {
    title: 'Deploy como react-seed',
    body: 'Docker standalone → ECR → ECS en puerto 8080, health en /health, GitLab CI alineado al remote Vite.',
  },
  {
    title: 'Tailwind + tema Streamlit claro',
    body: 'Tokens IBM Plex y componentes .st-* coherentes con boogiepop-react-seed.',
  },
]

export default function Home() {
  return (
    <div className="min-h-svh bg-st-bg">
      <main className="mx-auto max-w-3xl px-6 py-12 text-left">
        <header className="space-y-4">
          <h1 className="text-[1.75rem] font-semibold text-st-body sm:text-[2rem]">
            Next.js fullstack seed
          </h1>
          <p className="max-w-2xl text-st-muted-text">
            Plantilla para equipos que quieren <strong>React + Node + AWS</strong> en un solo
            proyecto, sin levantar un backend Nest aparte. Desplegable con el mismo flujo CI/CD que{' '}
            <span className="st-inline-code">boogiepop-react-seed</span>.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#demo-aws" className="st-btn-primary">
              Ir a demo AWS
            </a>
            <a
              href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers"
              target="_blank"
              rel="noreferrer"
              className="st-btn-secondary"
            >
              Route Handlers
            </a>
          </div>
        </header>

        <section id="detalle-del-seed" className="mt-12 space-y-6">
          <h2 className="text-xl font-semibold">Qué incluye</h2>
          <ul className="space-y-4">
            {features.map((feature) => (
              <li key={feature.title} className="st-card">
                <h3 className="font-semibold text-st-body">{feature.title}</h3>
                <p className="mt-2 text-st-muted-text">{feature.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <div id="demo-aws" className="mt-12">
          <AwsDemoPanel />
        </div>

        <AuthSdkPanel />

        <section className="mt-12 space-y-3 st-card">
          <h2 className="text-lg font-semibold text-st-body">Variables de entorno</h2>
          <ul className="list-disc space-y-1 pl-5 text-st-muted-text">
            <li>
              <span className="st-inline-code">AWS_REGION</span> — región del SDK (default{' '}
              <span className="st-inline-code">us-east-1</span>)
            </li>
            <li>
              <span className="st-inline-code">AWS_DEMO_S3_BUCKET</span> — bucket opcional para la
              demo de listado
            </li>
            <li>
              <span className="st-inline-code">AWS_DEMO_S3_PREFIX</span> — prefijo acotado dentro del
              bucket
            </li>
            <li>
              <span className="st-inline-code">PORT</span> — puerto en ECS (default{' '}
              <span className="st-inline-code">8080</span>)
            </li>
          </ul>
        </section>
      </main>
    </div>
  )
}
