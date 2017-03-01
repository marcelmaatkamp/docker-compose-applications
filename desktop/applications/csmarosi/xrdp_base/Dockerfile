FROM debian
MAINTAINER Csaba Marosi "4bea6c869366227b879ffe4abad50c@gmail.com"

RUN apt-get update && \
    apt-get install --no-install-recommends -y -q \
        sudo git vim ca-certificates \
        rxvt-unicode-lite ratpoison \
        libssl-dev libpam0g-dev libx11-dev libxfixes-dev libxrandr-dev \
        xfonts-utils \
        procps \
        python python-lxml python-libxml2 \
        wget \
    && \
    apt-get clean

# For a smaller image, remove build tools & artifacts after compilation.
RUN apt-get update && \
    apt-get install --no-install-recommends -y -q \
        make autoconf automake libtool pkg-config xz-utils \
        bzip2 xsltproc flex bison g++ gettext libxml-sax-expat-perl \
    && \
    cd /opt && \
    git clone --recursive https://github.com/neutrinolabs/xrdp.git && \
    cd xrdp && \
    ./bootstrap && \
    ./configure && \
    make && \
    make install && \
    xrdp-keygen xrdp auto &&\
    cp instfiles/pam.d/xrdp-sesman.debian /etc/pam.d/xrdp-sesman && \
    cd /opt/xrdp/xorg/X11R7.6 && \
    ./buildx.sh /opt/X11rdp && \
    ln -s /opt/X11rdp/bin/X11rdp /usr/local/bin/X11rdp && \
    cp /etc/xrdp/xrdp.sh /etc/init.d/ && \
    cd / && rm -rf /opt/xrdp && \
    apt-get remove -yq \
        make autoconf automake libtool pkg-config xz-utils \
        bzip2 xsltproc flex bison g++ gettext libxml-sax-expat-perl \
    && \
    apt-get autoremove -yq && \
    apt-get clean

EXPOSE 3389
RUN echo 'ALL ALL=NOPASSWD:ALL' > /etc/sudoers.d/allSudo && \
    echo 'root:p' | chpasswd

#TODO: there should be a better method than this!
# CMD ["bash", "-c", "sudo /etc/init.d/xrdp.sh start && bash"]
CMD ["/etc/init.d/xrdp.sh","start"]
