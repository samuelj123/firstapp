#base image
FROM node:8.12.0
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app
RUN npm install
COPY . .

EXPOSE 8080
# start app
CMD npm run start:dev