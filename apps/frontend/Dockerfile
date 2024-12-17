# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy workspace dependencies
COPY ../../pnpm-lock.yaml ../../package.json ../../pnpm-workspace.yaml ./
COPY ./package.json ./apps/frontend/

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install 

# Copy frontend code
COPY ./ ./apps/frontend/

# Build React app
RUN pnpm --filter frontend dev

# Serve the app using a lightweight server
RUN npm install -g serve
CMD ["serve", "-s", "dist"]
