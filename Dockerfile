# FROM node:18-alpine

# WORKDIR /app

# # Copy only package files first (better cache)
# COPY package*.json ./

# RUN npm i

# # Copy the rest AFTER install
# COPY . .


# # FROM node:18-alpine

# # WORKDIR /app


# # COPY package*.json ./
# # RUN npm install

# # COPY . .


# ---------- BUILD STAGE ----------
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build   # tsc runs HERE (CI, not EC2)

# ---------- RUNTIME STAGE ----------
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

CMD ["node", "dist/config/server.js"]


