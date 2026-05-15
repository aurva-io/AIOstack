FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache python3 make g++ libc6-compat \
 && npm install -g bun@1
COPY package.json bun.lock ./

FROM base AS dependencies
RUN bun install --frozen-lockfile

FROM dependencies AS build
COPY . .
RUN npm run build

FROM node:20-alpine AS production
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
