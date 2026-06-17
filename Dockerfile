# syntax=docker/dockerfile:1

# --- Build stage: compile the Angular app with Bun ---
FROM node:24-bookworm-slim AS build
WORKDIR /app
RUN npm install -g bun@latest

# Install deps first for better layer caching (re-runs only when the lockfile changes).
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
# Pull the latest resume from Drive, build, then pre-compress assets (.br/.gz).
RUN bun run sync:resume && bun run build && bun run precompress

# --- Serve stage: static files behind Caddy (precompressed brotli/gzip) ---
FROM caddy:2-alpine AS serve
COPY docker/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist/portfolio/browser /srv
EXPOSE 8080
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
