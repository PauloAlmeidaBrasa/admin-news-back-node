FROM node:18-alpine

WORKDIR /app

# Copy only package files first (better cache)
COPY package*.json ./

RUN npm i

# Copy the rest AFTER install
COPY . .


# FROM node:18-alpine

# WORKDIR /app


# COPY package*.json ./
# RUN npm install

# COPY . .

