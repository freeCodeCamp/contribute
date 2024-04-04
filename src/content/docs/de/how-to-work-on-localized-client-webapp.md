---
title: How to Work on Localized Client Webapp
---

The React-based client web app that powers our learning platform is built using Gatsby. Sie wird mit [react-i18next](https://react.i18next.com/) und [i18next](https://www.i18next.com/) in verschiedene Weltsprachen übersetzt.

Du kannst mehr darüber erfahren, wie du die Client-Anwendung lokal für die Entwicklung einrichtest, indem du [unseren Leitfaden zur lokalen Einrichtung](how-to-setup-freecodecamp-locally) liest. By default, the application is available only in English.

Once you have set up the project locally you should be able to follow this documentation to run the client in the language of your choice from the list of available languages.

Das kann hilfreich sein, wenn du an einem Feature arbeitest, das speziell auf die Lokalisierung abzielt und du zum Beispiel die Beschriftung eines Buttons in einer anderen Sprache validieren musst.

:::tip
You do not need to follow this document to translate freeCodeCamp's curriculum or contributing documentation. Lies stattdessen [diesen Leitfaden hier](how-to-translate-files).
:::

Wir wollen verstehen, wie die i18n-Frameworks und -Werkzeuge funktionieren.

## Dateistruktur

Most of the files for translating the platform are located in the [`client/i18n`](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/client/i18n) folder. Each language has a directory that contains JSON files with the translations.

```bash
  config
  └── i18n.ts
  ...
  client/i18n
  ├── configForTests.js
  ├── config.js
  ├── locales
  │   ├── chinese
  │   │   ├── intro.json
  │   │   ├── links.json
  │   │   ├── meta-tags.json
  │   │   ├── motivation.json
  │   │   └── translations.json
  ... ...
  │   ├── dothraki
  │   │   ├── intro.json
  │   │   ├── links.json
  │   │   ├── meta-tags.json
  │   │   ├── motivation.json
  │   │   └── translations.json
  ... ...
  │   ├── english
  │   │   ├── intro.json
  │   │   ├── links.json
  │   │   ├── meta-tags.json
  │   │   ├── motivation.json
  │   │   └── translations.json
  │   └── espanol
  │       ├── intro.json
  │       ├── links.json
  │       ├── meta-tags.json
  │       ├── motivation.json
  │       └── translations.json
  ├── locales.test.js
  ├── schema-validation.js
  └── validate-keys.ts
```

Some of these files are translated on our translation platform (Crowdin) and some are translated or created via PRs on GitHub.

**Dateien, die auf unserer Übersetzungsplattform übersetzt wurden:**

- Die Datei `translations.json` enthält den Großteil des Textes, der auf den Elementen der Benutzeroberfläche erscheint. Die Schlüssel werden in der Codebasis verwendet, um den richtigen Text für die eingestellte Sprache zu erhalten. This file needs to have the same keys in all languages.

- Die Datei `intro.json` enthält die Schlüssel-Werte-Paare für den Einleitungstext auf den Zertifikatseiten.

  Wenn du Übersetzungen für die Schlüssel hinzufügen/aktualisieren willst, lies bitte [diesen Leitfaden hier](how-to-translate-files).

**Dateien, die NICHT auf unserer Übersetzungsplattform übersetzt wurden:**

- Die `motivation.json` Dateien müssen nicht die gleichen Zitate, Komplimente oder Array-Längen haben. Nur die gleiche JSON-Struktur.

- The `meta-tags.json` file contains the information for our website's meta tag information.

  Changes to these files are typically done by the staff team. If you see something out of the ordinary we recommend you reach us in the [contributors chat room](https://discord.gg/PRyKn3Vbay).

## Testing the Client App in a World Language

You can test the client app in any language available in the [list of `availableLangs` here](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/shared/config/i18n.ts).

```js
export const availableLangs = {
  client: [
    Languages.English,
    Languages.Espanol,
    Languages.Chinese,
    Languages.ChineseTraditional,
    Languages.Italian,
    Languages.Portuguese,
    Languages.Ukrainian,
    Languages.Japanese,
    Languages.German,
    Languages.Arabic
  ],
  ...
};
```

Wenn du eine neue Sprache testest, erstelle einen Ordner mit dem Namen der Sprache als Titel neben den anderen Sprachen und kopiere die JSON-Dateien aus einer anderen Sprache in deinen neuen Ordner.

Add the new language to the `Languages` enum and the `client` array at the top of the [`shared/config/i18n.ts`](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/shared/config/i18n.ts) file.

Befolge dann die Anweisungen in den Kommentaren in derselben Datei, um die restlichen Variablen nach Bedarf hinzuzufügen/zu aktualisieren.

Finally, set the `CLIENT_LOCALE` variable in your `.env` file to the string of the locale you want to build from the `Languages` enum in the above file.

## Wie du Komponenten strukturierst

Wenn du an einer Funktion oder einem Fehler für die Client-Webanwendung arbeitest, z. B. wenn du neue Elemente auf der Einstellungsseite hinzufügst, solltest du die folgenden Richtlinien befolgen. Sie helfen dir, die Komponenten für die Lokalisierung in alle unterstützten Weltsprachen vorzubereiten.

### Funktionelle Komponente

```js
import { useTranslation } from 'react-i18next';

// in der Rendermethode:
const { t } = useTranslation();

// Aufruf der Funktion "t" mit einem Key aus der JSON-Datei:
<p>{t('key')}</p>; // weitere Details unten
```

### Klassenkomponente

```js
import { withTranslation } from 'react-i18next';

// withTranslation fügt die Funktion "t" zu props hinzu:
const { t } = this.props;

// Aufruf der Funktion "t" mit einem Key aus der JSON-Datei:
<h1>{t('key')}</h1> // weitere Details unten

// Export ohne redux:
export default withTranslation()(Component);

// oder mit redux:
export default connect(...)(withTranslation()(Component));
```

## Übersetzen mit Hilfe der "t"-Funktion

### Grundlegende Übersetzung

```js
// in der Komponente:
<p>{t('p1')}</p>

// in der JSON Datei:
{
  "p1": "My paragraph"
}

// Output:
<p>My paragraph</p>
```

### Mit dynamischen Daten

```js
// in der Komponente:
const username = 'moT';

<p>{t('welcome', { username: username })}</p>

// in der JSON Datei:
{
  "welcome": "Welcome {{username}}"
}

// Output:
<p>Welcome moT</p>
```

Das obige Beispiel übergibt der Funktion `t` ein Objekt mit einer Variablen `username`. Die Variable wird im JSON-Wert verwendet, wo `{{username}}` steht.

## Übersetzen mit der `Trans`-Komponente

Generell gilt: Verwende die "t"-Funktion, wenn du kannst. Es gibt aber eine `Trans`-Komponente für den Fall, dass das nicht ausreicht, z. B. wenn du Elemente in den Text eingebettet hast. Du kannst die `Trans`-Komponente mit jeder Art von React-Komponente verwenden.

### Verschachtelte Grundelemente

```js
// in der Komponente:
import { Trans } from 'react-i18next'

<p>
  <Trans>fcc.greeting</Trans>
</p>

// in der JSON Datei:
{
  "fcc": {
    "greeting": "Welcome to <strong>freeCodeCamp</strong>"
  }
}

// Output:
<p>Welcome to <strong>freeCodeCamp</strong></p>
```

You can place the key inside the component tags like in the above example if the text contains "simple" tags with no attributes. `br`, `strong`, `i` und `p` sind die Standardwerte, aber diese Liste kann in der i18n-Konfiguration erweitert werden.

### Verschachtelte komplexe Elemente

In anderen Fällen möchtest du einen bestimmten Text innerhalb eines anderen Elements platzieren, ein Anker-Tag ist ein gutes Beispiel dafür:

```js
// in der Komponente:
<p>
  <Trans i18nKey='check-forum'>
    <a href='https://forum.freecodecamp.org/'>placeholder</a>
  </Trans>
</p>

// in der JSON Datei:
{
  "check-forum": "Check out <0>our forum</0>."
}

// Output:
<p>Check out <a href='https://forum.freecodecamp.org/'>our forum</a></p>
```

Im obigen Beispiel wird der Schlüssel in den Attributen der `Trans`-Komponente gesetzt. Die `<0>` und `</0>` im JSON stehen für das erste Kindelement der Komponente, in diesem Fall das Ankerelement. Wenn es mehr Kindelemente gäbe, würden sie einfach von dort aus weiterzählen und dabei dieselbe Syntax verwenden. Du kannst die Kindelemente einer Komponente in den React Dev Tools finden, indem du sie inspizierst. `placeholder` ist einfach da, weil der Linter sich über leere `<a>`-Elemente beschwert.

### Mit einer Variablen

```js
// in der Komponente:
const email = 'team@freecodecamp.org';

<p>
  <Trans email={email} i18nKey='fcc.email'>
    <a href={`mailto:${email}`}>
      {{ email }}
    </a>
  </Trans>
</p>

// in der JSON Datei:
{
  "fcc": {
    "email": "Send us an email at: <0>{{email}}</0>"
  }
}

// Output:
<p>Send us an email at: <a href='mailto:team@freecodecamp.org'>team@freecodecamp.org</a><p>
```

Im obigen Beispiel werden der Schlüssel und eine Variable in den Attributen der `Trans`-Komponente festgelegt. `{{ email }}` muss auch irgendwo in der `Trans`-Komponente stehen, es ist egal wo.

## Ändern des Textes

Um den Text auf der Client-Seite zu ändern, gehst du in die entsprechende `.json`-Datei, suchst den Schlüssel, der in der React-Komponente verwendet wird, und änderst den Wert in den gewünschten neuen Text. Du solltest die Codebasis nach diesem Schlüssel durchsuchen, um sicherzustellen, dass er nicht an anderer Stelle verwendet wird. Oder, falls ja, dass die Änderungen an allen Stellen sinnvoll sind.

Run `pnpm run clean-and-develop` to apply the change.

## Hinzufügen von Text

Wenn der Text, den du dem Client hinzufügen möchtest, bereits in der entsprechenden `.json`-Datei vorhanden ist, verwende den vorhandenen Schlüssel. Andernfalls erstellst du einen neuen Schlüssel.

Die englische Datei ist die "Quelle der Wahrheit" für alle `.json`-Dateien, die den gleichen Namen haben. Wenn du einen neuen Schlüssel hinzufügen musst, füge ihn dort ein. Dann fügst du den Schlüssel zu **allen** `translations.json`-Dateien hinzu.

> [!NOTE] Verwende englischen Text für alle Sprachen, wenn die Datei über Crowdin übersetzt wird. Andernfalls werden die Tests fehlschlagen.

Es wäre auch schön, wenn die Schlüssel in allen Dateien die gleiche Reihenfolge hätten. Also, try to put all punctuation, spacing, quotes, etc. in the JSON files and not in the components or server files.

> [!NOTE] The underscore (`_`) is a reserved character for keys in the client-side files. In der [Dokumentation](https://www.i18next.com/translation-function/plurals) erfährst du, wie sie verwendet werden.

Run `pnpm run clean-and-develop` to apply the change.

## Proposing a Pull Request (PR)

After you've committed your changes, check here for [how to open a Pull Request](how-to-open-a-pull-request).

## Helpful Documentation

- [react-i18next Dokumente](https://react.i18next.com/latest/usetranslation-hook)
- [i18next Dokumente](https://www.i18next.com/translation-function/essentials)
