FROM caddy:2.11.0-beta.1-alpine
LABEL maintainer="Dave Williams <dave@dave.io>"
COPY Caddyfile /etc/caddy/Caddyfile
COPY public/ /srv/
RUN adduser -D -g 'Caddy' caddy && \
    chown -R caddy /srv && \
    chmod 755 /srv
USER caddy
WORKDIR /srv
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD curl -f http://localhost:8000/ || exit 1
EXPOSE 8000
