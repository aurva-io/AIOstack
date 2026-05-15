FROM --platform=${BUILDPLATFORM} oven/bun:1-alpine AS base
WORKDIR /app
COPY ./package.json ./
COPY ./bun.lock ./

FROM --platform=${BUILDPLATFORM} base AS dependencies
RUN apk add --no-cache python3 make g++ libc6-compat
RUN bun install --frozen-lockfile

FROM --platform=${BUILDPLATFORM} dependencies AS build
COPY ./ .
RUN bun run build

FROM oven/bun:1-alpine AS production
WORKDIR /app

COPY --from=build /app/.output ./.output

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "run", ".output/server/index.mjs"]
