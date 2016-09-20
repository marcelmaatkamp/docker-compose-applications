# Wildcard DNS with letsencrypt and xip.io

## Wildcard dns

So you want to:
 * Run some kind of webserver like Wordpress, Magnolia, Node-RED for example 
 * Maybe even run multiple instances together
 * And want it (or those) running securely behind https? 
 * And have those https SSL certificates automatically renewed with LetsEncrypt? 
 * And want it running all together in docker instances? 
 * And with zero setup and maintenance cost?
 * And for free? 

There is a solution!! The only thing you need is a computer running docker behind a public accessable ip-address, that's it!

## Installation

Suppose your computer has an publically accessable ip-adress of 11.22.33.44 and runs docker. With the help of xip.io any docker container we will deploy a Wordpress site running behind htts where the certificates are being automatically renewed with LetsEncrypt.
Just edit the .env file, set ip-address, username and password and start the instance with:

```
$ docker-compose up
```

This will start 
 * https frontend
 * Wordpress on https://wordpress.<ip_address>.xip.io
 * And some static frontend running on http://hello.<ip_address>.xip.io

docker.compose.yml
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
   - data-https_portal:/var/lib/https-portal/
   - /var/run/docker.sock:/var/run/docker.sock
  environment:
    DOMAINS: "hello.${IP_ADDRESS}.xip.io -> http://hello, wordpress.${IP_ADDRESS}.xip.io -> http://wordpress"
    # STAGE: "production"
    # FORCE_RENEW: "true"

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
  volumes:
   - data-wordpress:/var/www/html
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
 data-wordpress:
```
