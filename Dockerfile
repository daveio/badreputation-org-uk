FROM golang:1.15.6-alpine3.12 AS xcaddy
RUN apk add --no-cache git=2.26.2-r0
RUN go get -u github.com/caddyserver/xcaddy/cmd/xcaddy
RUN xcaddy build v2.3.0 --output /caddy

FROM alpine:3.12.3
LABEL maintainer "Dave Williams <dave@dave.io>"
COPY Caddyfile /Caddyfile
COPY --from=xcaddy /caddy /caddy
COPY src/ /srv/
WORKDIR /srv
EXPOSE 8000
CMD ["/caddy", "run", "--config", "/Caddyfile", "--adapter", "caddyfile"]
