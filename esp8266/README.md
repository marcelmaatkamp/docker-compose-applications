# ESP Flasher

```
docker-compose run --entrypoint bash esp8266
python ~/esp-open-sdk/esptool/esptool.py --port=/dev/ttyUSB0 write_flash 0x00000 /data/esp8266_deauther_1.1_1mb.bin
```
