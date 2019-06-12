#! /bin/sh

## Reinstall backend stuff

# Remove installed dependencies
rm -rf backend/vendor backend/composer.lock

# Download the ESI client, extract it, and install its dependencies
curl \
        -X POST "http://generator.swagger.io/api/gen/clients/php" \
        -H "Content-Type: application/json" \
        -d "{ \"swaggerUrl\": \"https://esi.evetech.net/latest/swagger.json\"}" \
    | jq -r '.link' \
    | xargs curl -o backend/client-generated.zip
mkdir backend/vendor
unzip backend/client-generated.zip -d backend/vendor
rm backend/client-generated.zip
composer install -d "backend/vendor/php-client/SwaggerClient-php"

# Install the main app dependencies
composer install -d "backend"

# Generate a secret key for Laravel
php backend/artisan key:generate

# Download a fresh SDE
rm -rf /databases/eve-sde/*
curl https://www.fuzzwork.co.uk/dump/mysql-latest.tar.bz2 | tar xjv -C /databases/eve-sde --strip=1

## Reinstall frontend stuff
rm -rf frontend/node_modules frontend/package-lock.json
npm install --prefix ./frontend