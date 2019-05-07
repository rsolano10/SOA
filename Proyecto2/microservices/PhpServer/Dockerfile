FROM ubuntu

MAINTAINER ceteam

RUN apt-get update
RUN echo "Hello DockerFile World"

RUN cd /usr

RUN mkdir /usr/Server

ADD Src /usr/Server


RUN ["chmod", "+x", "/usr/Server/run.sh"]

ENTRYPOINT ["top", "-b"]
CMD ["-c"]
