#! /bin/sh

# Remove installed dependencies
rm -rf vendor composer.lock

# Download the ESI client, extract it, and install its dependencies
curl \
        -X POST "http://generator.swagger.io/api/gen/clients/php" \
        -H "Content-Type: application/json" \
        -d "{ \"swaggerUrl\": \"https://esi.evetech.net/latest/swagger.json\"}" \
    | jq -r '.link' \
    | xargs curl -o client-generated.zip
mkdir vendor
unzip client-generated.zip -d vendor
rm client-generated.zi
composer install -d "vendor/php-client/SwaggerClient-php"

# Install the main app dependencies
composer install

# Generate a secret key for Laravel
php artisan key:generate

# Download a fresh SDE
rm -rf /databases/eve-sde/*
curl https://www.fuzzwork.co.uk/dump/mysql-latest.tar.bz2 | tar xjv -C /databases/eve-sde --strip=1
