FROM node:12 AS build-stage
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npx webpack

FROM node:12 as package-stage
WORKDIR /app
COPY --from=build-stage /app/dist/* ./
CMD ["node", "app.js"]