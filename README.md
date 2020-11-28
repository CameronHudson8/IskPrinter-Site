# IskPrinter-Site
https://iskprinter.com

Suggests market deals in Eve Online.

## Local development of frontend

Start the Angular development server in development mode.
```
npm --prefix frontend/angular install
npm --prefix frontend/angular run dev
```

## Local development of the backend

Activate webpack continuous compilation and serve the backend in development mode.
```
npm --prefix backend/express install
npm --prefix backend/express run webpack-watch
```

Port-forward the MongoDB database to localhost.
```
kubectl --context docker-desktop -n isk-printer port-forward svc/isk-printer-database 27017:27017
```

Then, in a separate shell, start the server.
```
export CLIENT_ID='<client-id>'
export CLIENT_SECRET='<client-secret>'
export DB_URL='mongodb://localhost:27017'
npm --prefix backend/express run serve
```

## How to build the images

To build the backend and push it:
```
tag=$(git rev-parse --verify --short HEAD)
docker build ./backend/ -t "cameronhudson8/isk-printer-backend:${tag}"
docker push "cameronhudson8/isk-printer-backend:${tag}"
```

To build the frontend and push it:
```
tag=$(git rev-parse --verify --short HEAD)
docker build ./frontend/ -t "cameronhudson8/isk-printer-frontend:${tag}"
docker push "cameronhudson8/isk-printer-frontend:${tag}"
```

To build the weekly download job and push it:
```
tag=$(git rev-parse --verify --short HEAD)
docker build ./jobs/weekly-download/ -t "cameronhudson8/isk-printer-weekly-download:${tag}"
docker push "cameronhudson8/isk-printer-weekly-download:${tag}"
```

## How to deploy

**Assumptions:**
* You already have a Kubernetes cluster running.
* The cluster has an nginx ingress controller running in it. If not, see [these instructions](https://cloud.google.com/community/tutorials/nginx-ingress-gke) to set one up.

1. Create certificate resource files. Examples are provided that you should copy in the following way.
```
(cd helm/templates/certificates/ && cp tls-iskprinter.com-secret-example.yaml tls-iskprinter.com-secret.yaml)
```

1. Locate the TLS certificate(s) for your intended domain name(s). Each certificate will include a `crt` and a `key`. Encode each in base 64.
    ```
    cat 'my-certificate.crt' | base64
    cat 'my-certificate.key' | base64
    ```
    
1. Copy and paste the corresponding output into the certificate resource files.
    ```
    vim helm/templates/certificates/tls-iskprinter.com-secret.yaml
    ```

1. Verify that the frontend and backend images tags are what you intend. (They are not `latest`.)
    ```
    less helm/values.yaml
    ```

1. Deploy the application using `helm`. If necessary, create the namespace using `kubectl` first.
    ```
    kubectl create namespace isk-printer
    helm -n isk-printer install isk-printer ./helm
    ```

## How to remove

```
helm del isk-printer
kubectl delete namespace isk-printer
```
