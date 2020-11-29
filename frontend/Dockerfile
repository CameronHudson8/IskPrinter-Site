FROM node:14.9.0-alpine3.12 AS install
WORKDIR /app
COPY ./angular/package.json ./angular/package-lock.json ./
RUN npm ci
COPY ./angular/. ./

# This is repetitive due to a bug in docker.
# The bug fix was recently merged in, but has not yet been released.
# More info here:
# https://github.com/GoogleContainerTools/kaniko/pull/1234
FROM node:14.9.0-alpine3.12 AS test
WORKDIR /app
COPY ./angular/package.json ./angular/package-lock.json ./
RUN npm ci
COPY ./angular/. ./
RUN apk update && apk add chromium
ENV CHROME_BIN=/usr/bin/chromium-browser
RUN npm test

# This is repetitive due to a bug in docker.
# The bug fix was recently merged in, but has not yet been released.
# More info here:
# https://github.com/GoogleContainerTools/kaniko/pull/1234
FROM node:14.9.0-alpine3.12 AS package-0
WORKDIR /app
COPY ./angular/package.json ./angular/package-lock.json ./
RUN npm ci
COPY ./angular/. ./
RUN npm run build -- --configuration=production
FROM openresty/openresty:1.19.3.1-0-alpine AS package
COPY --from=package-0 /app/dist/* /usr/share/nginx/html/
COPY ./nginx/. /
RUN while read env_var; do echo "env ${env_var};" >> /usr/local/openresty/nginx/conf/nginx.conf; done < /whitelisted-environment-variables
