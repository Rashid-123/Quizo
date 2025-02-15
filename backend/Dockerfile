# Use an official Node.js image for backend
FROM node:18-alpine AS backend

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Build the TypeScript backend
RUN npm run build

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
