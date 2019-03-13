#!/bin/bash
mkdir -p /data/logs/
mkdir -p /data/waf/

#mvn -f ../dispatcher/pom.xml exec:java -Dexec.mainClass="org.neuinfo.foundry.jms.producer.ManagementService" -Dexec.args="$*"
#mvn -q -f ../dispatcher/pom.xml exec:java -Dexec.mainClass="org.neuinfo.foundry.jms.producer.ManagementService" -Dexec.args="-c cinergi-dispatcher-cfg-pipe-stage.xml $*"

#java -cp foundry-dispatcher-1.0-SNAPSHOT-prod.jar org.neuinfo.foundry.jms.producer.ManagementService -c cinergi-dispatcher-cfg-pipe-stage.xml $*
java -cp foundry-dispatcher-1.0-SNAPSHOT-prod.jar org.neuinfo.foundry.jms.producer.ManagementService  $*
