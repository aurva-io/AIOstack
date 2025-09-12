FROM --platform=${BUILDPLATFORM} oven/bun:1-alpine AS base
WORKDIR /app
COPY ./package.json ./
COPY ./bun.lock ./

FROM --platform=${BUILDPLATFORM} base AS dependencies
RUN bun install --frozen-lockfile

FROM --platform=${BUILDPLATFORM} dependencies AS build
COPY ./ .
RUN bun run build

FROM oven/bun:1-alpine AS production
ARG ENV_TAG
ENV NEXT_PUBLIC_DOCKER_TAG=$ENV_TAG
WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./

EXPOSE 3000

CMD ["bun", "start"]