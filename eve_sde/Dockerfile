# FROM mariadb

# # Download the Eve SDE.
# FROM alpine AS alpine
# WORKDIR /
# RUN apk add --no-cache \
#   curl \
#   && mkdir /eve-sde \
#   && curl https://www.fuzzwork.co.uk/dump/mysql-latest.tar.bz2 \
#   | tar xjv -C /eve-sde

# # Create the MySQL image and import the SDE.
# FROM mysql
# WORKDIR /docker-entrypoint-initdb.d
# COPY --from=alpine /eve-sde/* .