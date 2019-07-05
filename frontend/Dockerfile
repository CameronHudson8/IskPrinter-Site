FROM node:12 AS node
WORKDIR /app
COPY . .
RUN npm install \
  && npm run ng build -- --configuration=production

FROM nginx:1.17.1
COPY --from=node /app/dist/* /usr/share/nginx/html/