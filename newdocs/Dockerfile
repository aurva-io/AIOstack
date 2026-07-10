FROM node:26-bookworm-slim AS base
WORKDIR /app
RUN apt-get update \
 && apt-get install -y --no-install-recommends python3 make g++ \
 && rm -rf /var/lib/apt/lists/* \
 && npm install -g bun@1
COPY package.json bun.lock ./

FROM base AS dependencies
RUN bun install --frozen-lockfile

FROM dependencies AS build
COPY . .
RUN npm run build

FROM node:26-bookworm-slim AS production
WORKDIR /app
COPY --from=build --chown=node:node /app/.output ./.output

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
ENV NODE_ENV=production

USER node
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
