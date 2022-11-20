FROM node:alpine
WORKDIR /public
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm install --save chart.js react-chartjs-2
RUN npm install styled-components 
CMD ["npm", "run", "start"]