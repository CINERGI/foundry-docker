# If I put these up here, it builds the images thrice
# once for each final image
#ARG PROFILE=dev
#ARG singleAssemblyId=prod
#ARG BUILDHOME=/var/foundry
#ARG FOUNDRYBASEDIR=/foundry

FROM maven:3-jdk-8 as foundrybuild
# ARGs only last for the build phase of a single image. For the multistage, renew the ARG
ARG PROFILE=dev
ARG singleAssemblyId=prod
ARG BUILDHOME=/var/foundry
ARG FOUNDRYBASEDIR=/foundry


LABEL description="CINERGI ISO19115 Metadata enhancement pipeline"
LABEL maintainer="David Valentine dwvalentine@usdc.edu"

#VOLUME ["/data"]
#
## Install wget and install/updates certificates
#RUN apt-get update \
# && apt-get install -y -q --no-install-recommends \
#    ca-certificates \
#    git \
#    maven \
# && apt-get clean \
# && rm -r /var/lib/apt/lists/*

# The WORKDIR instruction can resolve environment variables previously set using ENV.
# You can only use environment variables explicitly set in the Dockerfile.
# in the interest of time, we mirror that code ran from /home/foundry
ENV BUILDHOME=${BUILDHOME}
RUN mkdir -p ${BUILDHOME}
# toggle on/off if BUILD changed. Spares a --no-cache
#RUN echo $HOME
#ENV PROFILE dev


#RUN useradd  -m   foundry
#USER foundry
#RUN echo $PWD

##########
# Install geoportal web application
# dependencies
########
ENV GITURL=https://github.com/Esri/geoportal-server-harvester.git
WORKDIR ${BUILDHOME}/
# had issues with cloning into $HOME
# needed to set $HOME

#RUN git clone ${GITURL} geoportal-server-harvester
#WORKDIR $HOME/geoportal-server-harvester/
#RUN mvn package  -DskipTests

#WORKDIR $HOME/geoportal-server-harvester/geoportal-commons/geoportal-commons-gpt-client
#RUN mvn install  -DskipTests

RUN echo $PWD
######################
# Build foundry
#########################
ENV GITURL=https://github.com/CINERGI/Foundry.git

WORKDIR ${BUILDHOME}/
# had issues with cloning into $HOME
# needed to set $HOME
RUN git clone ${GITURL} Foundry

WORKDIR ${BUILDHOME}/Foundry/dependencies/
#RUN ./install_prov_xml_2mvn.sh

RUN mvn install:install-file -Dfile=${BUILDHOME}/Foundry/dependencies/lib/prov-xml-0.5.1-SNAPSHOT.jar -DgroupId=org.openprovenance.prov -DartifactId=prov-xml -Dversion=0.5.1-SNAPSHOT -Dpackaging=jar \
 && mvn install:install-file -Dfile=${BUILDHOME}/Foundry/dependencies/lib/prov-model-0.5.1-SNAPSHOT.jar -DgroupId=org.openprovenance.prov -DartifactId=prov-model -Dversion=0.5.1-SNAPSHOT -Dpackaging=jar \
 && mvn install:install-file -Dfile=${BUILDHOME}/Foundry/dependencies/lib/prov-json-0.5.1-SNAPSHOT.jar -DgroupId=org.openprovenance.prov -DartifactId=prov-json -Dversion=0.5.1-SNAPSHOT -Dpackaging=jar \
 && mvn install:install-file -Dfile=${BUILDHOME}/Foundry/dependencies/lib/bnlpkit-0.5.11.jar -DgroupId=bnlp -DartifactId=bnlpkit -Dversion=0.5.11 -Dpackaging=jar \
 && mvn install:install-file -Dfile=${BUILDHOME}/Foundry/dependencies/lib/commonlib-1.4.jar -DgroupId=bnlp -DartifactId=commonlib -Dversion=1.4 -Dpackaging=jar \
 && mvn install:install-file -Dfile=${BUILDHOME}/Foundry/dependencies/lib/mallet.jar -DgroupId=bnlp -DartifactId=mallet -Dversion=1.0 -Dpackaging=jar \
 && mvn install:install-file -Dfile=${BUILDHOME}/Foundry/dependencies/lib/mallet-deps.jar -DgroupId=bnlp -DartifactId=mallet-deps -Dversion=1.0 -Dpackaging=jar \
 && mvn install:install-file -Dfile=${BUILDHOME}/Foundry/dependencies/lib/guilib_0.4.jar -DgroupId=bnlp -DartifactId=guilib -Dversion=0.4 -Dpackaging=jar \
 && mvn install:install-file -Dfile=${BUILDHOME}/Foundry/dependencies/lib/jcckit.jar -DgroupId=jcckit -DartifactId=jcckit -Dversion=1.1 -Dpackaging=jar \
 && mvn install:install-file -Dfile=${BUILDHOME}/Foundry/dependencies/lib/jsvmlight.jar -DgroupId=bnlp -DartifactId=jsvmlight -Dversion=0.1 -Dpackaging=jar \
 && mvn install:install-file -Dfile=${BUILDHOME}/Foundry/dependencies/lib/bnlpkit-cinergi-models-0.2.jar -DgroupId=bnlp -DartifactId=bnlpkit-cinergi-models -Dversion=0.2 -Dpackaging=jar \
 && mvn  install:install-file -Dfile=${BUILDHOME}/Foundry/dependencies/lib/geoportal-harvester-cli-2.6.1-SNAPSHOT.jar -DgroupId=com.esri.geoportal -DartifactId=geoportal-harvester-cli -Dversion=2.6.1-SNAPSHOT -Dpackaging=jar

#WORKDIR $HOME/Foundry/bin/
#RUN chmod a+x config_gen.sh consumer_head.sh dispatcher.sh manager.sh config_gen.sh docker_consumer_head.sh docker_dispatcher.sh docker_manager.sh
#COPY config/config-spec.yml .
# RUN ls -l
########################################
# need to run twice. Once to build the jar for config_gen.sh
# second to build with created config file
#########################################
ENV FOUNDRY_HOME=${BUILDHOME}/Foundry/
WORKDIR $FOUNDRY_HOME
#RUN echo $PROFILE
RUN mvn -P${PROFILE} clean install -DskipTests
RUN echo ${PROFILE}

WORKDIR $FOUNDRY_HOME/bin/
RUN chmod a+x config_gen.sh consumer_head.sh dispatcher.sh manager.sh config_gen.sh docker_consumer_head.sh docker_dispatcher.sh docker_manager.sh
#COPY config/config-spec.yml .
COPY config/config-spec_prod.yml config-spec.yml

RUN  [ "./config_gen.sh", "-c config-spec.yml", "-p ${PROFILE}" ]
#RUN mvn -X -q -f ../common/pom.xml exec:java -Dexec.mainClass="org.neuinfo.foundry.common.config.ConfigGenerator" -Dexec.args="$*"
# RUN mvn -X -q -f ../common/pom.xml exec:java -Dexec.mainClass="org.neuinfo.foundry.common.config.ConfigGenerator" -Dexec.args="-c config-spec.yml -f $HOME/Foundry -p dev"

WORKDIR $FOUNDRY_HOME
# RUN mvn -Pdev clean install -DskipTests
# src/main/assembly/src.xml descriptors have hard coded id of prod
ENV singleAssemblyId prod
RUN mvn -P${PROFILE}   compile assembly:single -DskipTests \
  && mvn -P ${PROFILE}   package -f ingestor-web/pom.xml -DskipTests




################################################
###############################################
## FOUNDRY BASE IMAGE
##   Java Jars only
## set correct entrypoints in the docker compose
####################################################
####################################################
FROM openjdk:8-jdk AS foundrybase
# ARGs only last for the build phase of a single image. For the multistage, renew the ARG
ARG PROFILE=dev
ARG singleAssemblyId=prod
ARG BUILDHOME=/var/foundry
ARG FOUNDRYBASEDIR=/foundry

LABEL description="CINERGI ISO19115 Metadata enhancement pipeline"
LABEL maintainer="David Valentine dwvalentine@usdc.edu"

# see Note 1
RUN mkdir -p $FOUNDRY_HOME \
      /data/logs \
      /data/foundry \
      /data/config/ \
      /data/foundry/foundry_plugins/plugins \
      /data/foundry/foundry_plugins/lib \
      /data/cinergi \
      /data/waf

# see Note 1
VOLUME [ "/data/waf","/data/foundry/", "/data/logs/"]

# Install wget and install/updates certificates
RUN apt-get update \
 && apt-get install -y -q --no-install-recommends \
    ca-certificates \
    git \
    maven \
 && apt-get clean \
 && rm -r /var/lib/apt/lists/*

# The WORKDIR instruction can resolve environment variables previously set using ENV.
# You can only use environment variables explicitly set in the Dockerfile.
# in the interest of time, we mirror that code ran from /home/foundry
ENV FOUNDRY_HOME=$FOUNDRYBASEDIR
RUN  chmod 777 /data

WORKDIR $FOUNDRY_HOME/
COPY --from=foundrybuild $BUILDHOME/Foundry/bin/ bin/
#RUN pwd;ls -al;ls -al bin
#COPY config/ /data/config/
COPY stopwords/ /data/cinergi/
WORKDIR $FOUNDRY_HOME/bin/
RUN mkdir -p /data/waf/WEB-INF
COPY tomcat/metadata_web.xml /data/waf/WEB-INF/web.xml

#########
# DISPATCHER, MANAGER
#############
FROM foundrybase AS dispatcher
# ARGs only last for the build phase of a single image. For the multistage, renew the ARG
ARG PROFILE=dev
ARG singleAssemblyId=prod
ARG BUILDHOME=/var/foundry
ARG FOUNDRYBASEDIR=/foundry

ENV FOUNDRY_HOME=$FOUNDRYBASEDIR
#ENV singleAssemblyId prod
WORKDIR $FOUNDRY_HOME/bin
COPY --from=foundrybuild $BUILDHOME/Foundry/dispatcher/target/foundry-dispatcher-1.0-SNAPSHOT-${singleAssemblyId}.jar .
COPY bin/docker_dispatcher.sh docker_dispatcher.sh
COPY bin/docker_manager.sh docker_manager.sh
RUN chmod a+x *.sh
WORKDIR $FOUNDRY_HOME/bin/
EXPOSE 9000
ENTRYPOINT   ["/bin/bash"]

#################
# CONSUMER
#################
FROM foundrybase AS consumer
# ARGs only last for the build phase of a single image. For the multistage, renew the ARG
ARG PROFILE=dev
ARG singleAssemblyId=prod
ARG BUILDHOME=/var/foundry
ARG FOUNDRYBASEDIR=/foundry

ENV FOUNDRY_HOME=$FOUNDRYBASEDIR
ENV singleAssemblyId prod
WORKDIR $FOUNDRY_HOME/bin
COPY --from=foundrybuild $BUILDHOME/Foundry/consumers/target/foundry-consumers-1.0-SNAPSHOT-${singleAssemblyId}.jar .
COPY bin/docker_consumer_head.sh docker_consumer_head.sh
RUN  chmod a+x *.sh
WORKDIR $FOUNDRY_HOME/bin/
EXPOSE 9000
ENTRYPOINT   ["./docker_consumer_head.sh"]

#################
# INGESTOR
#################
FROM foundrybase AS ingestor
# ARGs only last for the build phase of a single image. For the multistage, renew the ARG
ARG PROFILE=dev
ARG singleAssemblyId=prod
ARG BUILDHOME=/var/foundry
ARG FOUNDRYBASEDIR=/foundry

COPY --from=foundrybuild $BUILDHOME/Foundry/consumers/etc/ .
ENV FOUNDRY_HOME=$FOUNDRYBASEDIR
ENV singleAssemblyId prod
WORKDIR $FOUNDRY_HOME/bin
COPY bin/docker_ingest_src_cli.sh docker_ingest_src_cli.sh
COPY --from=foundrybuild $BUILDHOME/Foundry/ingestor/target/foundry-ingestor-1.0-SNAPSHOT-${singleAssemblyId}.jar .
RUN chmod a+x *.sh

WORKDIR $FOUNDRY_HOME/bin/
EXPOSE 9000
ENTRYPOINT   ["/bin/bash"]

#######################
# tomcat for the UL
#######################
FROM tomcat:9-jre8 AS foundryweb
# ARGs only last for the build phase of a single image. For the multistage, renew the ARG
ARG PROFILE=dev
ARG singleAssemblyId=prod
ARG BUILDHOME=/var/foundry
ARG FOUNDRYBASEDIR=/foundry


RUN apt-get update \
 && apt-get install -y -q --no-install-recommends \
    ca-certificates \
#   git \
#   maven \
#    ca-certificates-java="$CA_CERTIFICATES_JAVA_VERSION" \
 && apt-get clean \
 && rm -r /var/lib/apt/lists/*

#COPY tomcat-users.xml $CATALINA_HOME/conf

WORKDIR $CATALINA_HOME/webapps/

COPY --from=foundrybuild  $BUILDHOME/Foundry/ingestor-web/target/foundry.war $CATALINA_HOME/webapps/foundry.war
# something to cause an image
VOLUME ["/data/waf", "/usr/local/tomcat/logs/"]
COPY tomcat/tomcat-users.xml $CATALINA_HOME/conf
COPY tomcat/metadata-context.xml $CATALINA_HOME/conf/Catalina/localhost/metadata.xml

EXPOSE 8080

#####
# Notes
# 1) if you add a directory to be preservered here, or add
#     or create a directory in volume, you will need to rebuild that volume
#     or add it to the running preserved
#
#     /data/cinergi and /data/config are copied into during the build process
#     so they should not be preserved between builds, or any updates will not get seen