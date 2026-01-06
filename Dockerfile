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
# ---------- BUILD STAGE ----------
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- RUNTIME STAGE ----------
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy only compiled output
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install ONLY production deps
RUN npm ci --omit=dev

CMD ["node", "-r", "tsconfig-paths/register", "dist/config/server.js"]


