FROM node
WORKDIR /app
# Note that node_modules and package-lock.json are excluded from copy by the .dockerignore.
## 33 is the userid (and also the groupid) of the www-data user in the nginx image.
## This number was found by running "id www-data" inside then nginx image.
COPY --chown=33:33 . .
RUN npm install -g @angular/cli \
    && npm install \
    && ng build --configuration="production"