FROM node:14.9.0-alpine3.12 AS build-stage
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14.9.0-alpine3.12 as package-stage
WORKDIR /app
COPY --from=build-stage /app/dist/* ./
CMD ["node", "app.js"]
