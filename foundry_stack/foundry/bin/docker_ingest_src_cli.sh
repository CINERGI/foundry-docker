#!/bin/bash
#mvn -f ../ingestor/pom.xml exec:java -Dexec.mainClass="org.neuinfo.foundry.ingestor.SourceIngestorCLI" -Dexec.args="ingestor-cfg.xml $*"
#mvn -f ../ingestor/pom.xml exec:java -Dexec.mainClass="org.neuinfo.foundry.ingestor.SourceIngestorCLI" -Dexec.args="pipe-stage-ingestor-cfg.xml $*"

#java -cp foundry-ingestor-1.0-SNAPSHOT-prod.jar org.neuinfo.foundry.ingestor.SourceIngestorCLI  -c pipe-stage-ingestor-cfg.xml $*
java -cp foundry-ingestor-1.0-SNAPSHOT-prod.jar org.neuinfo.foundry.ingestor.SourceIngestorCLI   $*
