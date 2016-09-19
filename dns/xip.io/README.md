# Wildcard DNS with letsencrypt and xip.io

## Wildcard dns

So you want to run Wordpress/Magnolia/Node-RED, Just any kind of webserver? And want those secure with https? And have those SSL certificates automatically renewed with letscencrypt? And running it all in docker instances? And also for free? There is a solution!

## Installation

Suppose your server has an ip-adress of 93.191.128.252 and runs docker. With the help of xip.io any docker container 

Take for example this docker-compose.yml file which starts a webserver and serves it contents on https://hello.93.191.128.252.xip.io
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
    DOMAINS: 'hello.93.191.128.252.xip.io -> http://hello'
    STAGE: 'production'
    FORCE_RENEW: 'true'

 hello:
  image: tutum/hello-world
  hostname: hello
```

A more elaborate example with 2 sites, https://hello.93.191.128.252.xip.io serving static content and https://wordpress.93.191.128.252.xip.io serving a Wordpress site:
```
version: "2"

services:

 https-portal:
  image: steveltn/https-portal
  ports:
    - "80:80"
    - "443:443"
  restart: always
  volumes:
   - data-https_portal:/etc/nginx/conf.d/
   - /var/run/docker.sock:/var/run/docker.sock
  environment:
    DOMAINS: "hello.93.191.128.252.xip.io -> http://hello, wordpress.93.191.128.252.xip.io -> http://wordpress"
    STAGE: "production"
    FORCE_RENEW: "true"

 hello:
  image: tutum/hello-world
  hostname: hello
  depends_on:
   - https-portal

 wordpress:
  image: wordpress
  hostname: wordpress
  depends_on:
   - https-portal
  links:
   -  wordpress-db:mysql
  environment:
   - WORDPRESS_DB_PASSWORD=${MYSQL_ROOT_PASSWORD}

 wordpress-db:
  image: mariadb
  restart: "always"
  volumes:
   - data-mysql:/var/lib/mysql
  environment:
   - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
   - MYSQL_USER=${MYSQL_USER}
   - MYSQL_PASSWORD=${MYSQL_PASSWORD}
   - MYSQL_DATABASE=${MYSQL_DATABASE}

volumes:
 data-mysql:
 data-https_portal:
```
