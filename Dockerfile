# Use Node.js official image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install application dependencies using Yarn
RUN yarn

# Copy the rest of the application code to the working directory
COPY . .

# Command to start the development server
CMD ["yarn", "dev"]

# Expose the port on which the application will run
EXPOSE 3000
