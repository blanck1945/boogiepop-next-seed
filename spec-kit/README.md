# spec-kit — Boogiepop Next Seed

Índice para agentes. Contrato vinculante: [AGENTS.md](../AGENTS.md).

## Entradas automáticas por herramienta

- **Claude Code** carga [CLAUDE.md](../CLAUDE.md) automáticamente → apunta a AGENTS.md.
- **Cursor** carga [.cursor/rules/seed-contract.mdc](../.cursor/rules/seed-contract.mdc) automáticamente → apunta a AGENTS.md.
- **Otros agentes** leen [AGENTS.md](../AGENTS.md) directamente (fuente de verdad única).

## Orden de lectura

1. [AGENTS.md](../AGENTS.md)
2. [README.md](../README.md)
3. [stack.md](stack.md)
4. [docs/GITLAB-DEPLOY.md](../docs/GITLAB-DEPLOY.md)

## vs react-seed

| | next-seed | react-seed |
|--|-----------|------------|
| Fullstack | Sí | No (solo front MF) |
| Hub | iframe | Module Federation |
