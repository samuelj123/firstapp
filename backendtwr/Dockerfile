#base image
FROM node:8-alpine3.9 as build
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app
RUN npm install
COPY . .

# EXPOSE ${PORT}
# start app
CMD npm run start:dev