FROM node:12 AS nodeBuild
WORKDIR /app
COPY . .
RUN npm install \
  && npx webpack

FROM node:12
WORKDIR /app
COPY --from=nodeBuild /app/dist/* ./
CMD ["node", "app.js"]