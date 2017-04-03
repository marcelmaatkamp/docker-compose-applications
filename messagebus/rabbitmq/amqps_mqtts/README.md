# AMQPS and MQTTS with LetsEncrypt

# Introduction

AMQPS and MQTTS with automatic renewal of certificates from LetsEncrypt in Docker.

# Start

Start AMQPS on port 5671, MQTTS on port 8883 and the management interface of RabbitMQ on port 443 

```
DNS_MAPPER=pseudo.host IP_ADDRESS=12.34.56.78 docker-compose up
```

# Test HTTPS

Open a browser to https://rabbitmq.${IP_ADDRESS}.${DNS_MAPPER} or in this specific case https://rabbitmq.12.34.56.78.pseudo.host and check that you see the RabbitMQs management interface and that it has a valid SSL certificate.

# Test AMPQPS

```
docker-compose exec rabbitmq bash -c \
 'openssl s_client -connect ${IP_ADDRESS}:5671 \
  -CAfile /var/lib/https/rabbitmq.${IP_ADDRESS}.${DNS_MAPPER}/production/chained.pem \
  -cert   /var/lib/https/rabbitmq.${IP_ADDRESS}.${DNS_MAPPER}/production/signed.crt  \
  -key    /var/lib/https/rabbitmq.${IP_ADDRESS}.${DNS_MAPPER}/production/domain.key'
```

# Test MQTTS

```
docker-compose exec rabbitmq bash -c \
 'openssl s_client -connect ${IP_ADDRESS}:8883 \
  -CAfile /var/lib/https/rabbitmq.${IP_ADDRESS}.${DNS_MAPPER}/production/chained.pem \
  -cert   /var/lib/https/rabbitmq.${IP_ADDRESS}.${DNS_MAPPER}/production/signed.crt  \
  -key    /var/lib/https/rabbitmq.${IP_ADDRESS}.${DNS_MAPPER}/production/domain.key'
```
