# syntax=docker/dockerfile:1.7

FROM node:22.19-alpine AS build

ENV ASTRO_TELEMETRY_DISABLED=1
WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.30-alpine3.24 AS runtime

LABEL org.opencontainers.image.title="Platform Engineering Brasil" \
      org.opencontainers.image.description="Portal brasileiro sobre Platform Engineering, DevOps, SRE e Cloud" \
      org.opencontainers.image.source="https://github.com/platformengineering-brasil/platformengineering-website"

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=101:101 /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1

USER 101

CMD ["nginx", "-g", "daemon off;"]
