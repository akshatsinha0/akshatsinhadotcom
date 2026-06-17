# syntax=docker/dockerfile:1

# --- Build stage: compile the Angular app with Bun ---
FROM node:24-bookworm-slim AS build
WORKDIR /app
RUN npm install -g bun@latest

# Install deps first for better layer caching (re-runs only when the lockfile changes).
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
# Pull the latest resume from Drive at build time, then build.
RUN bun run sync:resume && bun run build

# --- Serve stage: static files behind nginx ---
FROM nginx:1.27-alpine AS serve
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/portfolio/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
