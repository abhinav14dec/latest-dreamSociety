# base image
FROM node:10.16.0-alpine

# set working directory
WORKDIR /dreamSociety-FE/app

# Copy package.json
COPY package.json ./package.json

# install and cache app dependencies
RUN npm install --silent
RUN npm install -g yarn --silent
RUN npm install -g react-scripts --silent

# Bundle app source
COPY . .

# start app
CMD ["yarn", "start"]
