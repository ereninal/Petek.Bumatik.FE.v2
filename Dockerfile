# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

RUN npm cache clean
# Install all the dependencies
RUN npm install

RUN npm install -g @angular/cli
# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY /dist/vuexy /usr/share/nginx/html

EXPOSE 4200

SHELL [ "powershell","ng serve" ]

# FROM nginx:1.17.1-alpine
# COPY /dist/petek-bumatik-fe /usr/share/nginx/html