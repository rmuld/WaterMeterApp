FROM node:alpine
WORKDIR /app
# RUN npm install --global nodemon
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]