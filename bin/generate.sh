#!/usr/bin/env sh

WORK_PATH="`(dirname \"${0}\")`";
WORK_PATH="`( cd \"${WORK_PATH}/../\" && pwd )`";
. "${WORK_PATH}/bin/lib.sh";

CONFIG_GENERATE_ENV_FILE="${WORK_PATH}/bin/generate.env";

env_file_load "${CONFIG_GENERATE_ENV_FILE}";

GENERATOR_ENTITIES_PATH="${WORK_PATH}/_metasrc/gql-reflector/generate-entities-modules";
REFLECTOR_PATH="${WORK_PATH}/_metasrc/gql-reflector";

mkdir -p "${GQLR_GEM_TMP}";

function generate_entities(){
    cd "${GENERATOR_ENTITIES_PATH}"&& mkdir -p "${GENERATOR_ENTITIES_PATH}/tmp" && yarn run generate;
}

function generate_typings(){
    cd "${REFLECTOR_PATH}" && yarn run gen-nest-typings;
}

function generate_schema(){
    cd "${REFLECTOR_PATH}" && yarn run gen:schema;
}

function generate_requests(){
    if [[ ! -z "${GQLR_REQUESTS_PATH}" ]] ;
    then
        rm -rf "${GQLR_REQUESTS_PATH}";
    else
        echo "GQLR_REQUESTS_PATH n/a";
        exit 1;
    fi;
    npx -p gql-generator gqlg \
        --schemaFilePath "${GQLR_GEM_BACKEND_SRC_PATH}/src/schema.graphql" \
        --destDirPath "${GQLR_REQUESTS_PATH}" \
        --depthLimit 5
}
function generate_swr(){
    cd "${REFLECTOR_PATH}" && pnpm run gen:swr;
}

generate_entities;
generate_typings;
generate_schema;

generate_requests;

generate_swr;
