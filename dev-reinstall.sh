#! /bin/sh
set -x

## Reinstall backend stuff

# Remove installed dependencies
rm -rf \
    iskprinter_site/backend/vendor \
    iskprinter_site/backend/composer.lock

# Download the ESI client, extract it, and install its dependencies
curl \
        -X POST "http://generator.swagger.io/api/gen/clients/php" \
        -H "Content-Type: application/json" \
        -d "{ \"swaggerUrl\": \"https://esi.evetech.net/latest/swagger.json\"}" \
    | jq -r '.link' \
    | xargs curl -o iskprinter_site/backend/client-generated.zip
mkdir iskprinter_site/backend/vendor
unzip iskprinter_site/backend/client-generated.zip -d iskprinter_site/backend/vendor
rm iskprinter_site/backend/client-generated.zip
composer install -d "iskprinter_site/backend/vendor/php-client/SwaggerClient-php"

# Install the main app dependencies
composer install -d "iskprinter_site/backend"

# Generate a secret key for Laravel
php iskprinter_site/backend/artisan key:generate

# # Download a fresh SDE
# rm -rf /databases/eve-sde/*
# curl https://www.fuzzwork.co.uk/dump/mysql-latest.tar.bz2 | tar xjv -C /databases/eve-sde --strip=1

## Reinstall frontend stuff
rm -rf \
    iskprinter_site/frontend/node_modules \
    iskprinter_site/frontend/package-lock.json
npm install --prefix ./iskprinter_site/frontend