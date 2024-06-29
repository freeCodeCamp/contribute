---
title: Setup freeCodeCamp Mobile App locally
---

Follow these guidelines for setting up a development environment for freeCodeCamp. This is highly recommended if you want to contribute regularly.

Some of the contribution workflows – like fixing bugs in the codebase – need you to run the freeCodeCamp app locally.

## How to Prepare your Local Machine

Start by installing the prerequisite software for your operating system.

### Prerequisites

| Prerequisite                      | Version | Notes                                    |
| --------------------------------- | ------- | ---------------------------------------- |
| [Flutter](https://flutter.dev/)   | `3.x`   | -                                        |
| Dart (comes bundled with Flutter) | `3.x`   | We use the version bundled with Flutter. |

:::danger
If you have a different version, please install the recommended version. We can only support installation issues for recommended versions.
:::

If Flutter is already installed on your machine, run the following commands to validate the versions:

```bash
flutter --version
dart --version
```

:::tip
We highly recommend updating to the latest stable releases of the software listed above.
:::

Once you have the prerequisites installed, you need to prepare your development environment. This is common for many development workflows, and you will only need to do this once.

#### Follow these steps to get your development environment ready:

1. Install [Git](https://git-scm.com/) or your favorite Git client, if you haven't already. Update to the latest version; the version that came bundled with your OS may be outdated.

2. Set up [Android Studio](https://developer.android.com/studio) and [Android Emulators](https://developer.android.com/studio/run/managing-avds) with the latest released Android version. We recommend using the Pixel 3a XL and Nexus One(for emulating smaller screens).

3. (Optional for MacOS) Set up Xcode and iOS Simulator with the latest released iOS version.

4. (Optional but recommended) [Set up an SSH Key](https://help.github.com/articles/generating-an-ssh-key/) for GitHub.

5. Install a code editor of your choice.

   We highly recommend using [Visual Studio Code](https://code.visualstudio.com/) or Android Studio. We also recommend installing the official [extensions](https://docs.flutter.dev/get-started/editor?tab=vscode).

## Fork the Repository on GitHub

[Forking](https://help.github.com/articles/about-forks/) is a step where you get your own copy of the repository (a.k.a _repo_) on GitHub.

This is essential, as it allows you to work on your own copy of the freeCodeCamp mobile app on GitHub, or to download (clone) your repository to work on locally. Later, you will be able to request changes to be pulled into the main repository from your fork via a pull request (PR).

:::tip
The main repository at `https://github.com/freeCodeCamp/mobile` is often referred to as the `upstream` repository.

Your fork at `https://github.com/YOUR_USER_NAME/mobile` is often referred to as the `origin` repository. `YOUR_USER_NAME` would be replaced with your GitHub username.
:::

**Follow these steps to fork the `https://github.com/freeCodeCamp/mobile` repository:**

1. Go to the freeCodeCamp mobile repository on GitHub: <https://github.com/freeCodeCamp/mobile>

2. Click the "Fork" Button in the upper right-hand corner of the interface ([More Details Here](https://help.github.com/articles/fork-a-repo/))

3. After the repository has been forked, you will be taken to your copy of the repository at `https://github.com/YOUR_USER_NAME/mobile` (`YOUR_USER_NAME` would be replaced with your GitHub user name.)

## Clone your Fork from GitHub

[Cloning](https://help.github.com/articles/cloning-a-repository/) is where you **download** a copy of a repository from a `remote` location that is either owned by you or by someone else. In your case, this remote location is your `fork` of freeCodeCamp's repository which should be available at `https://github.com/YOUR_USER_NAME/mobile`. (`YOUR_USER_NAME` would be replaced with your GitHub user name.)

Run these commands on your local machine:

1. Open a Terminal / Command Prompt / Shell in your projects directory

   _i.e.: `/yourprojectsdirectory/`_

2. Clone your fork of freeCodeCamp, replacing `YOUR_USER_NAME` with your GitHub Username

   ```bash
   git clone --depth=1 https://github.com/YOUR_USER_NAME/mobile.git
   ```

This will download the entire freeCodeCamp mobile repository to your projects directory.

:::note
`--depth=1` creates a shallow clone of your fork, with only the most recent history/commit.
:::

## Set up Syncing from Parent

Now that you have downloaded a copy of your fork, you will need to set up an `upstream` remote to the parent repository.

[As mentioned earlier](#fork-the-repository-on-github), the main repository is referred to as the `upstream` repository. Your fork is referred to as the `origin` repository.

You need a reference from your local clone to the `upstream` repository in addition to the `origin` repository. This is so that you can sync changes from the main repository without the requirement of forking and cloning repeatedly.

1. Change directory to the new `mobile` directory:

   ```bash
   cd mobile
   ```

2. Add a remote reference to the main freeCodeCamp mobile repository:

   ```bash
   git remote add upstream https://github.com/freeCodeCamp/mobile.git
   ```

3. Ensure the configuration looks correct:

   ```bash
   git remote -v
   ```

   The output should look something like below (replacing `YOUR_USER_NAME` with your GitHub username):

   ```bash
   origin    https://github.com/YOUR_USER_NAME/mobile.git (fetch)
   origin    https://github.com/YOUR_USER_NAME/mobile.git (push)
   upstream    https://github.com/freeCodeCamp/mobile.git (fetch)
   upstream    https://github.com/freeCodeCamp/mobile.git (push)
   ```

## Running freeCodeCamp Mobile App Locally

Now that you have a local copy of the mobile app, you can follow these instructions to run it locally.

If you do run into issues, first perform a web search for your issue and see if it has already been answered. If you cannot find a solution, please search our [GitHub issues](https://github.com/freeCodeCamp/mobile/issues) page for a solution and report the issue if it has not yet been reported.

And as always, feel free to ask questions on the ['Contributors' category on our forum](https://forum.freecodecamp.org/c/contributors) or [our chat server](https://discord.gg/PRyKn3Vbay).

:::note
The `mobile` directory contains two folders ie. `mobile-api` and `mobile-app`. `mobile-api` contains the API code used for serving the podcasts. `mobile-app` contains the Flutter app which is where you should be when you follow the below steps.
:::

### Configuring Dependencies

#### Step 1: Set Up the Environment Variable File

The default API keys and environment variables are stored in the file `sample.env`. This file needs to be copied to a new file named `.env` which is accessed dynamically during the installation step. Remember to change the directory to `mobile-app` before running the following commands.

```bash
# Create a copy of the "sample.env" and name it ".env".
# Populate it with the necessary API keys and secrets:
```

#### **macOS/Linux**

```bash
cp sample.env .env
```

#### **Windows**

```bash
copy sample.env .env
```

The keys in the `.env` file are _not_ required to be changed to run the app locally. You can leave the default values copied over from `sample.env` as-is.

#### Step 2: Install dependencies

This step will install the dependencies required for the application to run:

```bash
flutter pub get
```

#### Step 3: Start the freeCodeCamp mobile app

Start the emulator of your choice(Android or iOS) and wait for the bootup process to complete.

You can now start the app by running the following command:

```bash
flutter run
```

:::tip
If you're using VSCode or Android Studio then you can easily start the app without having to execute any terminal commands. More information [here](https://docs.flutter.dev/get-started/test-drive).
:::

## Making Changes Locally

You can now make changes to files and commit your changes to the local clone of your fork.

Follow these steps:

1. Validate that you are on the `main` branch:

   ```bash
   git status
   ```

   You should get an output like this:

   ```bash
   On branch main
   Your branch is up-to-date with 'origin/main'.

   nothing to commit, working directory clean
   ```

   If you are not on main or your working directory is not clean, resolve any outstanding files/commits and checkout `main`:

   ```bash
   git checkout main
   ```

2. Sync the latest changes from the upstream `main` branch to your local main branch:

:::caution
If you have any outstanding pull request that you made from the `main` branch of your fork, you will lose them at the end of this step.
You should ensure your pull request is merged by a moderator before performing this step. To avoid this scenario, you should **always** work on a branch other than the `main`.
:::

This step **will sync the latest changes** from the main repository of freeCodeCamp mobile. It is important that you rebase your branch on top of the latest `upstream/main` as often as possible to avoid conflicts later.

Update your local copy of the freeCodeCamp mobile upstream repository:

```bash
git fetch upstream
```

Hard reset your main branch with the freeCodeCamp mobile main:

```bash
git reset --hard upstream/main
```

Push your main branch to your origin to have a clean history on your fork on GitHub:

```bash
git push origin main --force
```

You can validate that your current main matches the upstream/main by performing a diff:

```bash
git diff upstream/main
```

The resulting output should be empty.

3. Create a fresh new branch:

   Working on a separate branch for each issue helps you keep your local work copy clean. You should never work on the `main`. This will soil your copy of freeCodeCamp mobile and you may have to start over with a fresh clone or fork.

   Check that you are on `main` as explained previously, and branch off from there:

   ```bash
   git checkout -b fix/update-guide-for-xyz
   ```

   Your branch name should start with a `fix/`, `feat/`, `docs/`, etc. Avoid using issue numbers in branches. Keep them short, meaningful, and unique.

   Some examples of good branch names are:

   ```md
   fix/update-challenges-for-react
   fix/update-guide-for-html-css
   fix/platform-bug-sign-in-issues
   feat/add-guide-article-for-javascript
   translate/add-spanish-basic-html
   ```

4. Edit pages and work on code in your favorite text editor.

5. Once you are happy with the changes you should optionally run the mobile app locally to preview the changes.

6. Make sure you fix any errors and check the formatting of your changes.

7. Check and confirm the files you are updating:

   ```bash
   git status
   ```

   This should show a list of `unstaged` files that you have edited.

   ```bash
   On branch feat/documentation
   Your branch is up to date with 'upstream/feat/documentation'.

   Changes were not staged for commit:
   (use "git add/rm <file>..." to update what will be committed)
   (use "git checkout -- <file>..." to discard changes in the working directory)

       modified:   README.md
       modified:   mobile-app/lib/main.dart
   ...
   ```

8. Stage the changes and make a commit:

   In this step, you should only mark files that you have edited or added yourself. You can perform a reset and resolve files that you did not intend to change if needed.

   ```bash
   git add path/to/my/changed/file.ext
   ```

   Or you can add all the `unstaged` files to the staging area:

   ```bash
   git add .
   ```

   Only the files that were moved to the staging area will be added when you make a commit.

   ```bash
   git status
   ```

   Output:

   ```bash
   On branch feat/documentation
   Your branch is up to date with 'upstream/feat/documentation'.

   Changes to be committed:
   (use "git reset HEAD <file>..." to unstage)

       modified:   README.md
       modified:   mobile-app/lib/main.dart
   ```

   Now, you can commit your changes with a short message like so:

   ```bash
   git commit -m "fix: my short commit message"
   ```

   Some examples:

   ```md
   fix: update guide article for Java - for loop
   feat: add guide article for alexa skills
   ```

   Optional:

   We highly recommend making a conventional commit message. This is a good practice that you will see on some of the popular Open Source repositories. As a developer, this encourages you to follow standard practices.

   Some examples of conventional commit messages are:

   ```md
   fix: update HTML guide article
   fix: update build scripts for Travis-CI
   feat: add article for JavaScript hoisting
   docs: update contributing guidelines
   ```

   Keep these short, not more than 50 characters. You can always add additional information in the description of the commit message.

   This does not take any additional time than an unconventional message like 'update file' or 'add index.md'

   You can learn more about why you should use conventional commits [here](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#why-use-conventional-commits).

9. If you realize that you need to edit a file or update the commit message after making a commit you can do so after editing the files with:

   ```bash
   git commit --amend
   ```

   This will open up a default text editor like `nano` or `vi` where you can edit the commit message title and add/edit the description.

10. Next, you can push your changes to your fork:

    ```bash
    git push origin branch/name-here
    ```

## Running mobile curriculum tests

:::note
You only need to follow this section if you're modifying the challenge test runner in the mobile app. Otherwise, you can go to the next section on [how to open a pull request](#proposing-a-pull-request-pr).
:::

1. Clone a copy of the [freeCodeCamp repo](https://github.com/freeCodeCamp/freeCodeCamp) locally outside of your local copy of the freeCodeCamp mobile repo. Your folder structure should look like this:

   ```bash
   ├── freeCodeCamp
   ├── mobile
   ```

2. Change the directory to the freeCodeCamp repo:

   ```bash
   cd freeCodeCamp
   ```

3. Make a copy of the `.env` file:

   #### **macOS/Linux**

   ```bash
   cp sample.env .env
   ```

   #### **Windows**

   ```bash
   copy sample.env .env
   ```

4. Install the dependencies for the freeCodeCamp repo:

   ```bash
   pnpm install && pnpm run create:shared
   ```

5. Generate the challenge data JSON file:

   ```bash
   pnpm run build:curriculum
   ```

6. Copy the generated JSON file to the mobile app:

   #### **macOS/Linux**

   ```bash
   cp ./shared/config/curriculum.json ../mobile/mobile-app/curriculum.json
   ```

   #### **Windows**

   ```bash
   copy .\shared\config\curriculum.json ..\mobile\mobile-app\curriculum.json
   ```

7. Change directory to the mobile app:

   ```bash
   cd ../mobile/mobile-app
   ```

8. Install the dependencies for the mobile app:

   ```bash
   flutter pub get
   ```

9. Update the test file to use the challenge data JSON file:

   ```bash
   sed -i '' 's/..\/..\/shared\/config\/curriculum.json/.\/curriculum.json/g' test/widget_test.dart
   ```

10. Generate the challenge files:

    ```bash
    flutter test test/widget_test.dart
    ```

11. Start a local server to serve the challenge files with the help of `serve` package:

    ```bash
    npx serve
    ```

12. In a different terminal go back to the freeCodeCamp repo:

    ```bash
    cd ../../freeCodeCamp
    ```

13. Run the Playwright tests:

    ```bash
    pnpm playwright:run --config=playwright-mobile.config.ts
    ```

## Proposing a Pull Request (PR)

After you've committed your changes, check here for [how to open a Pull Request](/how-to-open-a-pull-request).

<!-- ## Quick commands reference - NEED TO DISCUSS ABOUT THIS

A quick reference to the commands that you will need when working locally.

| command                                                        | description                                                                         |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `npm ci`                                                       | Installs / re-install all dependencies and bootstraps the different services.       |
| `npm run seed`                                                 | Parses all the challenge markdown files and inserts them into MongoDB.              | -->

## Troubleshooting

### Issues with installing the recommended prerequisites

We regularly develop on the latest or most popular operating systems like macOS 10.15 or later, Ubuntu 18.04 or later, and Windows 10 (with WSL2).

It is recommended to research your specific issue on resources such as Google, Stack Overflow, and Stack Exchange. There is a good chance that someone has faced the same issue and there is already an answer to your specific query.

If you are on a different OS and/or are still running into issues, see [getting help](#getting-help).

### Issues with the UI, build errors, etc.

If you face issues with the UI, or build errors a cleanup can be useful:

```bash
flutter clean
```

### Issues Installing Dependencies

If you get errors while installing the dependencies, please make sure that you are not in a restricted network or that your firewall settings do not prevent you from accessing resources.

Be patient as the first-time setup can take a while depending on your network bandwidth.

## Getting Help

If you are stuck and need help, feel free to ask questions on the ['Contributors' category on our forum](https://forum.freecodecamp.org/c/contributors) or [the contributors chat room](https://discord.gg/PRyKn3Vbay).

There might be an error in the console of your browser or in Bash / Terminal / Command Line that will help identify the problem. Provide this error message in your problem description so others can more easily identify the issue and help you find a resolution.
