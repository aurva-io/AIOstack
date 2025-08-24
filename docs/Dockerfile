# ---- Base Node ----
FROM --platform=${BUILDPLATFORM} node:23-alpine AS base
WORKDIR /app
COPY package*.json ./

RUN npm install -g npm@latest && \
    # Remove old version
    npm uninstall -g cross-spawn && \
    npm cache clean --force && \
    # Find and remove any remaining old versions
    find /usr/local/lib/node_modules -name "cross-spawn" -type d -exec rm -rf {} + && \
    # Install new version
    npm install -g cross-spawn@7.0.5 --force && \
    # Configure npm
    npm config set save-exact=true && \
    npm config set legacy-peer-deps=true

# ---- Dependencies ----
FROM --platform=${BUILDPLATFORM} base AS dependencies
RUN npm ci

# ---- Build ----
FROM --platform=${BUILDPLATFORM} dependencies AS build
COPY . .
RUN npm run build

# ---- Production ----
FROM node:23-alpine AS production
RUN npm install -g npm@latest && \
    # Remove old version
    npm uninstall -g cross-spawn && \
    npm cache clean --force && \
    # Find and remove any remaining old versions
    find /usr/local/lib/node_modules -name "cross-spawn" -type d -exec rm -rf {} + && \
    # Install new version
    npm install -g cross-spawn@7.0.5 --force && \
    # Configure npm
    npm config set save-exact=true && \
    npm config set legacy-peer-deps=true
ARG ENV_TAG
ENV NEXT_PUBLIC_DOCKER_TAG=$ENV_TAG
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=build /app/next.config.mjs ./next.config.mjs

# Expose the port the app will run on
EXPOSE 3000

# Start the application after the API is ready
CMD ["npm", "start"]