# Docker logging via graylog

## Start graylog
```
docker-compose up -d graylog
```

## Start example app
```
docker-compose -f docker-compose-hello.yml up hello-via-gelf
```
