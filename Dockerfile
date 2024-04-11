# Using Node.js 20 as a base image
FROM node:20-slim AS base
# Setting up environment variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Enabling pnpm
RUN corepack enable
# Copying the application to the container
COPY . /app
# Setting the working directory
WORKDIR /app

# Installing production dependencies
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Building the application
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Final stage: Copying necessary files and preparing the command to run
FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
# Exposing the application on port 8000
EXPOSE 8000
# Command to run the application
CMD [ "pnpm", "start" ]