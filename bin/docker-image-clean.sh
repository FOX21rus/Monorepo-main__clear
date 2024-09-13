#!/usr/bin/env sh
docker \
    image \
    rm \
    "${DOCKER_IMAGE_PREFIX}/${CHANNEL}:${CI_COMMIT_SHA}";

# docker \
#     image \
#     rm \
#     "${DOCKER_IMAGE_PREFIX}/${CHANNEL}:latest";
