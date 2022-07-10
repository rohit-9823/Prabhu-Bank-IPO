FROM node:16.13.0 
RUN mkdir -p /tmp/app
WORKDIR /tmp/app
COPY package.json .
COPY . .
RUN npm install
RUN npm run build
