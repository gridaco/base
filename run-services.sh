#!/bin/bash
PORT=3000
DIRECTORYPORTPAIRS=""
for i in *
do
    if [[ $i =~ "-service" ]]; then
        DIRECTORYPORTPAIRS="${DIRECTORYPORTPAIRS} --directory $i --port $PORT"
        ((++PORT))
    fi
done || exit 1

printf "\n%s\n" "Using command: ${DIRECTORYPORTPAIRS}"

serverless-offline-multi $DIRECTORYPORTPAIRS