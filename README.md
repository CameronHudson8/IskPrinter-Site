# IskPrinter-Site
https://iskprinter.com

Suggests market deals in Eve Online.

## How to deploy

Note: These instructions are a work in progress.

To install the ingress, follow the directions at https://cloud.google.com/community/tutorials/nginx-ingress-gke. When running helm install, insert the desired namespace, and update the name suffix. For example,

```
helm install \
  --namespace prod \
  --name nginx-ingress-prod \
  stable/nginx-ingress \
  --set rbac.create=true \
  --set controller.publishService.enabled=true
```