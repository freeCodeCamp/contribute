---
title: Setup freeCodeCamp Mobile App locally
---

Folge dieser Anleitung, um die freeCodeCamp mobile App lokal auf deinem System einzurichten. Dies ist sehr empfehlenswert, wenn du regelmäßig einen Beitrag leisten willst.

Some of the contribution workflows – like fixing bugs in the codebase – need you to run the freeCodeCamp app locally.

## How to Prepare your Local Machine

Installiere zunächst die erforderliche Software für dein Betriebssystem.

### Prerequisites

| Voraussetzung                                 | Version | Notizen                                                       |
| --------------------------------------------- | ------- | ------------------------------------------------------------- |
| [Flutter](https://flutter.dev/)               | `3.x`   | -                                                             |
| Dart (wird zusammen mit Flutter ausgeliefert) | `3.x`   | Wir verwenden die Version, die mit Flutter ausgeliefert wird. |

:::danger
Wenn du eine andere Version hast, installiere bitte die empfohlene Version. Wir können nur Installationsprobleme für die empfohlenen Versionen unterstützen.
:::

Wenn Flutter bereits auf deinem Rechner installiert ist, führe die folgenden Befehle aus, um die Versionen zu überprüfen:

```bash
flutter --version
dart --version
```

:::tip
Wir empfehlen dringend, auf die neuesten stabilen Versionen der oben aufgeführten Software zu aktualisieren.
:::

Sobald du die notwendigen Ressourcen installiert hast, musst du deine Entwicklungsumgebung vorbereiten. Dies ist bei vielen Entwicklungsabläufen üblich, und du musst dies nur einmal tun.

#### Follow these steps to get your development environment ready:

1. Installiere [Git](https://git-scm.com/) oder deinen bevorzugten Git-Client, falls du das nicht schon getan hast. Aktualisiere die neueste Version; die Version, die mit deinem Betriebssystem mitgeliefert wurde, ist möglicherweise veraltet.

2. Set up [Android Studio](https://developer.android.com/studio) and [Android Emulators](https://developer.android.com/studio/run/managing-avds) with the latest released Android version. Wir empfehlen die Verwendung des Pixel 3a XL und Nexus One (für die Emulation kleinerer Bildschirme).

3. (Optional for MacOS) Set up Xcode and iOS Simulator with the latest released iOS version.

4. (Optional, aber empfohlen) [Richte einen SSH-Schlüssel](https://help.github.com/articles/generating-an-ssh-key/) für GitHub ein.

5. Installiere einen Code-Editor deiner Wahl.

   Wir empfehlen dringend die Verwendung von [Visual Studio Code](https://code.visualstudio.com/) oder Android Studio. Wir empfehlen auch die Installation der offiziellen [Erweiterungen](https://docs.flutter.dev/get-started/editor?tab=vscode).

## Fork the Repository on GitHub

[Forking](https://help.github.com/articles/about-forks/) ist ein Schritt, bei dem du deine eigene Kopie des Repositorys (auch bekannt als _Repo_) auf GitHub erhältst.

This is essential, as it allows you to work on your own copy of the freeCodeCamp mobile app on GitHub, or to download (clone) your repository to work on locally. Später kannst du über einen Pull Request (PR) beantragen, dass Änderungen aus deinem Fork in das Haupt-Repository gezogen werden.

:::tip
Das Haupt-Repository unter `https://github.com/freeCodeCamp/mobile` wird oft als `upstream`-Repository bezeichnet.
Dein Fork unter `https://github.com/YOUR_USER_NAME/mobile` wird oft als `origin`-Repository bezeichnet. `YOUR_USER_NAME` wird durch deinen GitHub-Benutzernamen ersetzt.
:::

**Folge diesen Schritten, um das `https://github.com/freeCodeCamp/mobile`-Repository zu forken:**

1. Gehe zum freeCodeCamp mobile Repository auf GitHub: <https://github.com/freeCodeCamp/mobile>

2. Klicke auf den "Fork"-Button in der oberen rechten Ecke der Benutzeroberfläche ([Mehr Details hier](https://help.github.com/articles/fork-a-repo/))

3. Nachdem das Repository geforkt wurde, gelangst du zu deiner Kopie des Repositorys unter `https://github.com/YOUR_USER_NAME/mobile` (`YOUR_USER_NAME` würde durch deinen GitHub-Benutzernamen ersetzt werden)

## Clone your Fork from GitHub

Beim [Klonen](https://help.github.com/articles/cloning-a-repository/) **downloadest ** du eine Kopie eines Repositorys von einem `remote`- Ort, der entweder dir oder einer anderen Person gehört. In your case, this remote location is your `fork` of freeCodeCamp's repository which should be available at `https://github.com/YOUR_USER_NAME/mobile`. (`YOUR_USER_NAME` wird durch deinen GitHub-Benutzernamen ersetzt.)

Führe diese Befehle auf deinem lokalen Rechner aus:

1. Öffne ein Terminal / Command Prompt / Shell in deinem Projektverzeichnis

   _z.B.: `/yourprojectsdirectory/`_

2. Klone deinen Fork von freeCodeCamp und ersetze `YOUR_USER_NAME` durch deinen GitHub Benutzernamen

   ```bash
   git clone --depth=1 https://github.com/YOUR_USER_NAME/mobile.git
   ```

Dadurch wird das gesamte freeCodeCamp mobile Repository in dein Projektverzeichnis heruntergeladen.

Hinweis: `--depth=1` erstellt einen oberflächlichen Klon deines Forks, der nur den jüngsten Verlauf/Commit enthält.

## Set up Syncing from Parent

Jetzt, wo du eine Kopie deines Forks heruntergeladen hast, musst du einen `upstream` zum übergeordneten Repository einrichten.

[As mentioned earlier](#fork-the-repository-on-github), the main repository is referred to as the `upstream` repository. Your fork is referred to as the `origin` repository.

Du benötigst eine Referenz von deinem lokalen Klon auf das `upstream`-Repository zusätzlich zum `origin`-Repository. Auf diese Weise kannst du Änderungen aus dem Haupt-Repository synchronisieren, ohne dass du wiederholt forken und klonen musst.

1. Wechsle in das neue `mobile`-Verzeichnis:

   ```bash
   cd mobile
   ```

2. Füge eine Remote-Referenz zum Haupt-Repository von freeCodeCamp mobile hinzu:

   ```bash
   git remote add upstream https://github.com/freeCodeCamp/mobile.git
   ```

3. Stelle sicher, dass die Konfiguration korrekt aussieht:

   ```bash
   git remote -v
   ```

   Die Ausgabe sollte in etwas so aussehen wie unten (ersetze `YOUR_USER_NAME` durch deinen GitHub Benutzernamen):

   ```bash
   origin    https://github.com/YOUR_USER_NAME/mobile.git (fetch)
   origin    https://github.com/YOUR_USER_NAME/mobile.git (push)
   upstream    https://github.com/freeCodeCamp/mobile.git (fetch)
   upstream    https://github.com/freeCodeCamp/mobile.git (push)
   ```

## Running freeCodeCamp Mobile App Locally

Jetzt, da du eine lokale Kopie der mobilen Anwendung hast, kannst du die folgenden Anweisungen befolgen, um sie lokal auszuführen.

Wenn du auf Probleme stößt, führe zunächst eine Suche nach deinem Problem im Web durch und siehe nach, ob es bereits beantwortet wurde. Wenn du keine Lösung findest, suche bitte auf unserer [GitHub issues](https://github.com/freeCodeCamp/mobile/issues) Seite nach einer Lösung und melde das Problem, falls es noch nicht gemeldet wurde.

Und wie immer kannst du Fragen in der [Kategorie 'Contributors' in unserem Forum](https://forum.freecodecamp.org/c/contributors) oder [auf unserem Chat-Server](https://discord.gg/PRyKn3Vbay) stellen.

> [!NOTE] Das Verzeichnis `mobile` enthält zwei Ordner, nämlich `mobile-api` und `mobile-app`. `mobile-api` enthält den API-Code, der für die Bereitstellung der Podcasts verwendet wird. `mobile-app` enthält die Flutter-App. Dort solltest du dich befinden, wenn du die folgenden Schritte befolgst.

### Configuring Dependencies

#### Step 1: Set Up the Environment Variable File

Die Standard-API-Schlüssel und Umgebungsvariablen sind in der Datei `sample.env` gespeichert. This file needs to be copied to a new file named `.env` which is accessed dynamically during the installation step. Denke daran, das Verzeichnis in `mobile-app` zu ändern, bevor du die folgenden Befehle ausführst.

```bash
# Erstelle eine Kopie der "sample.env" und benenne sie ".env".
# Trage die notwendigen API-Schlüssel und Secrets in die Datei ein:
```

#### **macOS/Linux**

```bash
cp sample.env .env
```

#### **Windows**

```bash
copy sample.env .env
```

Die Schlüssel in der `.env` Datei müssen _nicht_ geändert werden, um die App lokal auszuführen. Du kannst die aus `sample.env` kopierten Standardwerte so belassen, wie sie sind.

#### Schritt 2: Installieren von Abhängigkeiten

In diesem Schritt werden die für die Ausführung der Anwendung erforderlichen Abhängigkeiten installiert:

```bash
flutter pub get
```

#### Schritt 3: Starte die freeCodeCamp mobile App

Starte den Emulator deiner Wahl (Android oder iOS) und warte, bis der Startvorgang abgeschlossen ist.

Du kannst die App nun mit folgendem Befehl starten:

```bash
flutter run
```

:::tip
Wenn du VSCode oder Android Studio verwendest, kannst du die App ganz einfach starten, ohne Terminalbefehle ausführen zu müssen. Mehr Informationen dazu [hier](https://docs.flutter.dev/get-started/test-drive).
:::

## Making Changes Locally

You can now make changes to files and commit your changes to the local clone of your fork.

Folge diesen Schritten:

1. Überprüfe, ob du dich auf dem `main`-Branch befindest:

   ```bash
   git status
   ```

   Du solltest eine Ausgabe wie diese erhalten:

   ```bash
   On branch main
   Your branch is up-to-date with 'origin/main'.

   nothing to commit, working directory clean
   ```

   Wenn du nicht auf main bist oder dein Arbeitsverzeichnis nicht bereinigt ist, löse alle ausstehenden Dateien/Commits auf und checke `main` aus:

   ```bash
   git checkout main
   ```

2. Synchronisiere die letzten Änderungen aus dem Upstream `main`-Zweig mit deinem lokalen Hauptzweig:

   > [!WARNING] Wenn du noch ausstehende Pull Requests aus dem `main`-Zweig deines Forks besitzt, verlierst du sie am Ende dieses Schrittes.
   >
   > Du solltest sicherstellen, dass dein Pull-Request von einem Moderator zusammengeführt wird, bevor du diesen Schritt ausführst. Um dieses Szenario zu vermeiden, solltest du **immer** auf einem anderen Zweig als dem `main` arbeiten.

   Dieser Schritt **synchronisiert die letzten Änderungen** aus dem Haupt-Repository von freeCodeCamp mobile. Es ist wichtig, dass du deinen Zweig so oft wie möglich auf den neuesten `upstream/main` zurücksetzt, um spätere Konflikte zu vermeiden.

   Aktualisiere deine lokale Kopie des freeCodeCamp mobile Upstream-Repository:

   ```bash
   git fetch upstream
   ```

   Führe einen Hard Reset deines Hauptzweiges mit dem freeCodeCamp mobile main durch:

   ```bash
   git reset --hard upstream/main
   ```

   Schiebe deinen Hauptbranch in deinen origin, um einen sauberen Verlauf deines Forks auf GitHub zu haben:

   ```bash
   git push origin main --force
   ```

   You can validate that your current main matches the upstream/main by performing a diff:

   ```bash
   git diff upstream/main
   ```

   Die resultierende Ausgabe sollte leer sein.

3. Erstelle einen neuen Zweig:

   Die Arbeit an einem separaten Zweig für jede Ausgabe hilft dir, deine lokale Arbeitskopie sauber zu halten. Du solltest niemals am `main` arbeiten. Dadurch wird deine Kopie von freeCodeCamp mobile verunreinigt und du musst eventuell mit einem neuen Klon oder Fork neu beginnen.

   Vergewissere dich, dass du auf `main` bist, wie zuvor erklärt, und zweige von dort ab:

   ```bash
   git checkout -b fix/update-guide-for-xyz
   ```

   Dein Zweigname sollte mit `fix/`, `feat/`, `docs/` usw. beginnen. Vermeide die Verwendung von Issue-Nummern in Zweigen. Keep them short, meaningful, and unique.

   Einige Beispiele für gute Zweignamen sind:

   ```md
   fix/update-challenges-for-react
   fix/update-guide-for-html-css
   fix/platform-bug-sign-in-issues
   feat/add-guide-article-for-javascript
   translate/add-spanish-basic-html
   ```

4. Bearbeite Seiten und arbeite am Code in deinem bevorzugten Texteditor.

5. Wenn du mit den Änderungen zufrieden bist, solltest du die mobile App optional lokal ausführen, um eine Vorschau der Änderungen zu erhalten.

6. Stelle sicher, dass du alle Fehler korrigierst und die Formatierung deiner Änderungen überprüfst.

7. Überprüfe und bestätige die Dateien, die du aktualisierst:

   ```bash
   git status
   ```

   Dies sollte eine Liste `unstaged`-Dateien anzeigen, die du verändert hast.

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

8. Führe die Änderungen durch und mache einen Commit:

   In diesem Schritt solltest du nur Dateien markieren, die du selbst bearbeitet oder hinzugefügt hast. Bei Bedarf kannst du einen Reset durchführen und Dateien lösen, die du nicht ändern wolltest.

   ```bash
   git add path/to/my/changed/file.ext
   ```

   Oder du kannst alle `unstaged`-Dateien zum Staging-Bereich hinzufügen:

   ```bash
   git add .
   ```

   Nur die Dateien, die in den Staging-Bereich verschoben wurden, werden hinzugefügt, wenn du einen Commit durchführst.

   ```bash
   git status
   ```

   Ausgabe:

   ```bash
   On branch feat/documentation
   Your branch is up to date with 'upstream/feat/documentation'.

   Changes to be committed:
   (use "git reset HEAD <file>..." to unstage)

       modified:   README.md
       modified:   mobile-app/lib/main.dart
   ```

   Jetzt kannst du deine Änderungen mit einer kurzen Nachricht wie dieser übertragen:

   ```bash
   git commit -m "fix: my short commit message"
   ```

   Einige Beispiele:

   ```md
   fix: update guide article for Java - for loop
   feat: add guide article for alexa skills
   ```

   Optional:

   Wir empfehlen dringend eine konventionelle Commit-Nachricht zu verfassen. Dies ist eine gute Praxis, die du bei einigen der beliebten Open-Source-Repositories sehen kannst. Dies ermutigt dich als Entwickler, Standardverfahren zu befolgen.

   Einige Beispiele für konventionelle Commit-Meldungen sind:

   ```md
   fix: update HTML guide article
   fix: update build scripts for Travis-CI
   feat: add article for JavaScript hoisting
   docs: update contributing guidelines
   ```

   Halte sie kurz, nicht länger als 50 Zeichen. Du kannst jederzeit zusätzliche Informationen in der Beschreibung der Commit-Nachricht hinzufügen.

   Das dauert nicht länger als eine unkonventionelle Meldung wie "update file" oder "add index.md"

   Mehr darüber, warum du konventionelle Commits verwenden solltest, erfährst du [hier](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#why-use-conventional-commits).

9. Wenn du feststellst, dass du eine Datei bearbeiten oder die Commit-Nachricht aktualisieren musst, nachdem du einen Commit gemacht hast, kannst du das nach der Bearbeitung der Dateien wie folgt tun:

   ```bash
   git commit --amend
   ```

   Dies öffnet einen Standard-Texteditor wie `nano` oder `vi`, in dem du den Titel der Commit-Nachricht bearbeiten und die Beschreibung hinzufügen/bearbeiten kannst.

10. Als nächstes kannst du deine Änderungen in deinen Fork schieben:

    ```bash
    git push origin branch/name-here
    ```

## Running mobile curriculum tests

> [!NOTE] You only need to follow this section if you're modifying the challenge test runner in the mobile app. Otherwise, you can go to the next section on [how to open a pull request](#proposing-a-pull-request-pr).

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

13. Run the cypress tests:

    ```bash
    pnpm cypress run --config retries=1,screenshotOnRunFailure=false,video=false,baseUrl=http://localhost:3000/generated-tests/,specPattern=cypress/e2e/mobile-learn/test-challenges.js -s cypress/e2e/mobile-learn/test-challenges.js -b chrome
    ```

## Proposing a Pull Request (PR)

Nachdem du deine Änderungen übertragen hast, kannst du hier nachlesen, [wie man einen Pull Request erstellt](how-to-open-a-pull-request).

<!-- ## Quick commands reference - NEED TO DISCUSS ABOUT THIS

A quick reference to the commands that you will need when working locally.

| command                                                        | description                                                                         |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `npm ci`                                                       | Installs / re-install all dependencies and bootstraps the different services.       |
| `npm run seed`                                                 | Parses all the challenge markdown files and inserts them into MongoDB.              | -->

## Troubleshooting

### Probleme bei der Installation der empfohlenen Voraussetzungen

Wir entwickeln regelmäßig auf den neuesten oder beliebtesten Betriebssystemen wie macOS 10.15 oder höher, Ubuntu 18.04 oder höher und Windows 10 (mit WSL2).

Es wird empfohlen, dein spezifisches Problem auf Ressourcen wie Google, Stack Overflow und Stack Exchange zu untersuchen. Es besteht eine gute Chance, dass jemand mit demselben Problem konfrontiert war und bereits eine Antwort auf deine spezifische Frage gefunden hat.

Wenn du mit einem anderen Betriebssystem arbeitest und/oder immer noch Probleme hast, lese bitte [Hilfe erhalten](#getting-help).

### Probleme mit der Benutzeroberfläche, Build-Fehler usw.

If you face issues with the UI, or build errors a cleanup can be useful:

```bash
flutter clean
```

### Issues Installing Dependencies

If you get errors while installing the dependencies, please make sure that you are not in a restricted network or that your firewall settings do not prevent you from accessing resources.

Be patient as the first-time setup can take a while depending on your network bandwidth.

## Getting Help

Wenn du nicht weiterkommst und Hilfe brauchst, kannst du deine Fragen in der [Kategorie "Contributors" in unserem Forum](https://forum.freecodecamp.org/c/contributors) oder im ["Contributors "Chatraum](https://discord.gg/PRyKn3Vbay) stellen.

In der Konsole deines Browsers oder in der Bash / Terminal / Kommandozeile kann eine Fehlermeldung erscheinen, die dir hilft, das Problem zu identifizieren. Gib diese Fehlermeldung in deiner Problembeschreibung an, damit andere das Problem leichter identifizieren und dir bei der Suche nach einer Lösung helfen können.
