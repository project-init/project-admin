# syntax=docker/dockerfile:1.6

FROM oven/bun:1 AS base
WORKDIR /app

# Only copy files needed to install deps (better cache)
COPY bun.lock package.json bunfig.toml ./

RUN --mount=type=secret,id=GITHUB_TOKEN \
    set -eu; \
    export GITHUB_TOKEN="$(cat /run/secrets/GITHUB_TOKEN)"; \
    bun install --frozen-lockfile

FROM base as local

ARG VERSION
ENV VERSION=${VERSION}

FROM oven/bun:1 AS build
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules

COPY src /app/src
COPY public /app/public
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json

RUN bun run build

########################
# prod (runtime)
########################
FROM oven/bun:1-slim AS final
WORKDIR /app
ARG VERSION
ENV VERSION=${VERSION}
ENV NODE_ENV=production
USER bun

COPY --from=build /app/dist/server ./server
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["./server"]