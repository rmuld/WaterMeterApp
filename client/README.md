# WaterMeter Client
The fron-end of the application

## Available Scripts

In the client directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.




## Docker
## Create an image called client on Docker
`docker build -f Dockerfile -t client .` 

## Test if this Dockerfile is working.
`docker run -it -p 4001:3000 client`

React app is working inside Docker.\
Open [http://localhost:4001](http://localhost:4001) to view it in your browser.
