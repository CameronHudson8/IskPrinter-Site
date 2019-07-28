FROM node:12.6.0 AS build-stage
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npx webpack

FROM node:12.6.0 as package-stage
WORKDIR /app
COPY --from=build-stage /app/dist/* ./
EXPOSE 3000
CMD ["node", "app.js"]