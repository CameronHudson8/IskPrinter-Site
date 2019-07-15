FROM node:12 AS node
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run ng build -- --configuration=production

FROM nginx:1.17.1
COPY --from=node /app/dist/* /usr/share/nginx/html/
EXPOSE 80