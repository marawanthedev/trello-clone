# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /apps/backend/

# Copy workspace dependencies (pnpm-lock.yaml, package.json, and pnpm-workspace.yaml) into the correct location
COPY package.json pnpm-lock.yaml prisma ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies using pnpm (at this point, package.json and pnpm-lock.yaml should exist in /apps/backend)
RUN pnpm install

# Copy the rest of the backend code into the container
COPY ./ ./apps/backend/

# Run Prisma generate to create the Prisma client
RUN pnpm run

# Apply Prisma migrations (if needed, this applies the schema to the database)
RUN pnpm prisma migrate 

# Build the backend app (if using TypeScript)
RUN npx tsc -p ./apps/backend/tsconfig.json --outDir ./dist

# Expose the port the app will run on
EXPOSE 3000

# Start the backend app
CMD ["pnpm", "run", "start"]
