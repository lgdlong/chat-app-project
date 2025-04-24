# ===============================
# Stage 1: Build with Node + Vite
# ===============================
FROM node:20-alpine AS build

WORKDIR /app

# Install deps first (cache layer)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build production app (Vite outputs to /dist)
RUN npm run build


# ===============================
# Stage 2: Serve with NGINX
# ===============================
FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Add custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
