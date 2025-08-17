# Step 1: Build React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the app (for production)
RUN npm run build

# Step 2: Use Nginx to serve the built app
FROM nginx:alpine

# Copy build output from step 1 to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose nginx port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
