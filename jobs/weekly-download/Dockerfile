FROM node:14.9.0-alpine3.12 AS install
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci

# This is repetitive due to a bug in docker.
# The bug fix was recently merged in, but has not yet been released.
# More info here:
# https://github.com/GoogleContainerTools/kaniko/pull/1234
FROM node:14.9.0-alpine3.12 AS test
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY . .
RUN npm test

# This is repetitive due to a bug in docker.
# The bug fix was recently merged in, but has not yet been released.
# More info here:
# https://github.com/GoogleContainerTools/kaniko/pull/1234
FROM node:14.9.0-alpine3.12 AS package-0
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM node:14.9.0-alpine3.12 as package
WORKDIR /app
COPY --from=package-0 /app/dist/* ./
CMD ["node", "app.js"]
