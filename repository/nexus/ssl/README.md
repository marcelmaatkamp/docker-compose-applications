# Nexus + SS SSL

```
docker-compose build
docker-compose run nexus ash -c "keytool -genkeypair \
        -keystore ${NEXUS_KEYSTORE}/keystore.jks \
        -storepass ${KEYMANAGERPASSWORD} \
        -keypass ${KEYMANAGERPASSWORD} \
        -alias jetty -keyalg RSA -keysize 2048 -validity 5000  \
        -dname \"CN=*.local, OU=Example, O=Sonatype, L=Unspecified, ST=Unspecified, C=US\" \
        -ext \"SAN=DNS:nexus.local\" -ext \"BC=ca:true\""
```
