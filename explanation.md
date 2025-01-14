# IP 2 PROJECT 
## Basic Micro-service

### Overview

This project involves the creation of micro-services for a client and backend application, with Node 16-Alpine serving as the base image for each container. The latest version of MongoDB is utilized for the database. The choice of Node 16-Alpine is driven by its small size, contributing to reduced image size.

### 2.Dockerfile Directives

### Client Container
# FROM node:alpine3.18
FROM node:20.0.0-alpine3.17

# setting the working directory
RUN mkdir -p /src/ip/test-client
WORKDIR /src/ip/test-client

# Copying the package.json files to the working directory
COPY package*.json /src/ip/test-client

# Installing the dependencies
RUN npm install --silent
# RUN npm install react-scripts@3.3.1 -g --silent

# Copying the rest of the files to the working directory
COPY . /src/ip/test-client

# Running the app
CMD ["npm", "start"]


### Backend Container

#Using a node alpine image
FROM node:alpine3.18

# setting the working directory
RUN mkdir -p /src/ip/server
WORKDIR /src/ip/server

# Copying the package.json file to the working directory
COPY package*.json /src/ip/server

# Installing the dependencies
RUN npm install --silent

# Copying the resr of the files to the working directory
COPY . /src/ip/server

# Running the app
CMD ["npm", "start"]



### Docker-compose Networking

Networking is implemented through port mapping and a bridge network for secure container communication.

Port mapping-  facilitates the connection between the container and the host, allowing access to the application from outside the Docker environment. Specifically:

The client application is mapped with ports 3000 on both the container and the host: ports: 3000:3000.

The backend application is mapped with ports 5000 on both the container and the host: ports: 5000:5000

Bridge Network is defined and attached to all servoces to enable containers communication. see below from our docker compose yaml
networks:
  app-network:
    driver: bridge

### Docker-compose Volume Definition

    A volume was defined in docker compose as shown below;
    volumes:
      dbdata:
    Usage - they used to persist data across the container shutdown and startup, see below script from docker compose.

    mongodb:
    image: mongo
    restart: always
    ports:
      - 27017:27017
    volumes:
      - dbdata:/data/db
    networks:
      - app-network

###  Git Workflow
Below is the flow:

- Forking: Fork the repository to create a personal copy.

- Cloning: Clone the forked repository to your local machine.

- Committing: Commit changes to the local repository.

- Pushing: Push committed changes to the remote repository.

### Application Execution
Run the following command to bring up the application:

[] docker-compose up - build

[] docker-compose up --build -  For re-building images after Dockerfile changes:


### Good Practices
Containers are named and tagged following Docker image tag naming standards for easy identification.





## IP-3 Project
Tasks

1: Set up the Application server.
C2: reate roles and define the following tasks separately:
    `Install Docker.
    `Clone repository.
    `Docker Compose.
3: Test the application to ensure it creates containers and runs successfully.

## Set up Application Server

  `Run vagrant init to initialize the Vagrantfile.
     Modify the Vagrantfile with instructions to set up the Virtual Box.

      - Create a playbook.yml file.
      - Create an ansible.cfg file.
      - Create a hosts file.
      - Create Roles
      - Create roles with each task as follows, which will generate different folders and modify main.yml for each task and vars files.

## ansible-galaxy init roles/vm-config
## ansible-galaxy init roles/install-docker
## ansible-galaxy init roles/automation

 - vm-config
    - install-docker
    - automation


## Testing

`Run docker-compose up to bring up the application.
`Run vagrant provision to execute the playbook and set up Vagrant.
`Run vagrant ssh to log in to Vagrant.
`Execute sudo docker images to check created images.
`Execute sudo docker ps -a to verify running containers and test the application.


## IP4

# YOLO-App Kubernetes Deployment Readme

## Overview

This readme provides a concise guide for deploying the YOLO-App on Kubernetes, specifically on Google Kubernetes Engine (GKE). The application is structured with stateful components for the database and stateless components for the backend.

### Database (Stateful Application)

- *Component*: MongoDB
- *Orchestration*: StatefulSets
  - Stable network identity and persistent storage.
  - Unique hostnames for each pod ensure reliability.
  - Data persists even with pod rescheduling.

### Backend (Stateless Application)

- *Component*: YOLO-App Backend
- *Orchestration*: Deployments
  - Stateless architecture; no reliance on local storage.
  - Horizontal scaling for dynamic instance management.

## Replication for High Availability

- *Frontend & Backend Deployments*:
  - 2 replicas for each deployment.
  - Ensures continuous availability and backup during disruptions.

## Deployment Steps

1. *Database Setup*:
   - Deploy MongoDB using StatefulSets.
   - Verify stable network identity and persistent storage.

2. *Backend Deployment*:
   - Deploy YOLO-App Backend with Deployments.
   - Confirm stateless architecture and dynamic scaling.

3. *Replication Configuration*:
   - Set up 2 replicas for frontend and backend.
   - Adjust configurations for demand and redundancy.

4. *Testing and Monitoring*:
   - Thoroughly test components.
   - Implement monitoring for efficient issue resolution.

5. *Scaling*:
   - Utilize Kubernetes scaling for dynamic adjustments.
   - Monitor resources and scale based on demand.

