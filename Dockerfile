# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the required dependencies
RUN npm install

# Copy the entire frontend application to the container
COPY . .

# Build the production-ready optimized version of the frontend
RUN npm run build

# Expose the port that the frontend application will run on
EXPOSE 3000

# Define the command to start the frontend application
CMD ["npm", "start"]
