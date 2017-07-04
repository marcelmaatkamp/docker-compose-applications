FROM python:3.3

WORKDIR /application
COPY iSniff-GPS iSniff-GPS
WORKDIR /application/iSniff-GPS

RUN pip install -U -r requirements.txt
RUN ./manage.py syncdb
