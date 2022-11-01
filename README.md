# WaterMeter V1

## Steps to set upt the WaterMeter full-stack project

Clone repository from https://github.com/rmuld/WaterMeterApp

## Before starting the application
Create environment variables into .env file in project root
    MYSQL_DATABASE=watermeter
    MYSQL_USER=exampleuser
    MYSQL_PASSWORD=example123
    MYSQL_ROOT_PASSWORD=example123
    MYSQL_HOST_IP=mysql_db

For Server connection you need these variables:
    DB_USER=exampleuser
    DB_PASSWORD=example123
    DATABASE=watermeter
    HOST=localhost
    JWT_SECRET=example123
    SALTROUNDS=5

## Prerequsites
Have Node.js and Docker installed

## Install dependencies
`npm install`

## Run and test the fully containerized application instance on project root
`docker-compose up --build`
