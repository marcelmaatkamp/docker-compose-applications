# Freeradius
Set the ip-range which will connect to the server and the server-secret in 'clients.conf', set the user/password combination in 'users'

## Start the server
```
$ docker-compose up -d freeradius
```

## Start a test radius connection
```
$ docker-compose up freeradius-test
```
