# Contribute

> docs site for all things contributions. begin your contribution journey here.

Welcome to the repository for freeCodeCamp.org's "Contribute" website.

This is the place where you can find information about how to contribute to freeCodeCamp, as well as the code for the website itself. This website is built using [Astro](https://astro.build/), a modern static site generator. The goal is to make this a one-stop-shop for all things related to contributing to freeCodeCamp.

Here's a Project Board: https://github.com/orgs/freeCodeCamp/projects/40 that shows the current status of the project.

If you're looking for for opportunities to contribute to this project, look for help wanted issues in the [issues tab](https://github.com/freeCodeCamp/contribute/issues).

> [!WARNING]
> This repository is under a heavy refactoring/development phase. We are building out a brand-new experience for our contributors. Please get in touch over on our discord: https://chat.freecodecamp.org if you have any questions or need help.

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

For more detailed instructions, check out this guide (_TBD_).

Develop the project:

```bash
npm install -g pnpm
pnpm install
pnpm develop
```

Build and Deploy the project (VM):

```bash
pnpm build
pnpm start
```

Build and Deploy the project (Cloudflare Pages):

Set these in the Build configuration:

- Framework Preset: `none` - Astro is available as a preset, but we're not using it.
- Build Command: `pnpm build`
- Build Directory: `dist`

Leave the remaining settings as their defaults.

# License

Copyright © 2024 freeCodeCamp.org, licensed under the [BSD 3-Clause License](LICENSE).
