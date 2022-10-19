

## Docker
## Create an image called client on Docker
`docker build -f Dockerfile -t server .` 

## Test if this Dockerfile is working.
`docker run -it -p 4002:3001 server`

Node.js home route is okay and the app is working inside Docker.\
Open [http://localhost:4001](http://localhost:4001) to view it in your browser.
