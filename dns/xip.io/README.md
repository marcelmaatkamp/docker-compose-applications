# Wildcard DNS with letsencrypt and xip.io

## Wildcard dns

So you want .. Wordpress? And want it secure with https? And want it for all docker instances? And for free? 
There is a solution!

## Installation

Suppose your server has an ip-adress of 93.191.128.252 and runs docker. With the help of xip.io any docker container 

docker-compose.yml
```
version: '2'

services:

 https-portal:
  image: steveltn/https-portal
  ports:
    - '80:80'
    - '443:443'
  links:
    - hello
  restart: always
  environment:
    DOMAINS: 'hello.93.191.128.252.xip.io -> http://hello, wordpress.93.191.128.252.xip.io -> wordpress'
    STAGE: 'production'
    FORCE_RENEW: 'true'

 hello:
  image: tutum/hello-world
  hostname: hello

 wordpress:
  image: wordpress
  links:
   -  wordpress-db:mysql
  environment:
   - VIRTUAL_HOST=93.191.128.252.xip.io

 wordpress-db:
  image: mariadb
  environment:
    MYSQL_ROOT_PASSWORD: example
```
