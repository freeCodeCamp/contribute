# Available Commands in freeCodeCamp

This document explains the commonly used npm/pnpm commands in freeCodeCamp for contributors.

---

## Setup Commands
- `npm install` → Installs all project dependencies.
- `pnpm run develop` → Runs both client and server locally for development.

## Build Commands
- `build` → Builds client, server, and curriculum.
- `build:client` → Builds frontend React client.
- `build:server` → Builds backend server.
- `build:curriculum` → Compiles curriculum files for the platform.

## Clean Commands
- `clean` → Cleans client, server, curriculum, and node_modules.
- `clean:client` → Cleans only client build.
- `clean:server` → Cleans only server build.
- `clean:curriculum` → Cleans curriculum build.

## Test Commands
- `test` → Runs all tests (client, server, curriculum).
- `test:client` → Runs Jest tests for frontend.
- `test:server` → Runs Jest tests for backend.
- `test:curriculum` → Runs tests for curriculum files.

## Cypress / e2e Commands
- `cypress:dev:run` → Runs Cypress end-to-end tests in development.
- `cypress:install` → Installs Cypress testing tool.

## Other Commands
- `docs:serve` → Runs documentation server on port 3400.
- `format` → Runs ESLint and Prettier to format code.
- `prepare` → Installs Husky for Git hooks setup.