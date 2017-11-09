FROM jenkins/jenkins:lts

USER root
RUN \
 apt-get update &&\
 apt-get install -y build-essential vim &&\
 rm -rf /var/lib/apt/lists/*
USER jenkins

COPY plugins.txt /usr/share/jenkins/plugins.txt
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/plugins.txt 
