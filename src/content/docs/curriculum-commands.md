---
title: FreeCodeCamp command documentation
---

Our main repository comes with several different CLI commands designed to
make developing the course content as easy as possible. Here's a list of everything that
is included.

## Building

1. `prebuild`

   This command executes before the rest of the build commands are executed and sets up
   our shared library code. Inside the shared library is the configuration and utils which
   are used in multiple workspaces.

2. `build`

   This script runs the `build:client`, `build:curriculum`, and `build:server` scripts, which build the client, curriculum, and server code, respectively.

   - `build-workers`

     This script builds the worker code for the client.

   - `build:client`

     This script builds the client code, aka the elements visible on the page.

   - `build:curriculum`

     This script builds the curriculum challenges for all of the projects.

3. `clean`

   This command runs the `clean:client`, `clean:server`, `clean:curriculum`, and `clean:packages` scripts, which clean the client, server, curriculum, and package directories, respectively.

   - `clean-and-develop`

     This script runs the clean and develop scripts which fully remove all downloaded packages and built curriculum
     files, then reinstalls all the dependencies for the app. After which it runs the freeCodeCamp homepage.

   - `clean:api`

     This script cleans the API directory by removing the API's `dist` folder.

   - `clean:client`

     This script cleans the client files by removing the built Gatsby files.

   - `clean:curriculum`

     This script removes the JSON file holding the list of the cached curriculum projects.

   - `clean:packages`

     This script removes the `node_modules` folder for the entire project.

   - `clean:server`

     This script removes the `lib` folder for the API server subfolder as it contains the babelized
     output of the API server source.

## Editing Challenges

There are a few different commands related to editing the freeCodeCamp challenges.

1. `audit-challenges`

This script runs the challenge auditor and checks for any potential problems in the curriculum.

2. `challenge-editor`

This script runs the web-based tool to help edit challenges.

2.a `challenge-editor:client`

This script runs client portion of the web-based tool to edit challenges.

2.b `challenge-editor:server`

This script runs the api portion of the web-based tool to edit challenges.

## Testing

Currently, there are two main test frameworks for the freeCodeCamp platform: Cypress and Playwright. We are
in the process of phasing out Cypress and exclusively using Playwright though. Regardless, this information will
remain present for the sake of posterity.

### Unit Testing

1. `test`

This builds the shared library, the curriculum, and the web workers then runs all of the the
test subcommands.

1.a `test:source`

    This script runs the Jest tests for the main project, the client, and the API server.

1.b `test:api`

    This script runs all of the tests for the API.

1.c `test:curriculum`

    This script tests to see if the entire curriculum is working with the Mocha test runner.

1.d `test:curriculum-full-output`

    This script tests to see if the entire curriculum is working with the Mocha test runner with full
    output provided.

1.e `test-client`

    This script runs the Jest tests for the client project.

1.f `test-config`

    This script runs the Jest tests for the configuration.

1.g `test-curriculum-js`

    This script runs the Jest tests for the curriculum components.

1.h `test-server`

    This script runs the Jest tests for the api server.

1.i `test-tools`

    This script run the Jest tests for all of our curriculum tools.

1.j `test-utils`

    This script runs the Jest tests for all of the utility scripts scattered throughout
    the projects.

### End to End testing

Currently, there are two main test frameworks for testing if the platform works in the browser: Cypress and Playwright. We are
in the process of phasing out Cypress and exclusively using Playwright though. Regardless, this information will
remain present for the sake of posterity.

#### Cypress

1. `precypress`

   This script opens up a child process that runs the Cypress install command.

2. `cypress`

   This script doesn't do anything on its own and is just a shortcut to the Cypress command itself.

   - `cypress:dev:run`

     This script runs Cypress and displays all of the tests on the command line.

   - `cypress:dev:watch`

     This script runs Cypress and displays all of the tests in a GUI.

   - `cypress:install`

     This script installs Cypress.

   - `cypress:install-build-tools`

     This script installs all the dependencies necessary to perform Cypress testing. This script must be
     executed on a Linux system. Otherwise, it will not work.

#### Playwright

1. `playwright:install-build-tools`

   This script setups Playwright on the host operating system.

2. `playwright:run`

   This script runs all of the Playwright tests in the `e2e` folder on the commandline.

3. `playwright:watch`

   This script runs all of the Playwright tests in the `e2e` folder in a GUI.

## Formatting

1. `prelint`

This script executes before the main lint script runs and builds all of the shared library code.

2. `lint`

This script transpiles our shared library and then proceeds to run all of the lint subcommands.

2.a `lint:challenges`

This script lints all of the challenges for the curriculum.

2.b `lint:js`

This script lints all of the Javascript code using Eslint.

2.c `lint:ts`

This script transpiles the main source, the shared library, and the api.

2.d `lint:prettier`

This script lints the codebase using Prettier.

3. `format`

This script reformats the entire project using both Eslint and Prettier.

3.a `format: eslint`

This script uses Eslint exclusively to fix formatting issues.

3.b `format: prettier`

This script uses Prettier exclusively to rewrite the files with the correct formatting.
