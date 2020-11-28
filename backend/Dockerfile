FROM node:14.9.0-alpine3.12 AS install
WORKDIR /app
COPY ./express/package.json ./express/package-lock.json ./
RUN npm install
COPY ./express/. ./

FROM node:14.9.0-alpine3.12 as test
WORKDIR /app
COPY --from=install /app/* ./
RUN npm test

FROM node:14.9.0-alpine3.12 AS package-0
WORKDIR /app
COPY ./express/package.json ./express/package-lock.json ./
RUN npm install --production
COPY ./express/. ./
RUN npm run webpack -- --mode production
FROM node:14.9.0-alpine3.12 as package
WORKDIR /app
COPY --from=package-0 /app/dist/* ./
EXPOSE 3000
CMD ["node", "app.js"]
