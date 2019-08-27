FROM node:12.6.0 AS build-stage
WORKDIR /app
COPY ./express/package.json ./express/package-lock.json ./
RUN npm install
COPY ./express/. ./
RUN npx webpack

FROM node:12.6.0 as package-stage
WORKDIR /app
COPY --from=build-stage /app/dist/* ./
EXPOSE 3000
CMD ["node", "app.js"]