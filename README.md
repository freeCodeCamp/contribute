# Contribute

> Documentation site for all things contributions. Begin your contribution journey here.

Welcome to the repository for freeCodeCamp.org's "Contribute" website.

This is the place where you can find information about how to contribute to freeCodeCamp, as well as the code for the website itself. This website is built using [Astro](https://astro.build/) with the [Starlight](https://starlight.astro.build/) theme, deployed on Cloudflare Pages. The goal is to make this a one-stop shop for all things related to contributing to freeCodeCamp.

Here's a Project Board: https://github.com/orgs/freeCodeCamp/projects/40 that shows the current status of the project.

If you're looking for opportunities to contribute to this project, look for help wanted issues in the [issues tab](https://github.com/freeCodeCamp/contribute/issues).

## Getting Started

Your typical development workflow will look something like this:

1. **Fork** this repository to your GitHub account.
2. **Clone** your forked copy of the repository.
3. **Set upstream** to the original repository.
4. **Create a new branch** for your changes.
5. **Make your changes** to the website.
6. **Commit** your changes to your branch.
7. **Push** your branch to your forked repository.
8. **Open a Pull Request** to the original repository.

For more detailed instructions, check out this [contribution guide](https://contribute.freecodecamp.org/how-to-setup-freecodecamp-locally/).

## Development Commands

### Prerequisites

- Node.js (LTS version recommended)
- pnpm v10 (required - do not use npm or yarn)

### Core Development

```bash
# Install pnpm globally if not already installed
npm install -g pnpm

# Install dependencies
pnpm install

# Start the development server (localhost:4321)
pnpm develop

# Build for production
pnpm build

# Build and preview locally using Cloudflare Pages
pnpm preview
```

### Code Quality

```bash
# Run Prettier and ESLint checks
pnpm lint

# Auto-fix Prettier and ESLint issues
pnpm format

# Install Git hooks (runs automatically on install)
pnpm prepare
```

### Testing

```bash
# Run all tests once
pnpm test

# Update test snapshots
pnpm test:update

# Run a specific test file
npx vitest run tests/homepage.test.ts

# Run tests matching a pattern
npx vitest run -t "has correct title"
```

## Deployment

### Cloudflare Pages Deployment

The site is deployed on Cloudflare Pages, please check the wrangler config for details.

## License

Copyright © 2024 freeCodeCamp.org, licensed under the [BSD 3-Clause License](LICENSE).
