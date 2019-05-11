#!/bin/bash

# Creating 6 nodes 
echo "### Creating nodes ..."
for c in {1..3} ; do
    docker-machine create -d virtualbox php$c
done

# Get IP from leader node
leader_ip=$(docker-machine ip php1)

# Init Docker Swarm mode
echo "### Initializing Swarm mode ..."
eval $(docker-machine env php1)
docker swarm init --advertise-addr $leader_ip

#init process
#docker service create --replicas 5 -p 8008:8008 --name server rsolano10/phpserver
#docker pull rsolano10/visualizer
#docker service create \
#  --name=viz2 \
#  --publish=8000:8080/tcp \
#  --constraint=node.role==manager \
#  --mount=type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
#  rsolano10/visualizer

#Init GUI 
#git clone https://github.com/dockersamples/docker-swarm-visualizer.git
#cd docker-swarm-visualizer
#docker build -t visualizer-custom:latest .

# Swarm tokens
manager_token=$(docker swarm join-token manager -q)
worker_token=$(docker swarm join-token worker -q)

# Joinig manager nodes
echo "### Joining manager modes ..."
eval $(docker-machine env php2)
docker swarm join --token $manager_token $leader_ip:2377

# Join worker nodes
echo "### Joining worker modes ..."
eval $(docker-machine env php3)
docker swarm join --token $worker_token $leader_ip:2377

# Clean Docker client environment
echo "### Cleaning Docker client environment ..."
eval $(docker-machine env -u)
