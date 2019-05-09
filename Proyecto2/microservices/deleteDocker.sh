#!/bin/bash

if [ -x "$(command -v docker)" ]; then
    sudo docker container kill phpserver
    sudo docker container rm phpserver 
    sudo docker image rm phpserver  
else
	echo "docker not found"
fi 