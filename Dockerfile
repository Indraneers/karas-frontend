# Use an official Node runtime as a parent image
FROM node:19-alpine as build

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

# Use an official Nginx runtime as a parent image
FROM nginx:1.21.0-alpine

# Copy the main nginx configuration (nginx.conf)
COPY conf.d/nginx.conf /etc/nginx/nginx.conf

# Copy all templates file to the template folder
COPY conf.d/*.template /etc/nginx/templates/

# Copy the React app build files to the container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]