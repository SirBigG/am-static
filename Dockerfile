FROM node:6.10.2

WORKDIR /am-static
COPY package.json /am-static/

RUN npm install

COPY . /am-static/

RUN npm run build
