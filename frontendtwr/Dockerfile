# base image
FROM node:12-alpine3.9 as build
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app
RUN npm install
COPY . .

RUN ng build --prod --output-path=dist


# start app
# CMD ng serve --host 0.0.0.0 --disableHostCheck true

# ############
# ### prod ###
# ############

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
