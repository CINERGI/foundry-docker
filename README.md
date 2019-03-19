# Dockerized DDStudio CINERGI Foundry pipeline

This project bundles all prerequisites needed to run the 
foundry pipeline, management interface and web services interface.
 are captured in this docker composition. 
 The docker-compose.yml creates severa containers, 
  * Service dependencies
   ** Mongodb
   ** ServiceBus
   ** *GEOPORTAL
 one running Tomcat with the [geoportal-server-catalog]
 (https://github.com/Esri/geoportal-server-catalog) 
 and the [geoportal-harvester](https://github.com/Esri/geoportal-harvester). 
 The second container provides the Elasticsearch server for 
 storing and indexing the data stored in the catalog server.


## Releases and Downloads
- Version XX of the CINERGI Foundry.

## Installation

``` 
build and start the geoportal docker instance
https://github.com/Esri/geoportal-server-catalog-docker
```
Foundry pushes to the geoportal, so it needs to be running to prevent erros

 
Clone the repository to your local drive. In order to build the containers and run them, use the following commands:
```bash
$ git clone https://github.com/cinergi/foundry-docker.git
$ cd foundry-docker/foundry_stack
$ docker network create datastudio
$ docker-compose build
$ docker-compose up
```


## Run the applications
Foundry pushes to the geoportal, so it needs to be running to prevent erros
* Connect to http://localhost:8082/geoportal
  * there will be *An error occurred*, until data is added
* Connect to http://localhost:8083/foundry to see the foundry web interface

* Connect to dispatcher, and start management console
```
docker-compose exec dispatcher /bin/bash
root@ec-dispatcher:/foundry/bin# ./docker-manager.sh
Foundry>> list
Foundry>> ingest cinergi-9999
Foundry>> ingest cinergi-9998
```
* now go back and refresh the geoportal

## Requirements

* Docker

## Kubernetes 
TBD
for production:
https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
$ grep vm.max_map_count /etc/sysctl.conf
vm.max_map_count=262144

## NOTES
startup shell scripts are copied in. If we use the ones in foundry, then
we end up having to rebuild when we want to modify them


Manager:
docker-compose  exec --workdir /foundry/bin dispatcher /bin/bash docke
r_manager.sh

Ingest:
Present, we will copy ingest configes into a container, the 
exec and ingest command.
docker-compose  exec --workdir /foundry/bin ingestor /bin/bash
root@ingestor:/foundry/bin# ./docker_ingest_src_cli.sh  -c ingestor-cfg.xml -j ./cinergi-0000.json

# copyy in a collection config to the container
docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH
docker container ls
CONTAINER ID        IMAGE                    COMMAND                  CREATED              STATUS              PORTS                                                                                   NAMES
111644c17793        foundry_stack_ingestor   "/bin/bash"              About a minute ago   Up About a minute   9000/tcp                                                                                foundry-ingestor
b2494a47b987        mongo:3                  "docker-entrypoint.s…"   6 hours ago          Up About a minute   0.0.0.0:27017-27018->27017-27018/tcp                                                    foundry-mongo
ea4030bd5ea0        webcenter/activemq       "/app/run.sh"            7 hours ago          Up About a minute   1883/tcp, 5672/tcp, 0.0.0.0:8161->8161/tcp, 61613-61614/tcp, 0.0.0.0:61616->61616/tcp   foundry-servicebus

docker cp foundry/collections/cinergi-9999.json 111644c17793:/foundry/collections/ 
./docker_ingest_src_cli.sh  -c ingestor-cfg.xml -j ../collections/cinergi-9999.json

docker-compose exec dispatcher /bin/bash
 

Want to build a container to run a new shell command
docker rmi dispatcher
docker-compose build dispatcher

rebuild config

## managing mongo rebuild
DO NOT DO THIS ON A PRODUCTION SERVICE

```
# check if container running
docker container ls -a
#if so, stop
docker-compose stop mongodb
# then remove it and volumes. images still there
docker-compose rm -v mongodb
# remove the volume
docker volume rm foundry_stack_mongodb1
docker image prune
# clean up
docker volume prune
# rebuild
docker-compose up mongodb
  ```