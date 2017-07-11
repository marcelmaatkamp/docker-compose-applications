FROM clearent/nexus:latest
MAINTAINER Marcel Maatkamp <m.maatkamp@gmail.com>

RUN     sed  's|\(nexus-args=.*\)|\1,${jetty.etc}/jetty-https.xml|' -i /opt/sonatype/nexus/etc/nexus-default.properties \
     && echo 'application-port-ssl=8443' >> /opt/sonatype/nexus/etc/nexus-default.properties \
     && sed 's|\(<Set name="KeyStorePath">\).*$|\1<Env name="NEXUS_KEYSTORE"/>/keystore.jks</Set>|' \
        -i /opt/sonatype/nexus/etc/jetty/jetty-https.xml \
     && sed 's|\(<Set name="KeyStorePassword">\).*$|\1<Env name="KEYSTOREPASSWORD"/></Set>|' \
        -i /opt/sonatype/nexus/etc/jetty/jetty-https.xml \
     && sed 's|\(<Set name="KeyManagerPassword">\).*$|\1<Env name="KEYMANAGERPASSWORD"/></Set>|' \
       -i /opt/sonatype/nexus/etc/jetty/jetty-https.xml \
     && sed 's|\(<Set name="TrustStorePath">\).*$|\1<Env name="NEXUS_KEYSTORE"/>/keystore.jks</Set>|' \
        -i /opt/sonatype/nexus/etc/jetty/jetty-https.xml \
     && sed 's|\(<Set name="TrustStorePassword">\).*$|\1<Env name="TRUSTSTOREPASSWORD"/></Set>|' \
        -i /opt/sonatype/nexus/etc/jetty/jetty-https.xml

