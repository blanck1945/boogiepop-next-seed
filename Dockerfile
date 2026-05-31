# syntax=docker/dockerfile:1
# Build context: parent directory (CI) or repo root with --build-context flags
# CI workflow checks out sibling deps alongside this repo so file: paths resolve.

ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /workspace

# Copy sibling packages (available when build context is parent dir in CI)
COPY boogiepop-auth-sdk/ ./boogiepop-auth-sdk/
COPY boogiepop-ui/       ./boogiepop-ui/

WORKDIR /workspace/app
COPY boogiepop-next-seed/package.json boogiepop-next-seed/package-lock.json ./
RUN npm ci

FROM deps AS builder
WORKDIR /workspace/app
COPY boogiepop-next-seed/ .
ENV NEXT_TELEMETRY_DISABLED=1

ARG NEXT_BASE_PATH=
ENV NEXT_BASE_PATH=${NEXT_BASE_PATH}

RUN npm run build

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache wget \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /workspace/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /workspace/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /workspace/app/.next/static ./.next/static

USER nextjs
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1:8080/health || exit 1

CMD ["node", "server.js"]
