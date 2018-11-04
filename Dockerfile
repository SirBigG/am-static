FROM node:6.14.3

WORKDIR /am-static
ADD package.json /am-static/

RUN npm install

ADD . /am-static/

RUN npm run build
