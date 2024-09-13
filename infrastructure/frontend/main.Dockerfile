FROM node:lts as prepare_base

ARG CHANNEL=production
ARG CI_COMMIT_BRANCH=undefined

ENV DEBIAN_FRONTEND="noninteractive" \
    PROJECT="protos" \
    SUBPROJECT="core" \
    CI_COMMIT_BRANCH="${CI_COMMIT_BRANCH}" \
    CHANNEL="${CHANNEL}"

LABEL project="${PROJECT}" \
    subproject="${SUBPROJECT}" \
    channel="${CHANNEL}" \
    stage="prepare"

ENV APP_PATH="/opt/${PROJECT}/${SUBPROJECT}" \
    APP_PROJECT_ID="${PROJECT}-${SUBPROJECT}" \
    APP_PORT=3000 \
    APP_USER_NAME="appserver-user" \
    APP_GROUP_NAME="appserver-group" \
    APP_GROUP_ID=1500 \
    APP_USER_ID=1500

RUN mkdir -p "${APP_PATH}/node_modules/.bin" \
    && groupadd -g "${APP_GROUP_ID}" "${APP_GROUP_NAME}" \
    && useradd -u "${APP_USER_ID}" -d "${APP_PATH}" -g "${APP_GROUP_NAME}" "${APP_USER_NAME}" \
    && chown -R "${APP_USER_NAME}":"${APP_GROUP_NAME}" "${APP_PATH}"

RUN npm install -g pnpm

USER "${APP_USER_NAME}"

WORKDIR "${APP_PATH}"

ENV PATH="${PATH}:${APP_PATH}/node_modules/.bin"

COPY --chown="${APP_USER_NAME}:${APP_GROUP_NAME}" \
[    \
    "pnpm-workspace.yaml", \
    "package.json", \
    "pnpm-lock.yaml", \
    "turbo.json", \
    "${APP_PATH}/" \
]

FROM prepare_base as  prepare_build_source

COPY --chown="${APP_USER_NAME}:${APP_GROUP_NAME}" \
[    \
    "apps/", \
    "${APP_PATH}/apps" \
]

COPY --chown="${APP_USER_NAME}:${APP_GROUP_NAME}" \
[    \
    "common/", \
    "${APP_PATH}/common" \
]

RUN mkdir -p "${APP_PATH}/.tmp/common" \
    && cd "${APP_PATH}/common/"  \
    && find . -name 'package.json' \! -path '*\.vscode*' \! -path '*/node_modules/*' | xargs cp --parents -t "../.tmp/common" \
    && find . -name 'tsconfig.json' \! -path '*\.vscode*' \! -path '*/node_modules/*' | xargs cp --parents -t "../.tmp/common" \
    && mkdir -p "${APP_PATH}/.tmp/apps" \
    && cd "${APP_PATH}/apps/"  \
    && find . -name 'package.json' \! -path '*\.vscode*' \! -path '*/node_modules/*' | xargs cp --parents -t "../.tmp/apps" \
    && find . -name 'tsconfig.json' \! -path '*\.vscode*' \! -path '*/node_modules/*' | xargs cp --parents -t "../.tmp/apps" \
    && find . -name 'tsconfig.build.json' \! -path '*\.vscode*' \! -path '*/node_modules/*' | xargs cp --parents -t "../.tmp/apps" \
    && find . -name '*.gql' \! -path '*\.vscode*' \! -path '*/node_modules/*' | xargs cp --parents -t "../.tmp/apps" \
    && find . -name '*.graphql' \! -path '*\.vscode*' \! -path '*/node_modules/*' | xargs cp --parents -t "../.tmp/apps"

FROM prepare_base as prepare_deps_install

COPY --chown="${APP_USER_NAME}:${APP_GROUP_NAME}" \
    --from="prepare_build_source" \
    "${APP_PATH}/.tmp" "${APP_PATH}/"

FROM prepare_deps_install as prepare_build_deps

RUN pnpm install \
    --frozen-lockfile

FROM prepare_deps_install as prepare_works_deps

RUN pnpm install \
    --frozen-lockfile \
    --prod

FROM prepare_build_deps as build

COPY --chown="${APP_USER_NAME}:${APP_GROUP_NAME}" \
[    \
    "apps/", \
    "${APP_PATH}/apps" \
]

COPY --chown="${APP_USER_NAME}:${APP_GROUP_NAME}" \
[    \
    "common/", \
    "${APP_PATH}/common" \
]
ENV COREPACK_ENABLE_STRICT=0
RUN ["pnpm","run","build"]

RUN mkdir -p "${APP_PATH}/.tmp/apps" \
    && cd "${APP_PATH}/apps/"  \
    && find . -name '*.gql' \! -path '*\.vscode*' \! -path '*/node_modules/*' | xargs cp --parents -t "../.tmp/apps" \
    && find . -name '*.graphql' \! -path '*\.vscode*' \! -path '*/node_modules/*' | xargs cp --parents -t "../.tmp/apps"

FROM prepare_works_deps as work

COPY --chown="${APP_USER_NAME}:${APP_GROUP_NAME}" \
    --from="build" \
    "${APP_PATH}/apps/backend/dist" "${APP_PATH}/apps/backend/dist"

COPY --chown="${APP_USER_NAME}:${APP_GROUP_NAME}" \
    --from="build" \
    "${APP_PATH}/apps/frontend/.next" "${APP_PATH}/apps/frontend/.next"

COPY --chown="${APP_USER_NAME}:${APP_GROUP_NAME}" \
    "apps/frontend/styles" "${APP_PATH}/apps/frontend/styles"

COPY --chown="${APP_USER_NAME}:${APP_GROUP_NAME}" \
    "apps/frontend/public" "${APP_PATH}/apps/frontend/public"

COPY --chown="${APP_USER_NAME}:${APP_GROUP_NAME}" \
    --from="build" \
    "${APP_PATH}/.tmp" "${APP_PATH}/"

WORKDIR "${APP_PATH}/apps/frontend/"


CMD ["pnpm","run","start"]

LABEL stage="work"
ENV SERVICE="frontend" \
    APP_SERVICE_ID="${SERVICE}" \
    APP_PROJECT_ID="${PROJECT}-${SUBPROJECT}"

ARG CI_COMMIT_SHA=undefined
ENV CI_COMMIT_SHA="${CI_COMMIT_SHA}"
LABEL service="${SERVICE}" \
    CI_COMMIT_SHA="${CI_COMMIT_SHA}"
