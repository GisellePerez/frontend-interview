# frontend-interview

This repository contains a simple Todo List API built with NestJS and TypeScript, along with a React Vite project scaffold.

## Project Structure

```plaintext
.
├── backend/        # NestJS-based Todo List API
└── frontend/       # React Vite scaffold for the Todo List UI
```

### Backend

The backend API is responsible for handling the Todo List's CRUD operations and is already running. Candidates can use the provided endpoints to manage their Todo List data in the frontend application.

- **API Documentation**: Available at `http://localhost:4000/api/docs`

### Frontend

The frontend is a simple React application using Vite as the build tool. Candidates are expected to build a Todo List UI by consuming the provided API. The scaffold includes basic setup and configurations to get started quickly.

### Installation

This project provides a development environment using **devContainers**. Open the repository in a devContainer using your preferred IDE (e.g., VS Code). The devContainer will have all dependencies pre-installed.

## Running the app

```bash
# development
$ npm run dev
```

## Contact

- Martín Fernández (mfernandez@crunchloop.io)

## About Crunchloop

![crunchloop](https://s3.amazonaws.com/crunchloop.io/logo-blue.png)

We strongly believe in giving back :rocket:. Let's work together [`Get in touch`](https://crunchloop.io/#contact).

## Testing

- Libraries: Vitest, Jest, React Testing Library
- To run tests: `npm run test`
- _Note: node version should be >=20.0.0 and npm version >=10.0.0 (you can run `nvm use` to switch to the correct version if you have nvm installed)_
