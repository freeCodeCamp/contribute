---
title: Contribute to the Codebase
---

Seguire queste linee guida per contribuire al codebase. È altamente raccomandato se vuoi contribuire regolarmente.

Ignorare questi passaggi può sporcare la tua copia, rendendo difficoltosi i processi di contribuzione, manutenzione e revisione.

## Contribuire al codebase

You can now make changes to files and commit your changes to your fork, which you can prepare by reading [how to set up freeCodeCamp locally](how-to-setup-freecodecamp-locally).

Segui questi passaggi:

1. Controlla di essere sul branch `main`:

   ```bash
   git status
   ```

   Dovresti ottenere un output come questo:

   ```bash
   On branch main
   Your branch is up-to-date with 'origin/main'.

   nothing to commit, working directory clean
   ```

   If you got a different message, then you aren't on main or your working directory isn't clean, resolve any outstanding files/commits and checkout `main`:

   ```bash
   git checkout main
   ```

2. Sincronizza il tuo ramo `main` del tuo fork con gli ultimi aggiornamenti dal ramo `main` dell'upstream di freeCodeCamp:

:::danger
Se hai delle pull request in sospeso fatte dal branch `main` del tuo fork, le perderai alla fine di questi passaggi.

Prima di eseguire questo passaggio, dovresti assicurarti che un moderatore abbia eseguito il merge della tua pull request. Per evitare questa situazione, dovresti **sempre** lavorare su un branch che non sia `main`.
:::

Questo passaggio **sincronizzerà le ultime modifiche** dal repository principale di freeCodeCamp.

Aggiorna la tua copia del repository upstream freeCodeCamp:

```bash
git fetch upstream
```

Fai un hard reset del tuo ramo main con il ramo main di freeCodeCamp:

```bash
git reset --hard upstream/main
```

Fai un push del ramo main al tuo origin per avere una cronologia pulita nel tuo fork su GitHub:

```bash
git push origin main --force
```

You can validate that your current main matches the upstream/main by performing a diff:

```bash
git diff upstream/main
```

L'output risultante dovrebbe essere vuoto. This process is important, because you will be rebasing your branch on top of the latest `upstream/main` as often as possible to avoid conflicts later.

3. Crea un nuovo branch:

   Lavorare su un branch separato per ogni issue ti aiuta a mantenere pulita la tua copia di lavoro locale. Non dovresti mai lavorare su `main`. Comprometteresti la tua copia di freeCodeCamp e potrebbe essere necessario ricominciare da capo con un nuovo clone o fork.

   Controlla di essere su `main`, come spiegato in precedenza, e crea un branch da lì:

   ```bash
   git checkout -b fix/update-guide-for-xyz
   ```

   Il nome del branch dovrebbe iniziare con un `fix/`, `feat/`, `docs/`, ecc. Evita di utilizzare i numeri delle issue nei branch. Tienili brevi, significativi e unici.

   Alcuni esempi di nomi buoni per un branch sono:

   ```md
   fix/update-challenges-for-react
   fix/update-guide-for-html-css
   fix/platform-bug-sign-in-issues
   feat/add-guide-article-for-javascript
   translate/add-spanish-basic-html
   ```

4. Modifica le pagine e lavora sul codice nel tuo editor di testo preferito.

5. Una volta che sei soddisfatto delle modifiche, dovresti opzionalmente eseguire freeCodeCamp per visualizzarle in anteprima.

6. Assicurati di correggere eventuali errori e controlla la formattazione delle modifiche.

7. Controlla e conferma i file che stai aggiornando:

   ```bash
   git status
   ```

   Questo dovrebbe mostrare un elenco di file `unstaged` che hai modificato.

   ```bash
   On branch feat/documentation
   Your branch is up to date with 'upstream/feat/documentation'.

   Changes were not staged for commit:
   (use "git add/rm <file>..." to update what will be committed)
   (use "git checkout -- <file>..." to discard changes in the working directory)

       modified:   CONTRIBUTING.md
       modified:   docs/README.md
       modified:   docs/how-to-setup-freecodecamp-locally.md
       modified:   docs/how-to-work-on-guide-articles.md
   ...
   ```

8. Fai lo staging delle modifiche e crea un commit:

   In questo passaggio, dovresti contrassegnare solo i file che hai modificato o aggiunto tu stesso. Se necessario è possibile eseguire un reset e risolvere i file che non hai intenzione di modificare.

   ```bash
   git add path/to/my/changed/file.ext
   ```

   Oppure puoi aggiungere tutti i file `unstaged` all'area di staging:

   ```bash
   git add .
   ```

   Solo i file che sono stati spostati nell'area di staging verranno aggiunti quando effettui un commit.

   ```bash
   git status
   ```

   Output:

   ```bash
   On branch feat/documentation
   Your branch is up to date with 'upstream/feat/documentation'.

   Changes to be committed:
   (use "git reset HEAD <file>..." to unstage)

       modified:   CONTRIBUTING.md
       modified:   docs/README.md
       modified:   docs/how-to-setup-freecodecamp-locally.md
       modified:   docs/how-to-work-on-guide-articles.md
   ```

   Ora, è possibile eseguire il commit delle modifiche con un breve messaggio come questo:

   ```bash
   git commit -m "fix: breve messaggio di commit"
   ```

   Alcuni esempi:

   ```md
   fix: add test for JavaScript - for loop step
   feat: add link for article for alexa skills
   ```

   Crea un messaggio di commit convenzionale. Questa è una buona pratica come sviluppatore, e seguirai le pratiche standard.

   Alcuni esempi di messaggi di commit convenzionali sono:

   ```md
   fix: improve HTML step
   fix: fix build scripts for Travis-CI
   feat: add link to JavaScript hoisting article
   docs: update contributing guidelines
   ```

   Mantieni questi messaggi brevi, non più di 50 caratteri. È sempre possibile aggiungere ulteriori informazioni nella descrizione del messaggio di commit.

   Questo non richiede più tempo rispetto a un messaggio non convenzionale come 'update file' o 'add index.md'

   Puoi sapere di più sul perché dovresti usare i commit convenzionali [qui](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#why-use-conventional-commits).

9. Se ti accorgi di dover modificare un file o aggiornare il messaggio del commit dopo aver fatto un commit puoi farlo dopo aver modificato i file con:

   ```bash
   git commit --amend
   ```

   Questo aprirà un editor di testo predefinito come `nano` o `vi` dove potrai modificare il titolo del messaggio di commit e aggiungere/modificare la descrizione.

10. Successivamente, è possibile inviare le modifiche al fork:

    ```bash
    git push origin branch/name-here
    ```

## Proporre una Pull Request (PR)

Dopo aver fatto il commit delle tue modifiche, controlla qui [come aprire una Pull Request](how-to-open-a-pull-request).

## Comandi rapidi

Un rapido richiamo ai comandi di cui avrai bisogno lavorando.

| comando                                                           | descrizione                                                                         |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `pnpm test`                                                       | Esegue tutti i test JS del sistema inclusi client, server, lint e test delle sfide. |
| `pnpm run test-client`                                            | Esegue la test suite del client.                                                    |
| `pnpm run test-client -u`                                         | Run the client test suite, updating the Jest snapshots that are out of sync.        |
| `pnpm run test:curriculum`                                        | Esegue la test suite del curriculum.                                                |
| `FCC_BLOCK='Basic HTML and HTML5' pnpm run test:curriculum`       | Esegue i test di uno specifico blocco.                                              |
| `FCC_SUPERBLOCK='responsive-web-design' pnpm run test:curriculum` | Esegue i test di uno specifico superblocco.                                         |
| `pnpm run test-curriculum-full-output`                            | Esegue la suite di test del curriculum, senza arrestarsi dopo il primo errore       |
| `pnpm run test-server`                                            | Esegue la suite di test del server.                                                 |
| `pnpm run e2e`                                                    | Esegue i test di Cypress end to end.                                                |
| `pnpm run clean`                                                  | Disinstalla tutte le dipendenze e pulisce la cache.                                 |
| `pnpm run storybook`                                              | Esegue Storybook per sviluppo dei componenti di library.                            |
