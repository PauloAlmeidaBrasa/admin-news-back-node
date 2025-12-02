FROM node:18-alpine

# WORKDIR /app

WORKDIR /var/www/html

COPY package*.json ./
RUN npm install

COPY . .

# CMD ["npm", "run", "dev"]
