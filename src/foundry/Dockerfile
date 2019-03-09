
FROM openjdk:8-jdk as foundry

LABEL description="CINERGI ISO19115 Metadata enhancement pipeline"
LABEL maintainer="David Valentine dwvalentine@usdc.edu"

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
ENV HOME /home/foundry

RUN useradd  -m   foundry
USER foundry
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

RUN mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/prov-xml-0.5.1-SNAPSHOT.jar -DgroupId=org.openprovenance.prov -DartifactId=prov-xml -Dversion=0.5.1-SNAPSHOT -Dpackaging=jar

# RUN ./install_prov_model_2mvn.sh
RUN mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/prov-model-0.5.1-SNAPSHOT.jar -DgroupId=org.openprovenance.prov -DartifactId=prov-model -Dversion=0.5.1-SNAPSHOT -Dpackaging=jar

#RUN ./install_prov_json__2mvn.sh
RUN mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/prov-json-0.5.1-SNAPSHOT.jar -DgroupId=org.openprovenance.prov -DartifactId=prov-json -Dversion=0.5.1-SNAPSHOT -Dpackaging=jar

#RUN ./install_bnlp_2mvn.sh
RUN mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/bnlpkit-0.5.11.jar -DgroupId=bnlp -DartifactId=bnlpkit -Dversion=0.5.11 -Dpackaging=jar
#RUN ./install_bnlp_dependencies_2mvn.sh
RUN mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/commonlib-1.4.jar -DgroupId=bnlp -DartifactId=commonlib -Dversion=1.4 -Dpackaging=jar
RUN mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/mallet.jar -DgroupId=bnlp -DartifactId=mallet -Dversion=1.0 -Dpackaging=jar
RUN mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/mallet-deps.jar -DgroupId=bnlp -DartifactId=mallet-deps -Dversion=1.0 -Dpackaging=jar
RUN mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/guilib_0.4.jar -DgroupId=bnlp -DartifactId=guilib -Dversion=0.4 -Dpackaging=jar
RUN mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/jcckit.jar -DgroupId=jcckit -DartifactId=jcckit -Dversion=1.1 -Dpackaging=jar
RUN mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/jsvmlight.jar -DgroupId=bnlp -DartifactId=jsvmlight -Dversion=0.1 -Dpackaging=jar

#RUN ./install_bnlp_model2mvn.sh
RUN mvn install:install-file -Dfile=$HOME/Foundry/dependencies/lib/bnlpkit-cinergi-models-0.2.jar -DgroupId=bnlp -DartifactId=bnlpkit-cinergi-models -Dversion=0.2 -Dpackaging=jar

RUN mvn -X install:install-file -Dfile=$HOME/Foundry/dependencies/lib/geoportal-harvester-cli-2.6.1-SNAPSHOT.jar -DgroupId=com.esri.geoportal -DartifactId=geoportal-harvester-cli -Dversion=2.6.1-SNAPSHOT -Dpackaging=jar

WORKDIR $HOME/Foundry/bin/
RUN chmod a+x config_gen.sh consumer_head.sh dispatcher.sh dispatcher.sh
COPY config/config-spec.yml .
RUN ls -l

ENV FOUNDRY_HOME $HOME/Foundry/
WORKDIR $HOME/Foundry/
RUN mvn -Pdev clean install -DskipTests

WORKDIR $HOME/Foundry/bin/

RUN  [ "./config_gen.sh", "-c config-spec.yml", "-p dev"]
#RUN mvn -X -q -f ../common/pom.xml exec:java -Dexec.mainClass="org.neuinfo.foundry.common.config.ConfigGenerator" -Dexec.args="$*"
# RUN mvn -X -q -f ../common/pom.xml exec:java -Dexec.mainClass="org.neuinfo.foundry.common.config.ConfigGenerator" -Dexec.args="-c config-spec.yml -f $HOME/Foundry -p dev"

WORKDIR $HOME/Foundry/
RUN mvn -Pdev clean install -DskipTests

###################
#try three machines
###################
FROM foundry AS consumer

WORKDIR $HOME/Foundry/bin/
EXPOSE 9000
ENTRYPOINT  ["./consumer_head.sh"]

##############################
FROM foundry AS dispacther

WORKDIR $HOME/Foundry/bin/
EXPOSE 9000
ENTRYPOINT  ["./dispatcher.sh"]

##############################
FROM foundry AS manager

WORKDIR $HOME/Foundry/bin/
EXPOSE 22
ENTRYPOINT  ["/bin/bash"]