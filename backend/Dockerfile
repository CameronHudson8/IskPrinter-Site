## Install backend

# Download the ESI client.
FROM alpine AS alpine
WORKDIR /
RUN apk add --no-cache \
  curl \
  jq \
  unzip \
  && curl \
  -X POST "http://generator.swagger.io/api/gen/clients/php" \
  -H "Content-Type: application/json" \
  -d "{ \"swaggerUrl\": \"https://esi.evetech.net/latest/swagger.json\"}" \
  | jq -r '.link' \
  | xargs curl -o /client-generated.zip \
  && unzip /client-generated.zip -d /php-client

# Transfer the Eve API. Install dependencies using composer.
FROM composer AS composer
WORKDIR /app
# Copy in files. Note that the "vendor" directory and the "composer.lock" file are ignored by the ".dockerignore".
## 33 is the userid (and also the groupid) of the www-data user in the nginx image.
## This number was found by running "id www-data" inside then nginx image.
COPY --chown=33:33 . .
# Copy the ESI client into the /lib directory.
WORKDIR /app/lib
COPY --from=alpine --chown=33:33 /php-client .
WORKDIR /app/lib/php-client/SwaggerClient-php
# Install the ESI client dependencies.
RUN composer install
# Go to the main app directory and install the main app dependencies.
WORKDIR /app
RUN composer install \
  && php artisan key:generate \
  && chown -R 33:33 vendor