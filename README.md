# Dockerized DDStudio CINERGI Foundry pipeline

This project bundles all prerequisites needed to run the 
geoportal server and a harvester are captured
 in this docker composition. 
 The docker-compose.yml creates two containers, 
 one running Tomcat with the [geoportal-server-catalog]
 (https://github.com/Esri/geoportal-server-catalog) 
 and the [geoportal-harvester](https://github.com/Esri/geoportal-harvester). 
 The second container provides the Elasticsearch server for 
 storing and indexing the data stored in the catalog server.


## Releases and Downloads
- Version XX of the CINERGI Foundry.

## Installation
 
Clone the repository to your local drive. In order to build the containers and run them, use the following commands:
```bash
$ git clone https://github.com/cinergi/foundry-docker.git
$ cd foundry-docker/foundry_stack
$ docker-compose build
$ docker-compose up
```

S
## Run the applications

* Connect to http://localhost:8080/geoportal to see the geoportal in action. 
* Connect to http://localhost:8080/harvester to see the harvester in action. 

## Requirements

* Docker

## Kubernetes 
for production:
https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
$ grep vm.max_map_count /etc/sysctl.conf
vm.max_map_count=262144

## NOTES
startup shell scripts are copied in. If we use the ones in foundry, then
we end up having to rebuild when we want to modify them

Ingest:
Present, we will copy ingest configes into a container, the 
exec and ingest command.

Want to build a container to run a new shell command
docker rmi dispatcher
docker-compose build dispatcher

revuild config