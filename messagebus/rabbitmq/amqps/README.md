# AMQPS with automatic renewal of certificates from LetsEncrypt

# Introduction

# Start 

```
DNS_MAPPER=pseudo.host IP_ADDRESS=12.34.56.78 docker-compose up
```

# Test
```
docker-compose exec rabbitmq bash -c \
 'openssl s_client -connect ${IP_ADDRESS}:5671 \
  -CAfile /var/lib/https/rabbitmq.${IP_ADDRESS}.${DNS_MAPPER}/production/chained.pem \
  -cert   /var/lib/https/rabbitmq.${IP_ADDRESS}.${DNS_MAPPER}/production/signed.crt  \
  -key    /var/lib/https/rabbitmq.${IP_ADDRESS}.${DNS_MAPPER}/production/domain.key'
```
