'use client'

import { useBoogiepopSession } from '@boogiepop/auth-sdk/react'
import { hasRole } from '@boogiepop/auth-sdk'

export function AuthSdkPanel() {
  const { snapshot, isHydrating } = useBoogiepopSession({
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  })

  return (
    <section className="mt-12 space-y-3 st-card">
      <h2 className="text-lg font-semibold text-st-body">SDK de sesión Boogiepop</h2>
      <p className="text-st-muted-text">
        Login desacoplado: este seed no autentica usuarios; consume token y resuelve identidad con{' '}
        <span className="st-inline-code">GET /api/auth/me</span>.
      </p>
      <ul className="list-disc space-y-1 pl-5 text-st-muted-text">
        <li>Estado: {isHydrating ? 'hidratando…' : snapshot.source}</li>
        <li>Usuario: {snapshot.user?.email ?? 'sin sesión'}</li>
        <li>Roles: {snapshot.roles.length ? snapshot.roles.join(', ') : 'sin roles'}</li>
        <li>¿Admin?: {hasRole(snapshot, 'admin') ? 'sí' : 'no'}</li>
      </ul>
      {snapshot.error ? <p className="text-sm text-rose-400">{snapshot.error}</p> : null}
    </section>
  )
}
