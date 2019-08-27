# IskPrinter-Site
https://iskprinter.com

Suggests market deals in Eve Online.

## How to deploy the first time

To install the cluster-wide ingress, follow the directions at https://cloud.google.com/community/tutorials/nginx-ingress-gke. If helm and tiller are already installed on your PC and cluster, then run

```
helm install \
  --name nginx-ingress \
  stable/nginx-ingress \
  --set rbac.create=true \
  --set controller.publishService.enabled=true
```

Then, create the namespaces and ingress resources. This is done on a per-namespace basis.
```
kubectl create namespace iskprinter-dev \
  && kubectl create namespace iskprinter-testing \
  && kubectl create namespace iskprinter-staging \
  && kubectl create namespace iskprinter-prod
kubectl apply -f ingresses/ingress-dev.yaml \
  && kubectl apply -f ingresses/ingress-testing.yaml \
  && kubectl apply -f ingresses/ingress-staging.yaml \
  && kubectl apply -f ingresses/ingress-prod.yaml
```

Set up the backend services.
```
kubectl -n iskprinter-dev apply -f backend/backend-service.yaml \
  && kubectl -n iskprinter-testing apply -f backend/backend-service.yaml \
  && kubectl -n iskprinter-staging apply -f backend/backend-service.yaml \
  && kubectl -n iskprinter-prod apply -f backend/backend-service.yaml
```

Set up the frontend services.
```
kubectl -n iskprinter-dev apply -f frontend/frontend-service.yaml \
  && kubectl -n iskprinter-testing apply -f frontend/frontend-service.yaml \
  && kubectl -n iskprinter-staging apply -f frontend/frontend-service.yaml \
  && kubectl -n iskprinter-prod apply -f frontend/frontend-service.yaml
```

Set up the backend deployments.
```
kubectl -n iskprinter-dev apply -f backend/backend-deployment.yaml \
  && kubectl -n iskprinter-testing apply -f backend/backend-deployment.yaml \
  && kubectl -n iskprinter-staging apply -f backend/backend-deployment.yaml \
  && kubectl -n iskprinter-prod apply -f backend/backend-deployment.yaml
```

Set up the frontend deployments.
```
kubectl -n iskprinter-dev apply -f frontend/frontend-deployment.yaml \
  && kubectl -n iskprinter-testing apply -f frontend/frontend-deployment.yaml \
  && kubectl -n iskprinter-staging apply -f frontend/frontend-deployment.yaml \
  && kubectl -n iskprinter-prod apply -f frontend/frontend-deployment.yaml
```

Finally, create the secrets for TLS certificates. First, copy the existing secret file.
```
cp certificates/tls-secret-example.yaml certificates/tls-secret.yaml
```

Next, encode the `.crt` and `.key` certificate files to base 64.
```
base64 iskprinter.com.crt
base64 iskprinter.com.key
```

Place the base 64-encoded output into the respective secret file at the line indicated with the file.

Then, create the secrets in Kubernetes.
```
kubectl apply -f certificates/tls-secret.yaml
```

## How to deploy sustainably

After this initial setup, you will need to set up build triggers and build instruction files.
This depends on the cloud provider. For Google, it's `cloudbuild.yaml`. Make one build
instruction file per image, per namespace.

You could also roll your own Jenkins pods and use `Jenkinsfile`s, but I have not learned
that yet.