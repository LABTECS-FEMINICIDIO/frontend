# Stage 1: Build the React app
FROM node:18-alpine AS builder

ENV NODE_ENV production

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

# Copy app files
COPY . .

# Build the app
RUN yarn build

# Stage 2: Serve the React app with Nginx
FROM nginx:1.21.0-alpine AS production

ENV NODE_ENV production

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
