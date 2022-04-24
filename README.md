# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Ref: https://cloud.google.com/community/tutorials/deploy-react-nginx-cloud-run

## Build

```bash
# Build container (on Mac M1, targeting AMD64)
docker buildx build --platform linux/amd64 -t nestjs-test-app:v0.4.0 .

# Run local container, port 8080
docker run -it --env NODE_ENV=staging -p 8080:8080 nestjs-test-app:v0.4.0

```

## Deploy

```bash


# Tag for GCP Artifact Registry
docker tag nestjs-test-app:v0.4.0 europe-west2-docker.pkg.dev/cloudpayroll-dev/nestjs-test/nestjs-test-app:v0.4.0

# Push to GCP Artifact Registry
docker push europe-west2-docker.pkg.dev/cloudpayroll-dev/nestjs-test/nestjs-test-app:v0.4.0

```
