---
type: post
title: Docker Network Between Container
subtitle: Creating a network such that two container can communicate
bigimg: /img/feature-image/docker.png
---

We can run multiple container on our host machine using `Docker`. By default when we run multiple container, one cannot communicate with other. If we want our multiple container to communicate between each other we can use `Docker Network`.

`Docker Network` lets you create a *isolated network* where we can connect our container. Container cannot access external network but if other container are connected to same network they can orchestrate between each other. To create a network is simple as

```bash
# docker network create <network_name>
  docker network create anetwork
```

By default `Docker` creates network with `bridge` driver. If you want to create a network with other driver you can use `-d` option. Default option `Docker` accepts are `bridge` and `overlay`. `Bridge` networks are isolated networks on a single Engine installation.

We can now add the container in the network we just created.

----

### 1. Use `--net` when we run our docker

If we want to add our container to network when we execute `docker run` we can use `--net` option which accepts the network name. In order for container to orchestrate `Docker` uses container name so we can use `--name` option to give name to container.

```bash
docker run -d --net=anetwork --name=mysql -e MYSQL_USER=ROOT -e MYSQL_ALLOW_EMPTY_PASSWORD=yes mysql
```

In above command we are running the **mysql** container in network `anetwork` with the name `mysql`. If other container wants to communicate with **mysql** they can use container name i.e `mysql`. Notice we are running our **mysql** container in `deamon` mode with `-d` flag.

Let's add another container to network

```bash
docker run --net=anetwork --name=pythonapp -it python:2.7-wheezy bash
```
Above command adds `pythonapp` into the network `anetwork`. Notice we are starting our `pythonapp` with `-it` flag and we are passing `bash` as argument. When we execute above command we will be interacting `pythonapp` bash shell.

To check if we can communicate with `mysql` we can use `ping` command

```bash
ping mysql
```

<div class='feature-post-image'
     style="padding-top: 55%; background-image: url('/blog/img/2016-10-08-DockerNetworkBetweenContainer/docker-network.gif');">
</div>

----

### 2. Use `docker network connect`
Above process works perfect if you are running a new container. What if you want to create a network and add already running container to newly created network. That's where `docker network connect` comes handy.

Here's a syntax

```bash
docker network connect <network_name> <container_name>
```

You can see that to add existing container to network we first need a **network name** and **container name**.

Assume we have two container with name `mysql` and `pythonapp`. Let's create a network

```bash 
docker network create anetwork
```

To add container to network use `docker network connect`

```bash
docker network connect anetwork mysql
docker network connect anetwork pythonapp
```
<div class='feature-post-image'
     style="padding-top: 55%; background-image: url('/blog/img/2016-10-08-DockerNetworkBetweenContainer/docker-network-connect.gif');">
</div>


That's it, now two container can communicate with each other.
