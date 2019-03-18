#!/bin/bash

#java -cp foundry-ingestor-1.0-SNAPSHOT-prod.jar org.neuinfo.foundry.ingestor.SourceIngestorCLI   $*
# needs to be run post docker-compose up
# METHOD 1: bring up shell, then execute command
# docker-compose  exec --workdir /foundry/bin ingestor /bin/bash
# root@ingestor:/foundry/bin# ./docker_ingest_demo.sh
# OR
# METHOD 2: execute command
# docker-compose  exec --workdir /foundry/bin ingestor /bin/bash docker_ingest_demo.sh

$FOUNDRY_HOME/bin/docker_ingest_src_cli.sh -c ingestor-config.yml -j $FOUNDRY_HOME/collection/cinergi-0000.json
$FOUNDRY_HOME/bin/docker_ingest_src_cli.sh -c ingestor-config.yml -j $FOUNDRY_HOME/collection/cinergi-9999.json
$FOUNDRY_HOME/bin/docker_ingest_src_cli.sh -c ingestor-config.yml -j $FOUNDRY_HOME/collection/cinergi-9999.json