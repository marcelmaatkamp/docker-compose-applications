FROM node:8.2.0

RUN echo "deb http://ftp.de.debian.org/debian jessie-backports main" >> /etc/apt/sources.list
RUN \ 
 dpkg --add-architecture i386 &&\
 apt-get update && \
 apt-get install -t jessie-backports -y openjdk-8-jdk ca-certificates-java unzip file git curl zip sudo libncurses5:i386 libstdc++6:i386 zlib1g:i386 vim &&\
 apt-get clean &&\
 rm -rf /var/lib/apt/lists /var/cache/apt
RUN ln -s /bin/true /usr/local/bin/mkdirp

ENV \
 ANDROID_HOME="/home/user/android-sdk-linux" \
 SDK_URL="https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip" \
 GRADLE_URL="https://services.gradle.org/distributions/gradle-3.3-all.zip"

RUN useradd -m user
RUN echo "user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER user
WORKDIR /home/user

RUN mkdir "$ANDROID_HOME" .android \
 && cd "$ANDROID_HOME" \
 && curl -o sdk.zip $SDK_URL \
 && unzip sdk.zip \ 
 && rm sdk.zip \
 && yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses
 
RUN wget $GRADLE_URL -O gradle.zip \
 && unzip gradle.zip \
 && mv gradle-3.3 gradle \
 && rm gradle.zip \
 && mkdir .gradle 
ENV PATH="/home/user/gradle/bin:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin:${ANDROID_HOME}/platform-tools:${PATH}"
