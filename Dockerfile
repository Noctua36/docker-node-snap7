FROM node:6.3.1
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        build-essential
RUN mkdir -p /usr/src/app
# Create app directory
WORKDIR /usr/src/app
# Install app deps
COPY package.json /usr/src/app/
RUN npm install
# Bundle app source
COPY . /usr/src/app
CMD [ "npm", "start" ]