# Use an official Node runtime as a parent image
FROM node:24-alpine AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install && npm install typescript -g

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Serve with Caddy (automatic HTTPS: issues + renews certs itself, no certbot)
FROM caddy:2-alpine

# Caddy config (reverse proxy + SPA + auto-TLS)
COPY Caddyfile /etc/caddy/Caddyfile

# Static build output served by Caddy (matches `root * /srv` in the Caddyfile)
COPY --from=build /app/dist /srv

# HTTP + HTTPS (Caddy redirects 80 -> 443 automatically)
EXPOSE 80 443
