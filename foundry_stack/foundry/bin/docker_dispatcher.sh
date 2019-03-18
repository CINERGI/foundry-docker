#!/bin/bash
mkdir -p /data/logs/
mkdir -p /data/waf/

today=$(date +"%b_%d_%Y")
mkdir -p /data/logs/
log_file="/data/logs/dispatcher_nohup_${today}.log"
echo $log_file
sleep 5

#nohup mvn -q -f ../dispatcher/pom.xml exec:java -Dexec.mainClass="org.neuinfo.foundry.jms.producer.PipelineMessageDispatcher"  &> $log_file

#nohup mvn -q -f ../dispatcher/pom.xml exec:java -Dexec.mainClass="org.neuinfo.foundry.jms.producer.PipelineMessageDispatcher" -Dexec.args="-c cinergi-dispatcher-cfg-pipe-stage.xml" &> $log_file &

# no config. pass in on entrypoint, if needed
java -cp foundry-dispatcher-1.0-SNAPSHOT-prod.jar org.neuinfo.foundry.jms.producer.PipelineMessageDispatcher  $*
