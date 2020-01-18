# IskPrinter-Site
https://iskprinter.com

Suggests market deals in Eve Online.

## How to install

**Assumptions:**
* You already have a Kubernetes cluster running.
* The cluster has an nginx ingress controller running in it. If not, see [these instructions](https://cloud.google.com/community/tutorials/nginx-ingress-gke) to set one up.
* The cluster has tiller installed. If not, see the aforementioned link.

```
kubectl create namespace isk-printer
helm install ./isk-printer --name isk-printer --namespace isk-printer
```

## How to remove

```
helm del isk-printer
kubectl delete namespace isk-printer
```

**TODO**: Since Jenkins is not yet set up, I manually granted permission for the GKE cluster on which this release runs, so that it can pull images from the container registry of an old project. My goal for commits to trigger a Jenkins build that will assemble an image, push it to the registry, and then deploy it in the same Kubernetes cluster.
