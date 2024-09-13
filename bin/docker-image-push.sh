#!/usr/bin/env sh
docker \
    push \
    "${DOCKER_IMAGE_PREFIX}/${CHANNEL}:${CI_COMMIT_SHA}"

docker \
    push \
    "${DOCKER_IMAGE_PREFIX}/${CHANNEL}:latest"
