FROM node:14.9.0-alpine3.12 AS package-stage
ARG ENV=production
WORKDIR /app
COPY ./angular/package.json ./angular/package-lock.json ./
RUN npm install
COPY ./angular/. ./
RUN npm run ng build -- --configuration=production

FROM openresty/openresty:1.19.3.1-0-alpine
COPY --from=package-stage /app/dist/* /usr/share/nginx/html/
COPY ./nginx/. /
RUN while read env_var; do echo "env ${env_var};" >> /usr/local/openresty/nginx/conf/nginx.conf; done < /whitelisted-environment-variables
