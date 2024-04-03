---
title: Wie man einen Pull-Request (PR) öffnet
---

A pull request (PR), enables you to send changes from your fork on GitHub to freeCodeCamp.org's main repository. Wenn du mit den Änderungen am Code fertig bist, kannst du diese Richtlinien befolgen, um einen PR zu eröffnen.

Wir erwarten von unseren Mitwirkenden, dass sie den für dieses Projekt spezifischen Prozess kennen. Following the guidelines carefully earns you the respect of fellow maintainers and saves everyone time.

Einige Beispiele hierfür sind:

1. Bearbeite Dateien nicht direkt über GitHub - Das kannst du zwar, aber es ist keine gute Idee.
2. Make sure the PR title follows [our convention](#prepare-a-good-pr-title).
3. Achte darauf, dass du die PR-Checkliste befolgst und nicht nur Dinge abhakst, sonst nehmen wir dich nicht ernst.
4. Verwende die korrekte Art der Verknüpfung von Themen in der Beschreibung des PR, indem du die `XXXXXX` aktualisierst. Füge nicht einfach überall und nach Lust und Laune Heftnummern ein.
5. Erwähne jemanden nicht zu oft mit "@mention" oder bitte ihn nicht zu oft um Bewertungen.

   Wir verstehen, dass du gerne einen Beitrag leisten möchtest. So gerne sich ein Betreuer auch bei dir melden würde, er hat alle Hände voll zu tun, um Hunderte von Anfragen wie deine zu bearbeiten. Habe Geduld, früher oder später wird sich jemand bei dir melden.

6. Arbeite nicht direkt an deinem `Hauptzweig` - erstelle einen neuen Zweig für die Änderungen, an denen du arbeitest.

> [!NOTE] Deine Öffentlichkeitsarbeit sollte sich nur auf Änderungen des englischen Lehrplans beziehen. Lese stattdessen [diesen Leitfaden](index#translations), um zu Übersetzungen beizutragen.

## Prepare a Good PR Title

We use [conventional title and messages](https://www.conventionalcommits.org/) for commits and pull requests. Die Konvention hat das folgende Format:

> `<type>([optional scope(s)]): <description>`
>
> Zum Beispiel:
>
> `fix(learn): tests for the do...while loop challenge`

Whenever you open a Pull Request (PR), you can use the below to determine the type, scope (optional), and description.

**Typ:**

| Typ   | Wann wählen                                                                                  |
| :---- | :------------------------------------------------------------------------------------------- |
| fix   | Changed or updated/improved functionality, tests, the wording of a lesson, etc.              |
| feat  | Nur wenn du neue Funktionen, Tests usw. hinzufügst.                                          |
| chore | Änderungen, die sich nicht auf den Code, die Tests oder den Wortlaut einer Lektion beziehen. |
| docs  | Änderungen im Verzeichnis `/docs` oder in den Mitwirkungsrichtlinien, etc.                   |

**Geltungsbereich (Scope):**

Du kannst einen Geltungsbereich aus [dieser Liste von Labels](https://github.com/freeCodeCamp/freeCodeCamp/labels?q=scope) auswählen.

**Beschreibung:**

Fasse dich kurz (weniger als 30 Zeichen) und einfach; du kannst weitere Informationen im PR-Beschreibungsfeld und in den Kommentaren hinzufügen.

Einige Beispiele für gute PR-Titel wären:

- `fix(a11y): improved search bar contrast`
- `feat: add more tests to HTML and CSS challenges`
- `fix(api,client): prevent CORS errors on form submission`
- `docs(i18n): fix links to be relative instead of absolute`

## Einen Pull-Request vorschlagen

1. Sobald die Änderungen übertragen wurden, wirst du aufgefordert, einen Pull-Request auf der GitHub-Seite deines Forks zu erstellen.

   <details>
   <summary>Screenshot ansehen</summary>

   ![Bild - Vergleichen & Pull-Request-Prompt auf GitHub](https://contribute.freecodecamp.org/images/github/compare-pull-request-prompt.png)

   </details>

2. Grundsätzlich sollten alle Pull-Requests gegen das Haupt-Repository von freeCodeCamp, den `main`-Branch, gerichtet sein.

   Stelle sicher, dass dein Base Fork auf freeCodeCamp/freeCodeCamp eingestellt ist, wenn du einen Pull-Request einreichst.

   <details>
   <summary>Screenshot ansehen</summary>

   ![Bild - Vergleiche Forks beim Pull Request](https://contribute.freecodecamp.org/images/github/comparing-forks-for-pull-request.png)

   </details>

3. Übermittle den Pull-Request von deinem Branch an den `main`-Branch von freeCodeCamp.

4. Füge eine ausführlichere Zusammenfassung der von dir vorgenommenen Änderungen und deren Nutzen in den Hauptteil deines PR-Textes ein.

   - Du erhältst eine Vorlage für einen Pull-Request. Dies ist eine Checkliste, die du befolgen solltest, bevor du den Pull-Request öffnest.

   - Fülle die Details so aus, wie du es für richtig hältst. Ensure that you give the reviewers enough context to review the changes. If the PR makes changes to the UI, be sure to include screenshots of the changes as well. All of this information will be reviewed and the reviewers will decide whether or not your pull request is accepted.

   - Wenn der PR ein bestehendes GitHub Problem beheben soll, dann am Ende von der Beschreibungstext deines PR verwenden Sie das Schlüsselwort _Schließt_ mit der Ticketnummer zu [automatisch schließen, wenn der PR akzeptiert und zusammengeführt wird](https://help.github.com/en/articles/closing-issues-using-keywords).

     > Beispiel: `Closes #123` wird Issue 123 schließen

5. Gib an, ob du auf einer lokalen Kopie der Website getestet hast oder nicht.

   - Das ist sehr wichtig, wenn du Änderungen vornimmst, die nicht nur Textinhalte wie die Dokumentation oder eine Aufgabenbeschreibung betreffen. Examples of changes that need local testing include JavaScript, CSS, or HTML, which could change the functionality or layout of a page.

   - If your PR affects the behavior of a page, it should be accompanied by corresponding [Playwright integration tests](how-to-add-playwright-tests).

## Feedback on Pull Requests

> :tada: für die Erstellung eines PR und vielen Dank, dass du dir die Zeit genommen haben, einen Beitrag zu leisten.

Unsere Moderatoren werden jetzt einen Blick darauf werfen und dir ein Feedback hinterlassen. Bitte habe Geduld mit den anderen Moderatoren und respektiere ihre Zeit. Alle Pull-Requests werden zu gegebener Zeit überprüft.

Und wie immer kannst du deine Fragen in der [Kategorie "Contributors" in unserem Forum](https://forum.freecodecamp.org/c/contributors) oder im ["Contributors"-Chatraum](https://discord.gg/PRyKn3Vbay) stellen.

:::tip
Wenn du mehr Pull-Requests beisteuern willst, empfehlen wir dir, die [Richtlinien für Änderungen und Synchronisierung](how-to-setup-freecodecamp-locally#making-changes-locally) zu lesen, damit du deinen Fork nicht löschen musst.
:::

## Conflicts on a Pull Request

Es kann zu Konflikten kommen, weil viele Mitwirkende an dem Repository arbeiten und Änderungen deinen PR zerstören können, der noch auf eine Überprüfung und Zusammenführung wartet.

Since we squash all commits, you may not need to do a rebase. However, if a rebase is requested, check our [For Usual Bug Fixes and Features](#for-usual-bug-fixes-and-features) or [For Upcoming Curriculum and Features](#for-upcoming-curriculum-and-features) guides to learn how to do this process for your corresponding PR.

### For Usual Bug Fixes and Features

Wenn du an regulären Bugs und Features auf unserem Entwicklungszweig `main` arbeitest, kannst du einen einfachen Rebase durchführen:

1. Rebase deiner lokalen Kopie:

   ```bash
   git checkout <pr-branch>
   git pull --rebase upstream main
   ```

2. Löse alle Konflikte und füge Commits hinzu / bzw. bearbeite sie

   ```bash
   # Entweder
   git add .
   git commit -m "chore: resolve conflicts"

   # Oder
   git add .
   git commit --amend --no-edit
   ```

3. Schiebe deine Änderungen in den PR zurück

   ```bash
   git push --force origin <pr-branch>
   ```

### For Upcoming Curriculum and Features

When you are working on features for our upcoming curriculum `next-*` branches, you have to do a `cherry-pick`:

1. Achte darauf, dass dein Upstream mit deinem Local übereinstimmt:

   ```bash
   git checkout main
   git fetch --all --prune
   git checkout next-python-projects
   git reset --hard upstream/next-python-projects
   ```

2. Take a backup

   a. Entweder löschst du deinen lokalen Branch, nachdem du ein Backup gemacht hast (wenn du ihn noch lokal hast):

   ```bash
   git checkout <pr-branch-name>

   # Beispiel:
   # git checkout feat/add-numpy-video-question

   git checkout -b <backup-branch-name>

   # Beispiel:
   #  git checkout -b backup-feat/add-numpy-video-question

   git branch -D <pr-branch-name>
   ```

   b. Or just a backup of your PR branch (if you do not have it locally):

   ```bash
   git checkout -b <backup-branch-name> origin/<pr-branch-name>

   # Beispiel:
   #  git checkout -b backup-feat/add-numpy-video-question origin/feat/add-numpy-video-question
   ```

3. Beginne mit einer weißen Weste:

   ```bash
   git checkout -b <pr-branch-name> next-python-projects
   git cherry-pick <commit-hash>
   ```

4. Resolve any conflicts, cleanup, and install dependencies and run tests

   ```bash
   pnpm run clean

   pnpm install
   FCC_SUPERBLOCK='<superblock-name>' pnpm run test:curriculum

   # example:

   # FCC_SUPERBLOCK='python-for-everybody' pnpm run test:curriculum

   ```

5. If everything looks good, push back to the PR

   ```bash
   git push --force origin <pr-branch-name>
   ```
