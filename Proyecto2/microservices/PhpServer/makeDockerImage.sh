#!/bin/bash

IP=`hostname  -I | cut -f1 -d' '`
HOSTIP=8001
DOCKERIP=8001

# Install docker 
echo "installing docker..."
if [ -x "$(command -v docker)" ]; then
    echo "Docker installed"
else
    sudo apt-get update
    sudo apt-get remove docker docker-engine docker.io
    sudo apt install apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
    sudo apt update
    apt-cache policy docker-ce
    sudo apt install docker-ce

    wget https://github.com/docker/machine/releases/download/v0.15.0/docker-machine-$(uname -s)-$(uname -m)
    mv docker-machine-Linux-x86_64 docker-machine
    chmod +x docker-machine
    sudo mv docker-machine /usr/local/bin

fi

# Build Essentials
echo "building essentials..."
sudo apt -y install build-essential

# verify containers
if [ "$(docker ps -q -f name=PhpServer)" ]; then
    echo "server php created"
else 
    echo "starting server php..."
    # make Docker
    sudo docker build --rm -t phpserver .
    ##sudo docker run -itd --privileged -p $IP:$HOSTIP:$DOCKERIP --name=phpserver phpserver

    # Run Server inside docker
    ##sudo docker exec -it phpserver /bin/bash -c /usr/Server/run.sh

    ##sudo docker exec -t -i phpserver /bin/bash
    
fi

