FROM frekele/maven:latest

RUN apt-get update &&  apt-get install -y build-essential curl git unzip wget axel telnet vim &&\
    rm -rf /var/lib/apt/lists/* &&\
    curl -sL https://deb.nodesource.com/setup_6.x | bash - &&\
    apt-get install -y nodejs
