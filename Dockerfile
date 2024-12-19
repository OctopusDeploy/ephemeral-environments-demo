# Use the official Node.js 20 image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY ./app/package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app files to the working directory
COPY ./app .

# Build the app
RUN npm run build

# Expose the port that the app will be running on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]