# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy workspace dependencies
COPY ../../pnpm-lock.yaml ../../package.json ../../pnpm-workspace.yaml ./
COPY ./package.json ./apps/backend/

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy backend code
COPY ./ ./apps/backend/

# Build the app (if using TypeScript)
RUN pnpm --filter backend run build

# Start the app
CMD ["pnpm", "--filter", "backend", "start"]
