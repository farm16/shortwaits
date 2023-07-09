# ###################
# # BUILD FOR LOCAL DEVELOPMENT
# ###################
# FROM node:18-alpine As build
# USER node
# ENV NODE_ENV production
# WORKDIR /usr/src/app
# COPY --chown=node:node package.json ./
# COPY --chown=node:node yarn.lock ./
# RUN yarn install --frozen-lockfile 
# COPY . .
# RUN --chown=node:node yarn build:backend
# CMD ["node", "dist/apps/sw-api/main.js"]

# ###################
# # BUILD FOR PRODUCTION
# ###################
# FROM node:18-alpine As build
# USER node
# ENV NODE_ENV production
# WORKDIR /usr/src/app
# COPY --chown=node:node package.json ./
# COPY --chown=node:node yarn.lock ./
# RUN yarn install --frozen-lockfile 
# COPY . .
# RUN --chown=node:node yarn build:backend
# CMD ["node", "dist/apps/sw-api/main.js"]

###################
# PRODUCTION
###################
FROM node:18-alpine
RUN apk add g++ make py3-pip
USER node

WORKDIR /usr/src/app
# COPY --chown=node:node package.json ./
# COPY --chown=node:node yarn.lock ./
COPY --chown=node:node . .
RUN yarn install --frozen-lockfile
RUN yarn build:backend
ENV NODE_ENV production
CMD ["node", "dist/apps/sw-api/main.js"]

# https://www.tomray.dev/nestjs-docker-production#conclusion