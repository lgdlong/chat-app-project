# Chat App Project

A modern real-time chat application built with React, TypeScript, and Bootstrap.

## Table of Contents
- Setup
- Development
- Build
- Docker
- Project Structure

## Setup

### Prerequisites
- Node.js 20.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chat-app-project.git
cd chat-app-project/frontend
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

This will start the Vite development server, typically on `http://localhost:5173`. The page will reload automatically when you make changes to the code.

## Build

To build the project for production:

```bash
npm run build
```

This command:
1. Runs the TypeScript compiler (`tsc -b`)
2. Builds the application with Vite

The output will be in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## Docker

This project includes Docker configuration for easy deployment.

### Building the Docker Image

```bash
docker build -t chat-app-frontend .
```

### Running the Docker Container

```bash
docker run -p 80:80 chat-app-frontend
```

This will:
1. Build the React application in a Node.js container
2. Copy the built files to an Nginx container
3. Serve the application on port 80

### Docker Compose (optional)

If you have a `docker-compose.yml` file in the parent directory:

```bash
cd ..
docker-compose up -d
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── AuthForm.css # Shared styling for auth forms
│   │   ├── AuthHeader.css # Shared styling for auth headers
│   │   ├── LoginForm.tsx
│   │   ├── LoginHeader.tsx
│   │   ├── RegisterForm.tsx
│   │   └── RegisterHeader.tsx
│   ├── pages/           # Page components
│   │   ├── AuthPage.css # Shared styling for auth pages
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── routes/          # Routing configuration
│   │   └── AppRoutes.tsx
│   ├── App.css
│   ├── App.tsx          # Root component
│   ├── index.css        # Global styles
│   └── main.tsx         # Application entry point
├── .dockerignore
├── .gitignore
├── Dockerfile
├── index.html
├── nginx.conf          # Nginx configuration for Docker
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts      # Vite configuration
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build locally

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Bootstrap 5
- React Router v7
- Docker & Nginx (deployment)