# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port 4000 for the application
EXPOSE 4000
EXPOSE 3000

# Define the command to run the application
CMD [ "tsx app.ts", "npm start" ]