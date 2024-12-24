# Build stage
FROM node:20-slim as build

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Install serve
RUN npm install -g serve

# Production stage - using the same image to serve
EXPOSE 8080

# Serve the static files
CMD ["serve", "-s", "dist", "-l", "8080"]