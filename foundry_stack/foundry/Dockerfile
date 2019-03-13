
FROM maven:3-jdk-8 as foundrybuild

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
ENV HOME /home/foundry
RUN mkdir -p /home/foundry
# toggle on/off if BUILD changed. Spares a --no-cache
#RUN echo $HOME
ENV PROFILE dev


#RUN useradd  -m   foundry
#USER foundry
RUN echo $PWD

##########
# Install geoportal web application
# dependencies
########
ENV GITURL=https://github.com/Esri/geoportal-server-harvester.git
WORKDIR $HOME/
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

WORKDIR $HOME/
# had issues with cloning into $HOME
# needed to set $HOME
RUN git clone ${GITURL} Foundry

WORKDIR $HOME/Foundry/dependencies/
#RUN ./install_prov_xml_2mvn.sh

RUN mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/prov-xml-0.5.1-SNAPSHOT.jar -DgroupId=org.openprovenance.prov -DartifactId=prov-xml -Dversion=0.5.1-SNAPSHOT -Dpackaging=jar \
 && mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/prov-model-0.5.1-SNAPSHOT.jar -DgroupId=org.openprovenance.prov -DartifactId=prov-model -Dversion=0.5.1-SNAPSHOT -Dpackaging=jar \
 && mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/prov-json-0.5.1-SNAPSHOT.jar -DgroupId=org.openprovenance.prov -DartifactId=prov-json -Dversion=0.5.1-SNAPSHOT -Dpackaging=jar \
 && mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/bnlpkit-0.5.11.jar -DgroupId=bnlp -DartifactId=bnlpkit -Dversion=0.5.11 -Dpackaging=jar \
 && mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/commonlib-1.4.jar -DgroupId=bnlp -DartifactId=commonlib -Dversion=1.4 -Dpackaging=jar \
 && mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/mallet.jar -DgroupId=bnlp -DartifactId=mallet -Dversion=1.0 -Dpackaging=jar \
 && mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/mallet-deps.jar -DgroupId=bnlp -DartifactId=mallet-deps -Dversion=1.0 -Dpackaging=jar \
 && mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/guilib_0.4.jar -DgroupId=bnlp -DartifactId=guilib -Dversion=0.4 -Dpackaging=jar \
 && mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/jcckit.jar -DgroupId=jcckit -DartifactId=jcckit -Dversion=1.1 -Dpackaging=jar \
 && mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/jsvmlight.jar -DgroupId=bnlp -DartifactId=jsvmlight -Dversion=0.1 -Dpackaging=jar \
 && mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/bnlpkit-cinergi-models-0.2.jar -DgroupId=bnlp -DartifactId=bnlpkit-cinergi-models -Dversion=0.2 -Dpackaging=jar \
 && mvn  install:install-file -Dfile=$HOME/Foundry/dependencies/lib/geoportal-harvester-cli-2.6.1-SNAPSHOT.jar -DgroupId=com.esri.geoportal -DartifactId=geoportal-harvester-cli -Dversion=2.6.1-SNAPSHOT -Dpackaging=jar

#WORKDIR $HOME/Foundry/bin/
#RUN chmod a+x config_gen.sh consumer_head.sh dispatcher.sh manager.sh config_gen.sh docker_consumer_head.sh docker_dispatcher.sh docker_manager.sh
#COPY config/config-spec.yml .
# RUN ls -l
########################################
# need to run twice. Once to build the jar for config_gen.sh
# second to build with created config file
#########################################
ENV FOUNDRY_HOME $HOME/Foundry/
WORKDIR $HOME/Foundry/
RUN echo $PROFILE
RUN mvn -P${PROFILE} clean install -DskipTests
RUN echo ${PROFILE}

WORKDIR $HOME/Foundry/bin/
RUN chmod a+x config_gen.sh consumer_head.sh dispatcher.sh manager.sh config_gen.sh docker_consumer_head.sh docker_dispatcher.sh docker_manager.sh
COPY config/config-spec.yml .

RUN  [ "./config_gen.sh", "-c config-spec.yml", "-p ${PROFILE}" ]
#RUN mvn -X -q -f ../common/pom.xml exec:java -Dexec.mainClass="org.neuinfo.foundry.common.config.ConfigGenerator" -Dexec.args="$*"
# RUN mvn -X -q -f ../common/pom.xml exec:java -Dexec.mainClass="org.neuinfo.foundry.common.config.ConfigGenerator" -Dexec.args="-c config-spec.yml -f $HOME/Foundry -p dev"

WORKDIR $HOME/Foundry/
# RUN mvn -Pdev clean install -DskipTests
# src/main/assembly/src.xml descriptors have hard coded id of prod
ENV singleAssemblyId prod
RUN mvn -P${PROFILE}   compile assembly:single -DskipTests \
  && mvn -P ${PROFILE}   package -f ingestor-web/pom.xml -DskipTests \
  && cp dispatcher/target/foundry-dispatcher-1.0-SNAPSHOT-${singleAssemblyId}.jar bin/ \
  && cp consumers/tdocparget/foundry-consumers-1.0-SNAPSHOT-${singleAssemblyId}.jar bin/ \
  && cp ingestor/target/foundry-ingestor-1.0-SNAPSHOT-${singleAssemblyId}.jar bin/ \
  && cp common/target/foundry-common-1.0-SNAPSHOT-${singleAssemblyId}.jar bin/



#######
# one base
# set correct entrypoints in the docker compose
##############
FROM openjdk:8-jdk AS foundrybase
LABEL description="CINERGI ISO19115 Metadata enhancement pipeline"
LABEL maintainer="David Valentine dwvalentine@usdc.edu"

VOLUME ["/data"]

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
ENV HOME /foundry
RUN mkdir -p /foundry
COPY --from=foundrybuild /home/foundry/Foundry/bin/ bin/

RUN  chmod 777 /data
RUN mkdir -p /data/logs
RUN mkdir -p /data/foundry
COPY config/ /data/config/
WORKDIR $HOME/bin/
#COPY bin/docker_consumer_head.sh .
COPY bin/docker_dispatcher.sh .
#COPY bin/docker_manager.sh .
EXPOSE 9000
ENTRYPOINT   ["/bin/bash"]

###################
#try three machines
###################
#FROM foundry AS consumer
#
#WORKDIR $HOME/Foundry/bin/
#EXPOSE 9000
#ENTRYPOINT   ["./docker_consumer_head.sh"]
#
###############################
#FROM foundry AS dispacther
#
#WORKDIR $HOME/Foundry/bin/
#EXPOSE 9000
#ENTRYPOINT   ["./docker_dispatcher.sh"]
#
###############################
#FROM foundry AS manager
#
#WORKDIR $HOME/Foundry/bin/
#EXPOSE 22
#ENTRYPOINT   ["./docker_manager.sh"]

#######################
# tomcat for the UL
#######################
FROM tomcat:9-jre8 AS foundryweb

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

COPY --from=foundrybase /home/foundry/Foundry/ingestor-web/target/foundry.war $CATALINA_HOME/webapps/foundry.war
# something to cause an image
VOLUME ["/data", "/opt/tomcat/webapps/metadata"]
COPY tomcat-users.xml $CATALINA_HOME/conf

EXPOSE 8080