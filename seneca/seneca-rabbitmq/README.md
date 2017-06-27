# Seleca

## SSH 

```
docker-compose exec ssh sh -c "mkdir -p ~/.ssh && echo `cat ~/.ssh/id_rsa.pub` >> /home/app-admin/.ssh/authorized_keys"
```
