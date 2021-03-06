#!/bin/bash
mkdir -p /data/logs/
mkdir -p /data/waf/
today=$(date +"%b_%d_%Y")
log_file="/data/logs/ch_nohup_${today}.log"
echo $log_file
sleep 5

# example with limited metadata loading

#mvn -f ../consumers/pom.xml exec:java -Dexec.mainClass="org.neuinfo.foundry.consumers.coordinator.ConsumerCoordinator" -Dexec.args="-c cinergi-consumers-cfg-pipe-stage.xml -n 20 $*"

#nohup mvn -q -f ../consumers/pom.xml exec:java -Dexec.mainClass="org.neuinfo.foundry.consumers.coordinator.ConsumerCoordinator" -Dexec.args="-i /home/cinergi/geo_time_include_list.txt -f $*" &> $log_file &

#java -cp foundry-consumers-1.0-SNAPSHOT-prod.jar org.neuinfo.foundry.consumers.coordinator.ConsumerCoordinator -c cinergi-consumers-cfg-pipe-stage.xml $*
#nohup java -cp foundry-consumers-1.0-SNAPSHOT-prod.jar org.neuinfo.foundry.consumers.coordinator.ConsumerCoordinator -c cinergi-consumers-cfg-pipe-stage.xml -f &> $log_file &

#java -cp foundry-consumers-1.0-SNAPSHOT-prod.jar org.neuinfo.foundry.consumers.coordinator.ConsumerCoordinator -c cinergi-consumers-cfg-pipe-stage.xml $*
java -Xmx1024m -cp foundry-consumers-1.0-SNAPSHOT-prod.jar org.neuinfo.foundry.consumers.coordinator.ConsumerCoordinator  $*

