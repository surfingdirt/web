FROM node:10.15
ARG NODE_ENV=local

WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
RUN npm run build
EXPOSE 3033
ENTRYPOINT ["npm"]
CMD ["run", "start" ]
