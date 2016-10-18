FROM fluent/fluentd:latest-onbuild
MAINTAINER Marcel Maatkamp <m.maatkamp@gmail.com>
WORKDIR /home/fluent
ENV PATH /home/fluent/.gem/ruby/2.3.0/bin:$PATH

USER root

RUN \
 apk --no-cache --update add sudo build-base ruby-dev &&\

 sudo -u fluent gem install fluent-plugin-amqp fluent-plugin-input-gelf gelf fluent-plugin-record-modifier &&\
 apk add ca-certificates wget && update-ca-certificates && apk add openssl &&\
 wget https://raw.githubusercontent.com/emsearcy/fluent-plugin-gelf/master/lib/fluent/plugin/out_gelf.rb -O /fluentd/plugins/out_gelf.rb &&\

 rm -rf /home/fluent/.gem/ruby/2.3.0/cache/*.gem && sudo -u fluent gem sources -c && \
 apk del sudo build-base ruby-dev && rm -rf /var/cache/apk/* 

USER fluent
CMD exec fluentd -c /fluentd/etc/$FLUENTD_CONF -p /fluentd/plugins $FLUENTD_OPT
