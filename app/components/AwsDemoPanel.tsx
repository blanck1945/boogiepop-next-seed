'use client'

import { useState } from 'react'

type DemoResponse = {
  ok: boolean
  mode: 'stub' | 's3'
  message?: string
  region?: string
  bucket?: string
  prefix?: string
  keyCount?: number
  keys?: string[]
  error?: string
}

export function AwsDemoPanel() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DemoResponse | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  async function runDemo() {
    setLoading(true)
    setFetchError(null)

    try {
      const response = await fetch('api/aws-demo')
      const data = (await response.json()) as DemoResponse
      setResult(data)
    } catch (error) {
      setResult(null)
      setFetchError(
        error instanceof Error ? error.message : 'No se pudo llamar a /api/aws-demo',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="st-card space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-st-body">Demo AWS (servidor)</h2>
        <p className="max-w-2xl text-st-muted-text">
          Este botón llama a{' '}
          <span className="st-inline-code">GET /api/aws-demo</span> en el mismo proceso Node.
          Las credenciales AWS viven en el servidor (env local o task role IAM en ECS), no en el
          navegador.
        </p>
      </div>

      <button type="button" className="st-btn-primary" disabled={loading} onClick={runDemo}>
        {loading ? 'Consultando…' : 'Probar conexión AWS'}
      </button>

      {fetchError ? (
        <pre className="overflow-x-auto rounded-md bg-st-muted-bg p-3 text-sm text-st-body">
          {fetchError}
        </pre>
      ) : null}

      {result ? (
        <pre className="overflow-x-auto rounded-md bg-st-muted-bg p-3 text-sm text-st-body">
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : null}
    </section>
  )
}
