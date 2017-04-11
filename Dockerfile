FROM node:6.10.2

WORKDIR /src
COPY package.json /src/

RUN npm install

COPY . /src/

RUN npm run build
