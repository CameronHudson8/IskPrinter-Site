FROM node:14.9.0-alpine3.12 AS build-stage
WORKDIR /app
COPY ./express/package.json ./express/package-lock.json ./
RUN npm install
COPY ./express/. ./
RUN npm run build

FROM node:14.9.0-alpine3.12 as package-stage
WORKDIR /app
COPY --from=build-stage /app/dist/* ./
EXPOSE 3000
CMD ["node", "app.js"]
