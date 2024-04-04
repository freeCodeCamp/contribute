---
title: Das offizielle freeCodeCamp-Language Lead-Handbuch
---

Dieses Handbuch hilft dir dabei, die Tools für deine Lokalisierungsvorhaben einzurichten und zu nutzen.

## How to Invite New Contributors to Ghost

Ghost allows you to set contributors with different levels of authorization.

Die meisten Ihrer Einladungen werden für die Stufe "Contributor " sein. Auf dieser Ebene kann der Benutzer Entwürfe erstellen. Wähle diese Rolle, wenn du einen neuen Übersetzer einlädst.

Die Stufe "Author" ermöglicht es dem Benutzer, Entwürfe zu erstellen und diese zu veröffentlichen.

Auf der Ebene "Editor" hat der Benutzer Zugriff auf alle Entwürfe und kann sie veröffentlichen. Wähle diese Rolle, wenn du einen neuen Korrekturleser (proofreader) einlädst.

Die Stufe "Administrator" ist für freeCodeCamp-Mitarbeiter und Language Leads reserviert.

### How are the Articles Built

Wir verwenden einen [JAMStack](https://www.google.com/search?q=what+is+jamstack)-basierten Ansatz zur Erstellung und Bereitstellung der Artikel. Diese Strategie sorgt für eine schnelle statische Website, die von einem CDN zwischengespeichert und bereitgestellt wird.

[Ghost](https://ghost.org) fungiert als unsere Content-Management-Plattform, und [11ty](https://11ty.dev) erstellt aus den Artikeln statische Inhalte - einfaches HTML, JavaScript und CSS. Nur diese statischen Inhalte werden auf unseren Servern bereitgestellt.

Dieser Prozess ist automatisiert und läuft regelmäßig ab. Wenn du jetzt etwas veröffentlichst, wird es in ein paar Stunden auf der Nachrichtenseite verfügbar sein.

Die aktuellen Zeitpläne und den Status kannst du hier einsehen: https://github.com/freeCodeCamp/news#build

## How to Mention the Original Author of a Translated Article

The original author and the original article are linked automatically adding this code to the Code Injection -> head section in the Draft Settings on Ghost.

```html
<script>
  const fccOriginalPost = 'link';
</script>
```

`Link` ist der Link zum Originalartikel.

## How to Update Trending Articles

:::tip
Changing the articles in the footer at least once a month means giving a boost to the linked articles on Google results.
:::

To update the trending articles in the footer, you need to update the [yaml file in the CDN repository](https://github.com/freeCodeCamp/cdn/tree/main/build/universal/trending) for your language. Both the curriculum and the publication reference this file.

For example, here is the file content for the first 6 articles:

```yaml
article0
title:  "Unire CSV con Python"
article0link: "https://www.freecodecamp.org/italian/news/come-combinare-file-multipli-in-formato-csv-con-8-righe-di-codice/"
article1
title:  "Il comando Git push"
article1link: "https://www.freecodecamp.org/italian/news/il-comando-git-push-spiegato/"
article2
title:  "Centrare immagini in CSS"
article2link: "https://www.freecodecamp.org/italian/news/come-centrare-un-immagine-usando/"
article3
title:  "I codici Alt"
article3link: "https://www.freecodecamp.org/italian/news/codici-alt/"
article4
title:  "Tenere a bada il footer"
article4link: "https://www.freecodecamp.org/italian/news/come-mantenere-il-footer-al-suo-posto/"
article5
title:  "Cosa è API?"
article5link: "https://www.freecodecamp.org/italian/news/cose-un-api-in-italiano-per-favore/"
```

Each number represents one of the 30 articles in the footer. Achte darauf, dass der Titel und der Link richtig zugeordnet sind.

For each article, you will need to create a shorter title to use in the footer. Jeder Titel muss in einer einzigen Zeile bleiben und darf nicht in eine neue Zeile übergehen.

Du solltest [den übersetzten Client lokal einrichten](how-to-enable-new-languages), um zu sehen, ob die Titel die richtige Länge haben. You can preview the changes by editing the `trending.json` file in your local environment:

1. Update your `.env` file to use your language for `CLIENT_LOCALE` and `CURRICULUM_LOCALE`.

2. Run `pnpm run create:shared`. This will automatically generate the `trending.json` file for your language under the `/client/i18n/locales/` directory.

3. Start the server by running `pnpm run develop:server` in one terminal window.

4. Edit the `trending.json` to contain the titles you want to preview. You may want to convert your `.yaml` file into JSON format with an automatic tool.

5. In another terminal window, run `pnpm run clean:client`, and then `pnpm run develop:client`

## How to Translate Articles in the Footer Links

There are some links listed at the bottom of the footer (About, Alumni Network, Open Source, etc.) and some of them can be translated into your language in the same way as other articles.

Articles that can be translated:

- About
- Support
- Academic Honesty
- Code of Conduct

The following articles should **not** be translated:

- Shop
- Sponsors
- Privacy Policy
- Terms of Service
- Copyright Policy

The following links are pointing to external sites and cannot be translated:

- Alumni Network
- Open Source

### Change the Footer Links in the News

Once you have translated and published the articles listed as "can be translated" above, you can update the links in the footer for `/news` by editing the file at `news/config/i18n/locales/<your language>/links.json` in the [freeCodeCamp/news](https://github.com/freeCodeCamp/news) repository.

> [!NOTE] Pull requests to this repository are currently limited to staff only. If you want to update this file, ask someone on the staff team for help.

Update the following part in the file:

```json
{
  ...
  "footer": {
    "about": "https://www.freecodecamp.org/news/about/",
    "support": "https://www.freecodecamp.org/news/support/",
    "honesty": "https://www.freecodecamp.org/news/academic-honesty-policy/",
    "coc": "https://www.freecodecamp.org/news/code-of-conduct/"
  }
}
```

### Change the Footer Links in the Curriculum

When you have translated and published the articles listed as "can be translated" above, as well as when the curriculum in your language is ready for launch, you can update the links in the footer for `/learn` by editing the file at `client/i18n/locales/<your language>/links.json` in the [freeCodeCamp/freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp) repository.

> [!WARNING] Only "About", "Support", "Academic Honesty", and "Code of Conduct" can be translated. Leave other URLs unchanged.

Update the following part in the file:

```json
{
  ...
  "footer": {
    "about-url": "https://www.freecodecamp.org/news/about/",
    "shop-url": "https://www.freecodecamp.org/shop/",
    "support-url": "https://www.freecodecamp.org/news/support/",
    "sponsors-url": "https://www.freecodecamp.org/news/sponsors/",
    "honesty-url": "https://www.freecodecamp.org/news/academic-honesty-policy/",
    "coc-url": "https://www.freecodecamp.org/news/code-of-conduct/",
    "privacy-url": "https://www.freecodecamp.org/news/privacy-policy/",
    "tos-url": "https://www.freecodecamp.org/news/terms-of-service/",
    "copyright-url": "https://www.freecodecamp.org/news/copyright-policy/"
  },
  ...
}
```

## How to Translate the Info Boxes Headers in the Documentation

Du findest diese Boxen überall in der Dokumentation:

> [!NOTE] Ich bin eine Notizbox

:::tip
Ich bin eine Tippbox
:::

> [!WARNING] Ich bin eine Warnbox

:::danger
Ich bin eine Aufmerksamkeitsbox
:::

Standardmäßig erscheinen die Kopfzeilen auch in den übersetzten Dokumenten auf Englisch.

Du kannst die Kopfzeilen in den Dokumenten in deine Sprache übersetzen lassen, indem du die Datei `docs/index.html` auf diese Weise änderst:

Innerhalb des `script` Elements gibt es ein Objekt, die `flexibleAlerts` Eigenschaft, die diese Form hat:

```js
flexibleAlerts: {
  note: {
    label: {
      '/': 'Note'
    }
  },
  tip: {
    label: {
      '/': 'Tip'
    }
  },
  warning: {
    label: {
      '/': 'Warning'
    }
  },
  attention: {
    label: {
      '/': 'Attention'
    }
  }
}
```

Innerhalb des Objekts der Label-Eigenschaft, vor der `'/'`-Eigenschaft, fügst du eine neue Eigenschaft für deine Sprache hinzu, wie `/i18n/<language>/`.

Das Hinzufügen der Übersetzungen für Portugiesisch würde zum Beispiel so aussehen:

```js
flexibleAlerts: {
  note: {
    label: {
      '/i18n/portuguese/': 'Observação',
      '/': 'Note'
    }
  },
  tip: {
    label: {
      '/i18n/portuguese/': 'Dica',
      '/': 'Tip'
    }
  },
  warning: {
    label: {
      '/i18n/portuguese/': 'Aviso',
      '/': 'Warning'
    }
  },
  attention: {
    label: {
      '/i18n/portuguese/': 'Atenção',
      '/': 'Attention'
    }
  }
}
```

## How to Translate the Motivational Quotes

Die motivierenden Zitate befinden sich im [Curriculum-Repository](https://github.com/freeCodeCamp/freeCodeCamp/) in der Datei `/client/i18n/locales/<language>/motivation.json`.

Diese Datei hat folgende allgemeine Struktur:

```json
{
  "compliments": [],
  "motivationalQuotes": []
}
```

Die Komplimente sind die kurzen Sätze, die am Ende einer Aufgabe erscheinen.

Du musst die Sätze nicht direkt aus dem Englischen übersetzen, sondern kannst eine Reihe von kurzen Sätzen schreiben, die sich eignen, um sie am Ende einer Aufgabe zu zeigen.

The `compliments` array is an array of strings. So, for example, you would write:

```json
{
  "compliments": ["A tutta birra!", "Pikachu, scelgo te!"],
  "motivationalQuotes": []
}
```

:::tip
Du solltest mit mindestens einem Dutzend Komplimenten beginnen, um eine gewisse Abwechslung zu schaffen, wenn die Benutzer die Aufgaben abschließen.
:::

Die Motivationszitate sind die Zitate, die auf https://freecodecamp.org/learn erscheinen.

Das `motivationalQuotes`-Array ist ein Array aus Objekten. Diese Objekte sollten eine `quote`-Eigenschaft und eine `author`-Eigenschaft enthalten. Wie hier:

```json
{
  "compliments": [],
  "motivationalQuotes": [
    {
      "quote": "Se i costruttori costruissero come i programmatori programmano, il primo picchio che passa potrebbe distruggere la civiltà.",
      "author": "Artur Bloch, Seconda legge di Weinberg"
    },
    {
      "quote": "I bravi programmatori sanno cosa scrivere. I migliori sanno cosa riscrivere.",
      "author": "Eric Steven Raymond"
    }
  ]
}
```

:::tip
Du solltest mit mindestens einem Dutzend Zitaten beginnen, um eine gewisse Vielfalt zu haben. A new quote is shown every time the user reloads the page.
:::

## How to Update the Common Links

In der Datei `/client/i18n/locales/<language>/links.json` wird eine Datei mit allgemeinen Links geführt, die auf unserer [Lehrplan-Website](https://github.com/freecodecamp/freecodecamp) verwendet wird.

Einige dieser Links werden sich nicht ändern - aber du solltest die `/news`-Artikel-Links aktualisieren, damit sie auf die übersetzte Version des Artikels in deiner Sprache verweisen, wenn er veröffentlicht wird.

Du solltest auch die `help`-Kategorien aktualisieren, um auf das Unterforum deiner Sprache zu verweisen (normalerweise `language/category`, wie `Italiano/HTML-CSS`). Dies ermöglicht es freeCodeCamp-Benutzern, 'Hilfeanfragen' im richtigen Forum zu erstellen.

## How to Update the Site Meta-Data

Die Metadaten der Website befinden sich in der Datei `/client/i18n/locales/<language>/meta-tags.json`. Diese Datei hat 5 Schlüssel:`title`, `description`, `social-description`, `keywords`, und `youre-unsubscribed`.

Der Wert `youre-unsubscribed` sollte direkt übersetzt werden. Die anderen Werte müssen so genau wie möglich übersetzt werden, wobei auch die in deiner Sprache üblichen Suchbegriffe und Phrasen berücksichtigt werden müssen.

Wenn du dabei Hilfe benötigst, wende dich an uns im ["Contributor" Chat](https://discord.gg/PRyKn3Vbay)

## Vorübersetzungs-Workflow auf Crowdin

Der Vorübersetzungs-Workflow kann verwendet werden, um Übersetzungen aus dem Translation Memory auf Strings anzuwenden.

:::tip
Diese Funktion ist sehr nützlich, um viele Übersetzungen aus dem Translation Memory in großen Mengen wiederherzustellen, wenn viele Dateien aktualisiert worden sind.
:::

Du findest den Vorübersetzungs-Workflow oben auf der Seite in der Konsole eines Projekts. Wenn du in der oberen rechten Ecke "Go to console" siehst, klicke zuerst darauf.

![Gehe zur Konsole-Schaltfläche](../images/crowdin/pre-translate2.png)

![Vorübersetzungs-Workflow](../images/crowdin/pre-translate1.png)

Du kannst "From Machine Translation" oder "From Translation Memory" wählen. Wähle "Translation Memory", um Übersetzungen aus dem Speicher wiederherzustellen.

Dann sind drei Schritte zu absolvieren:

1. Dateien. Choose which files to translate, you can do all the projects, or specific folders or files.
2. Sprachen. Stelle hier deine Sprache ein.
3. Vorhandene Übersetzungen. Die beste Kombination ist hier "100% match" und "Apply to untranslated strings only". Genehmige nicht automatisch, denn es ist immer besser, ein menschliches Auge auf die Dinge zu werfen.

![Vorübersetzung bestehender Übersetzungen](../images/crowdin/pre-translate3.png)

Wenn du diese Einstellung abgeschlossen hast, drücke den Button Pre-Translate und warte. Sobald der Vorgang abgeschlossen ist, wirst du benachrichtigt. Wie lange das dauert, hängt davon ab, wie viele unübersetzte Strings in den ausgewählten Dateien enthalten sind.

## How to Update Crowdin Glossary

:::tip
An updated glossary helps in having a homogeneous translation of technical terms.
:::

Das Crowdin-Glossar wird im [crowdin-glossaries](https://github.com/freeCodeCamp/crowdin-glossaries)-Repository aufbewahrt.

In the `glossaries` folder, there are various `*.csv` (comma,separated values) files, one for each of the crowdin projects that have a glossary that can be updated from this workflow.

Die `client.csv`-Datei ist für das Projekt "Learn User Interface", die `curriculum.csv`-Datei ist für das Projekt "Coding Curriculum", die `docs.csv`-Datei ist für das Projekt "Contributing Documentation".

To update the Crowdin Glossaries, you need to clone this repo locally. Open the `.csv` file with an appropriate program, for example, Microsoft Excel.

In der `.csv`-Datei siehst du, dass die englische Sprache die ersten drei Spalten belegt, `Term:English` ist die Spalte für den englischen Begriff, `Description:English` ist die Spalte für die englische Beschreibung, und `Part:English` steht für die Wortart (z. B. Substantiv, Verb usw.) des Begriffs.

Dann hat jede Zielsprache zwei Spalten. Wenn du ins Dothrakische übersetzt, wirst du an den Spalten `Term:Dothraki` und `Description:Dothraki` interessiert sein. Die Spalte `Term:Dothraki` ist für die Übersetzung des Begriffs in Dothraki, und die Spalte `Description:Dothraki` ist für die Beschreibung des Begriffs in Dothraki.

:::tip
In programs like Microsoft Excel, you can hide the columns of the other languages to free up screen real-estate and see the English columns and the target language columns near each other.
:::

Nachdem du die Änderungen vorgenommen und die Datei gespeichert hast, musst du einen PR mit den vorgeschlagenen Änderungen erstellen. Nachdem der PR angenommen wurde, musst du den GitHub Action-Workflow ausführen, um das Crowdin-Glossar zu aktualisieren. Deine Änderungen im Glossar werden sich nicht sofort auswirken, aber sie werden kommen.

## Wie man einen Mitwirkenden zum Korrekturleser (Proofreader) befördert

If you consider that a contributor could become a Crowdin Proofreader, you can give the proofreader role to them this way:

In Crowdin, individuate the `User management` on the left-hand side menu.

Dadurch wird die Benutzerverwaltung geöffnet, in der du die Liste aller Benutzer sehen kannst.

Search for the user who will become a proofreader. Verwende das Menü mit den drei Punkten in der Benutzerzeile, um ein Menü zu öffnen und wähle "Add to team". Die Korrekturleserteams haben den Standardnamen `Proof Readers(<Sprache>)`, du kannst das Team über den Namen der Sprache suchen. Wenn du das Team ausgewählt hast, benutze den Button "ADD" unten auf der Seite, um den Vorgang abzuschließen.

Der Benutzer ist jetzt ein Korrekturleser.

:::tip
Der neu beförderte Korrekturleser könnte vom Lesen der [Korrekturlesen von Übersetzungen](how-to-proofread-files)-Dokumentation profitieren.
:::

## How to Add or Update a Language

Check out the [how to enable new language](how-to-enable-new-languages) docs. If you are updating a language the section on [set translated superblocks](how-to-enable-new-languages#set-translated-superblocks) should be helpful.
