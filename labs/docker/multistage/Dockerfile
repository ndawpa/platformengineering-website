FROM alpine:3.22 AS builder
RUN mkdir -p /output && printf '<h1>Build multi-stage concluído</h1>\n' > /output/index.html

FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY --from=builder /output/ /usr/share/nginx/html/
EXPOSE 8080
