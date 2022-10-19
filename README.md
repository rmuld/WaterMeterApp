
## Steps to set upt the WaterMeter full-stack project
### Server
`npm install cors express mysql2`

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

### Client
`npx create-react-app client --use-npm`
`npm install axios bootstrap react-bootstrap`

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Prerequsites
Have Node.js and Docker installed


# Docker

## Create server image
`docker build -f Dockerfile -t server .`

## execute the server image
`docker run -it -p 4002:3001 server`

## NGINX
Create default.conf file
Create Dockerfile

## Create docker-compose.yml 
## Create root and setup.sql 
When the mysql_db instance has been created, this script will be executed, and a table books_reviews will automatically create the defined fields.


## Run and test the fully containerized application instance on project root
`docker-compose up --build`

## you can access the Adminer 
Use route http://localhost:8000/

## To start interacting with the application
open http://localhost:3050/ on a browser