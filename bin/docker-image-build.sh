#!/usr/bin/env sh
docker \
    buildx build \
    --pull \
    --platform linux/amd64 \
    --build-arg "CHANNEL=$CHANNEL" \
    --build-arg "CI_COMMIT_BRANCH=$CI_COMMIT_BRANCH" \
    --build-arg "CI_COMMIT_SHA=$CI_COMMIT_SHA" \
    --file "./infrastructure/${SERVICE}/main.Dockerfile" \
    --cache-from "${DOCKER_IMAGE_PREFIX}/${CHANNEL}:latest" \
    --tag "${DOCKER_IMAGE_PREFIX}/${CHANNEL}:${CI_COMMIT_SHA}" \
    --tag "${DOCKER_IMAGE_PREFIX}/${CHANNEL}:latest" \
    ./
