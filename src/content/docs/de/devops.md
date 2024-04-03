---
title: Das DevOps Handbuch
---

Dieser Leitfaden wird dir helfen zu verstehen, wie unser Infrastruktur-Stack aufgebaut ist und wie wir unsere Plattformen warten. Dieses Handbuch enthält zwar nicht alle Einzelheiten zu allen Vorgängen, aber er kann als Referenz für dein Verständnis der Systeme dienen.

Let us know if you have feedback or queries and we will be happy to clarify.

## Flight Manual - Code Deployments

This repository is continuously built, tested, and deployed to **separate sets of infrastructure (Servers, Databases, CDNs, etc.)**.

Dies umfasst drei Schritte, die nacheinander zu durchlaufen sind:

1. Neue Änderungen (sowohl Fixes als auch Features) werden über Pull-Requests in unseren primären Entwicklungsbranch (`main`) eingebunden.
2. Diese Änderungen durchlaufen eine Reihe von automatisierten Tests.
3. Sobald die Tests bestanden sind, geben wir die Änderungen frei (oder aktualisieren sie bei Bedarf) und stellen sie in unserer Infrastruktur bereit.

### Building the codebase - Mapping Git Branches to Deployments

Normalerweise wird [`main`](https://github.com/freeCodeCamp/freeCodeCamp/tree/main) (der Standard-Entwicklungsbranch) einmal am Tag in den [`prod-staging`](https://github.com/freeCodeCamp/freeCodeCamp/tree/prod-staging)-Branch zusammengeführt und in einer isolierten Infrastruktur freigegeben.

Dies ist eine Zwischenversion für unsere Entwickler und freiwillig Mitwirkenden. Sie wird auch als unsere "Staging"- oder "Beta"-Version bezeichnet.

Sie ist identisch mit unserer Live-Produktionsumgebung auf `freeCodeCamp.org`. Sie verwendet jedoch einen separaten Satz von Datenbanken, Servern, Web-Proxies, etc. Diese Isolation ermöglicht es uns, laufende Entwicklungen und Funktionen in einem "produktionsähnlichen" Szenario zu testen, ohne die regulären Benutzer der Hauptplattformen von freeCodeCamp.org zu beeinträchtigen.

Sobald das Entwicklerteam [`@freeCodeCamp/dev-team`](https://github.com/orgs/freeCodeCamp/teams/dev-team/members) mit den Änderungen auf der Staging-Plattform zufrieden ist, werden diese Änderungen alle paar Tage auf den [`prod-current`](https://github.com/freeCodeCamp/freeCodeCamp/tree/prod-current)-Branch verschoben.

Dies ist die finale Version, die Änderungen auf unsere Produktionsplattformen auf freeCodeCamp.org überführt.

### Testing changes - Integration and User Acceptance Testing

Wir verwenden verschiedene Stufen von Integrations- und Abnahmetests, um die Qualität des Codes zu überprüfen. Alle unsere Tests werden durch Software wie [GitHub Actions CI](https://github.com/freeCodeCamp/freeCodeCamp/actions) und [Azure Pipelines](https://dev.azure.com/freeCodeCamp-org/freeCodeCamp) durchgeführt.

We have unit tests for testing our challenge solutions, Server APIs, and Client User interfaces. Diese helfen uns, die Integration zwischen verschiedenen Komponenten zu testen.

> [!NOTE] We are also in the process of writing end user tests which will help in replicating real-world scenarios like updating an email or making a call to the API or third-party services.

All diese Tests helfen dabei, zu verhindern, dass sich Probleme wiederholen und stellen sicher, dass wir keinen Fehler einführen, während wir an einem anderen Fehler oder einer Funktion arbeiten.

### Deploying Changes - Pushing changes to servers

Wir haben eine Continuous-Delivery-Software konfiguriert, um Änderungen auf unsere Entwicklungs- und Produktionsserver zu übertragen.

Sobald die Änderungen in die geschützten Release-Branches geschoben werden, wird automatisch eine Build-Pipeline für den Branch erstellt. Die Build-Pipelines sind für die Erstellung von Artefakten und deren Aufbewahrung in einem Cold Storage zur späteren Verwendung zuständig.

Die Build-Pipeline erstellt eine entsprechende Release-Pipeline, wenn sie einen erfolgreichen Lauf absolviert hat. The release pipelines are responsible for collecting the build artifacts, moving them to the servers, and going live.

The statuses of builds and releases are [available here](#build-test-and-deployment-status).

## Trigger a Build, Test, and Deploy

Currently, only members of the developer team can push to the production branches. Die Änderungen in den `production*`-Branches können nur per Fast-Forward-Merge im [`upstream`](https://github.com/freeCodeCamp/freeCodeCamp) landen.

> [!NOTE] In the upcoming days, we would improve this flow to be done via pull requests, for better access management and transparency.

### Pushing changes to Staging Applications

1. Den Remotezugriff korrekt konfigurieren.

   ```sh
   git remote -v
   ```

   **Ergebnisse:**

   ```
   origin   git@github.com:raisedadead/freeCodeCamp.git (fetch)
   origin   git@github.com:raisedadead/freeCodeCamp.git (push)
   upstream git@github.com:freeCodeCamp/freeCodeCamp.git (fetch)
   upstream git@github.com:freeCodeCamp/freeCodeCamp.git (push)
   ```

2. Stelle sicher, dass dein `main`-Branch fehlerfrei ist und mit dem upstream synchronisiert ist.

   ```sh
   git checkout main
   git fetch --all --prune
   git reset --hard upstream/main
   ```

3. Prüfe ob das GitHub CI den `main`-Branch für den upstream weitergibt.

   Die [Continuous Integration](https://github.com/freeCodeCamp/freeCodeCamp/actions)-Tests sollten für den `main`-Branch grün und BESTANDEN (PASSING) sein. Klicke auf das grüne Häkchen neben dem Commit-Hash, wenn du den Code des `main`-Branch siehst.

    <details> <summary> Überprüfen des Status auf GitHub Actions (Screenshot) </summary>
      <br>
      ![Überprüfen des Build-Status auf GitHub Actions](https://raw.githubusercontent.com/freeCodeCamp/freeCodeCamp/main/docs/images/devops/github-actions.png)
    </details>

   Wenn dies fehlschlägt, solltest du anhalten und die Fehler untersuchen.

4. Bestätige dass du in der Lage bist, das Repository lokal zu erstellen.

   ```
   pnpm run clean-and-develop
   ```

5. Verschieben von Änderungen von `main` nach `prod-staging` über ein Fast-Forward-Merge

   ```
   git checkout prod-staging
   git merge main
   git push upstream
   ```

   > [!NOTE] You will not be able to force push and if you have re-written the history in any way, these commands will error out.
   >
   > Wenn dies der Fall ist, hast du möglicherweise etwas falsch gemacht und solltest noch einmal von vorn beginnen.

Die obigen Schritte lösen automatisch einen Lauf in der Build-Pipeline für den `prod-staging`-Branch aus. Sobald der Build abgeschlossen ist, werden die Artefakte als `.zip`-Dateien in einem Cold Storage gespeichert, um später abgerufen und verwendet werden zu können.

Die Release-Pipeline wird automatisch ausgelöst, wenn ein neues Artefakt über die angeschlossene Build-Pipeline verfügbar ist. For staging platforms, this process does not involve manual approval, and the artifacts are pushed to the Client CDN and API servers.

### Pushing changes to Production Applications

Der Prozess ist meist identisch mit den Staging-Plattformen, wobei einige zusätzliche Kontrollen durchgeführt werden. Dies geschieht nur, um sicherzustellen, dass wir nichts auf freeCodeCamp.org beschädigen, das jederzeit von Hunderten von Benutzern verwendet werden kann.

| Führe diese Befehle NICHT aus, bevor du nicht sichergestellt hast, dass alles auf der Staging-Plattform funktioniert. Du solltest keine Tests auf Staging umgehen oder überspringen, bevor du weiter fortfährst. |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                                                                                                                                  |

1. Stelle sicher, dass dein `prod-staging`-Branch fehlerfrei ist und mit dem upstream synchronisiert ist.

   ```sh
   git checkout prod-staging
   git fetch --all --prune
   git reset --hard upstream/prod-staging
   ```

2. Verschiebe Änderungen von `prod-staging` nach `prod-current` mittels eines fast-forward Merge

   ```
   git checkout prod-current
   git merge prod-staging
   git push upstream
   ```

   > [!NOTE] You will not be able to force push and if you have re-written the history in any way, these commands will error out.
   >
   > Wenn dies der Fall ist, hast du vielleicht etwas falsch gemacht und solltest noch einmal von vorne beginnen.

Die obigen Schritte lösen automatisch einen Lauf in der Build-Pipeline für den `prod-current`-Branch aus. Sobald ein Build-Artefakt fertig ist, löst es einen Lauf in der Release-Pipeline aus.

**Zusätzliche Schritte für Mitarbeiter (Staffs)**

Once a release run is triggered, members of the developer staff team will receive an automated manual intervention email. Sie können den Freigabedurchlauf entweder _genehmigen_ oder _ablehnen_.

Wenn die Änderungen einwandfrei funktionieren und auf der Staging-Plattform getestet wurden, kann die Freigabe erfolgen. Die Genehmigung muss innerhalb von 4 Stunden nach dem Auslösen der Veröffentlichung erteilt werden, bevor sie automatisch abgelehnt wird. Ein Mitarbeiter kann den Freigabelauf für abgelehnte Läufe manuell erneut auslösen oder auf den nächsten Freigabezyklus warten.

Für Mitarbeiter bestimmt:

| Prüfe deine E-Mail für einen direkten Link oder [geh zum Release Dashboard](https://dev.azure.com/freeCodeCamp-org/freeCodeCamp/_release), nachdem der Build-Lauf abgeschlossen ist. |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                                                                                                      |

Sobald einer der Mitarbeiter eine Freigabe genehmigt, schiebt die Pipeline die Änderungen live auf das Produktions-CDN und die API-Server von freeCodeCamp.org.

## Build, Test and Deployment Status

Hier ist der aktuelle Test-, Build- und Deployment-Status der Codebasis.

| Branch                                                                           | Unit-Tests                                                                                                                                                                                                                       | Integrations-Tests                                                                                                                                                                                                       | Builds & Deployments                                                                                                              |
| :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| [`main`](https://github.com/freeCodeCamp/freeCodeCamp/tree/main)                 | [![Node.js CI](https://github.com/freeCodeCamp/freeCodeCamp/workflows/Node.js%20CI/badge.svg?branch=main)](https://github.com/freeCodeCamp/freeCodeCamp/actions?query=workflow%3A%22Node.js+CI%22)                               | [![Cypress E2E Tests](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/ke77ns/main&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/ke77ns/analytics/runs-over-time)         | -                                                                                                                                 |
| [`prod-staging`](https://github.com/freeCodeCamp/freeCodeCamp/tree/prod-staging) | [![Node.js CI](https://github.com/freeCodeCamp/freeCodeCamp/workflows/Node.js%20CI/badge.svg?branch=prod-staging)](https://github.com/freeCodeCamp/freeCodeCamp/actions?query=workflow%3A%22Node.js+CI%22+branch%3Aprod-staging) | [![Cypress E2E Tests](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/ke77ns/prod-staging&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/ke77ns/analytics/runs-over-time) | [Azure Pipelines](https://dev.azure.com/freeCodeCamp-org/freeCodeCamp/_dashboards/dashboard/d59f36b9-434a-482d-8dbd-d006b71713d4) |
| [`prod-current`](https://github.com/freeCodeCamp/freeCodeCamp/tree/prod-current) | [![Node.js CI](https://github.com/freeCodeCamp/freeCodeCamp/workflows/Node.js%20CI/badge.svg?branch=prod-current)](https://github.com/freeCodeCamp/freeCodeCamp/actions?query=workflow%3A%22Node.js+CI%22+branch%3Aprod-current) | [![Cypress E2E Tests](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/ke77ns/prod-current&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/ke77ns/analytics/runs-over-time) | [Azure Pipelines](https://dev.azure.com/freeCodeCamp-org/freeCodeCamp/_dashboards/dashboard/d59f36b9-434a-482d-8dbd-d006b71713d4) |
| `prod-next` (experimentell, in Vorbereitung)                                     | -                                                                                                                                                                                                                                | -                                                                                                                                                                                                                        | -                                                                                                                                 |

## Early Access and Beta Testing

Wir laden dich ein, diese Versionen in einem **"public beta testing"** Modus zu testen und frühen Zugriff auf kommende Funktionen der Plattformen zu erhalten. Manchmal werden diese Funktionen/Änderungen als **, Beta, Staging,** usw. bezeichnet.

Your contributions via feedback and issue reports will help us in making the production platforms at `freeCodeCamp.org` more **resilient**, **consistent**, and **stable** for everyone.

Wir danken dir, dass du uns Fehler meldest, auf die du stößt und uns hilfst, freeCodeCamp.org besser zu machen. Du rockst!

### Identifying the Upcoming Version of the Platforms

Currently, a public beta testing version is available at:

| Anwendung | Sprache    | URL                                      |
| :-------- | :--------- | :--------------------------------------- |
| Lernen    | Englisch   | <https://www.freecodecamp.dev>           |
|           | Spanisch   | <https://www.freecodecamp.dev/espanol>   |
|           | Chinesisch | <https://www.freecodecamp.dev/chinese>   |
| News      | Englisch   | <https://www.freecodecamp.dev/news>      |
| Forum     | Englisch   | <https://forum.freecodecamp.dev>         |
|           | Chinesisch | <https://freecodecamp.dev/chinese/forum> |
| API       | -          | `https://api.freecodecamp.dev`           |

> [!NOTE] Der Domainname ist anders als **`freeCodeCamp.org`**. Dies ist beabsichtigt, um die Indizierung durch Suchmaschinen zu verhindern und Verwirrung bei regelmäßigen Benutzern der Plattform zu vermeiden.
>
> The above list is not exhaustive of all the applications that we provision. Also, not all language variants are deployed in staging to conserve resources.

### Identifying the Current Version of the Platforms

**Die aktuelle Version der Plattform ist immer verfügbar unter [`freeCodeCamp.org`](https://www.freecodecamp.org).**

Das Entwicklerteam führt Änderungen aus dem `prod-staging`-Branch nach `prod-current` zusammen, wenn sie Änderungen veröffentlichen. Das oberste Commit sollte das sein, was du live auf der Website siehst.

Du kannst die genaue Version, die eingesetzt wurde, in den Build- und Deployment-Protokollen im Statusbereich nachlesen. Alternatively, you can also ping us in the [contributors chat room](https://discord.gg/PRyKn3Vbay) for a confirmation.

### Known Limitations

Es gibt einige bekannte Einschränkungen und Kompromisse bei der Beta-Version der Plattform.

- **All data / personal progress on these beta platforms will NOT be saved or carried over to production**

  **Benutzer der Beta-Version haben ein von der Produktionsversion getrenntes Konto.** Die Beta-Version verwendet eine von der Produktionsversion physisch getrennte Datenbank. So können wir versehentliche Datenverluste oder Änderungen verhindern. The dev-team may purge the database on this beta version as needed.

- **The beta platforms do not provide any assurances regarding uptime and reliability**

  Es wird erwartet, dass die Deployments häufig und in schnellen Iterationen erfolgen, manchmal mehrmals am Tag. As a result, there will be unexpected downtime at times or broken functionality on the beta version.

- **To ensure the effectiveness of the fix, it is advised not to direct regular users to this site for verification purposes.**

  Die Beta-Seite ist und war immer dazu da, die lokale Entwicklung und das Testen zu unterstützen, nichts anderes. Es ist kein Versprechen auf das, was kommt, sondern ein Ausblick auf das, woran gearbeitet wird.

- **Sign in page may look different than production**

  Wir verwenden einen Test-Mandanten für freeCodeCamp.dev auf Auth0 und haben daher nicht die Möglichkeit, eine benutzerdefinierte Domain einzustellen. Dies führt dazu, dass alle Weiterleitungsaufrufe und die Anmeldeseite auf einer Standarddomain erscheinen, wie z.B.: `https://freecodecamp-dev.auth0.com/`. Dies hat keinen Einfluss auf die Funktionalität und ist so nah an der Produktion, wie wir es nur bekommen können.

## Reporting issues and leaving feedback

Bitte eröffne neue Issues für Diskussionen und zum Melden von Fehlern.

Du kannst eine E-Mail an `dev[at]freecodecamp.org` senden, wenn du irgendwelche Fragen hast. Wie immer sollten alle Sicherheitslücken an `security[at]freecodecamp.org` gemeldet werden, anstatt an den öffentlichen Tracker und das Forum.

## Flight Manual - Server Maintenance

> [!WARNING]
>
> 1. Diese Handbuch gilt nur für die **freeCodeCamp Mitarbeiter**.
> 2. Diese Anweisungen sollten nicht als vollständig angesehen werden, bitte sei vorsichtig.

Als Mitarbeiterin oder Mitarbeiter hast du vielleicht Zugang zu unseren Cloud-Anbietern wie Azure, Digital Ocean usw. erhalten.

Hier sind einige praktische Befehle, mit denen du an den virtuellen Maschinen (VM) arbeiten kannst, z. B. um Wartungsupdates durchzuführen oder allgemeine Aufgaben zu erledigen.

## Get a list of the VMs

> [!NOTE] While you may already have SSH access to the VMs, that alone will not let you list VMs unless you have been granted access to the cloud portals as well.

### Azure

Installiere Azure CLI `az`: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

> **(Einmalig) Installation auf macOS mit [`homebrew`](https://brew.sh):**

```
brew install azure-cli
```

> **(Einmalig) Login:**

```
az login
```

> **Abruf der Liste der VM-Namen und IP-Adressen:**

```
az vm list-ip-addresses --output table
```

### Digital Ocean

Installiere Digital Ocean CLI `doctl`: https://github.com/digitalocean/doctl#installing-doctl

> **(Einmalig) Installation unter macOS mit [`homebrew`](https://brew.sh):**

```
brew install doctl
```

> **(Einmalig) Login:**

Authentifizierung und Kontextwechsel: https://github.com/digitalocean/doctl#Authentifizierung mit-digitalocean

```
doctl auth init
```

> **Liste der VM-Namen und IP-Adressen abrufen:**

```
doctl compute droplet list --format "ID,Name,PublicIPv4"
```

## Spin New Resources

Wir arbeiten daran, unser IaC-Setup zu erstellen. Während das in Arbeit ist, kannst du das Azure-Portal oder die Azure CLI nutzen, um neue virtuelle Maschinen und andere Ressourcen zu starten.

:::tip
Unabhängig davon, welche Spinning-Ressourcen du wählst, haben wir ein paar [handliche Cloud-Init-Konfigurationsdateien](https://github.com/freeCodeCamp/infra/tree/main/cloud-init), die dir bei der grundlegenden Einrichtung helfen, z.B. bei der Installation von Docker oder dem Hinzufügen von SSH-Schlüsseln usw.
:::

## Keep VMs Updated

Du solltest die VMs auf dem neuesten Stand halten, indem du Updates und Upgrades durchführst. This will ensure that the virtual machine is patched with the latest security fixes.

> [!WARNING] Bevor du diese Befehle ausführst:
>
> - Make sure that the VM has been provisioned completely and that there are no post-install steps running.
> - Wenn du Pakete auf einer VM aktualisierst, auf der bereits eine Anwendung läuft, stelle sicher, dass die Anwendung gestoppt/gespeichert wurde. Paket-Updates verursachen Netzwerkbandbreite, Speicher- und/oder CPU-Nutzungsspitzen, die zu Ausfällen bei laufenden Anwendungen führen.

Paketinformationen aktualisieren

```bash
sudo apt update
```

Installierte Pakete upgraden

```bash
sudo apt upgrade -y
```

Unbenutzte Pakete entfernen

```bash
sudo apt autoremove -y
```

## Work on Web Servers (Proxy)

Wir betreiben lastverteilte (Azure Load Balancer) Instanzen für unsere Webserver. Auf diesen Servern läuft NGINX, das den gesamten Datenverkehr von verschiedenen Anwendungen, die auf ihrer eigenen Infrastruktur laufen, zu freeCodeCamp.org umleitet.

Die NGINX-Konfiguration ist verfügbar in [diesem Repository](https://github.com/freeCodeCamp/nginx-config).

### Erste Installation

Provisionieren der VMs mit Code

1. Installiere NGINX und konfiguriere es aus dem Repository.

   ```bash
   sudo su

   cd /var/www/html
   git clone https://github.com/freeCodeCamp/error-pages

   cd /etc/
   rm -rf nginx
   git clone https://github.com/freeCodeCamp/nginx-config nginx

   cd /etc/nginx
   ```

2. Installiere die Cloudflare-Ursprungszertifikate und die upstream Anwendungskonfiguration.

   Hole die Cloudflare-Ursprungszertifikate aus dem sicheren Speicher und installiere sie an erforderlichen Stellen.

   **oder**

   Übertrage bestehende Zertifikate:

   ```bash
   # Local
   scp -r username@source-server-public-ip:/etc/nginx/ssl ./
   scp -pr ./ssl username@target-server-public-ip:/tmp/

   # Remote
   rm -rf ./ssl
   mv /tmp/ssl ./
   ```

   Aktualisiere die Upstream-Konfigurationen:

   ```bash
   vi configs/upstreams.conf
   ```

   Ergänze/aktualisiere die Quell-/Herkunfts-IP-Adressen der Anwendung.

3. Set up networking and firewalls.

   Konfiguriere die Azure Firewalls und `ufw` nach Bedarf für die ingress-Ursprungsadressen.

4. Füge die VM zum Load Balancer Backend Pool hinzu.

   Konfiguriere den Load Balancer und füge ihm Regeln hinzu, falls nötig. Es kann möglicherweise erforderlich sein, auch die VMs zum Load Balancer-Backend-Pool hinzufügen.

### Logging und Monitoring

1. Überprüfe den Status des NGINX-Dienstes mit dem folgenden Befehl:

   ```bash
   sudo systemctl status nginx
   ```

2. Logging und Monitoring für die Server sind verfügbar unter:

   NGINX Amplify: [https://amplify.nginx.com]('https://amplify.nginx.com'), unser aktuelles Basis-Monitoring-Dashboard. Wir arbeiten an feineren Metriken für eine bessere Messbarkeit

### Aktualisieren von Instanzen (Wartung)

Konfigurationsänderungen an unseren NGINX-Instanzen werden auf GitHub gepflegt, diese sollten auf jeder Instanz wie folgt bereitgestellt werden:

1. Verbinde dich per SSH mit der Instanz und gib sudo ein

```bash
sudo su
```

2. Lade den neuesten Konfigurationscode herunter.

```bash
cd /etc/nginx
git fetch --all --prune
git reset --hard origin/main
```

3. Teste und lade die Konfiguration neu [mit Signals](https://docs.nginx.com/nginx/admin-guide/basic-functionality/runtime-control/#controlling-nginx).

```bash
nginx -t
nginx -s reload
```

## Work on API Instances

1. Installiere Build-Tools für Node-Binaries (`node-gyp`) usw.

```bash
sudo apt install build-essential
```

### Erste Installation

Bereitstellung von VMs mit dem Code

1. Install Node LTS.

2. Install pnpm globally.

```bash
npm install -g pnpm
```

3. Install pm2 globally.

```bash
npm install -g pm2
```

4. Clone freeCodeCamp, set up env, and keys.

```bash
git clone https://github.com/freeCodeCamp/freeCodeCamp.git
cd freeCodeCamp
git checkout prod-current # or any other branch to be deployed
```

5. Create the `.env` from the secure credentials storage.

6. Install dependencies

```bash
pnpm install
```

7. Setup pm2 `logrotate` and startup on boot

```bash
pm2 install pm2-logrotate
pm2 startup
```

8. Build the server

```bash
pnpm prebuild && pnpm build:curriculum && pnpm build:server
```

9.  Start Instances

```bash
pnpm start:server
```

### Logging und Monitoring

```bash
pm2 logs
```

```bash
pm2 monit
```

### Aktualisieren von Instanzen (Wartung)

Codeänderungen müssen von Zeit zu Zeit auf die API-Instanzen übertragen werden. Es kann ein fortlaufendes Update oder ein manuelles Update sein. The latter is essential when changing dependencies or adding environment variables.

:::danger
Automatisierte Pipelines können derzeit keine Aktualisierungen von Abhängigkeiten vornehmen. Wir müssen eine manuelle Aktualisierung durchführen, bevor die Deployment-Pipeline ausgeführt wird.
:::

#### 1. Manual Updates - Used for updating dependencies, env variables.

1. Stop all instances

```bash
pm2 stop all
```

2. Install dependencies

```bash
pnpm install
```

3. Build the server

```bash
pnpm prebuild && pnpm build:curriculum && pnpm build:server
```

4. Start Instances

```bash
pnpm start:server && pm2 logs
```

#### 2. Rolling updates - Used for logical changes to code.

```bash
pnpm reload:server && pm2 logs
```

> [!NOTE] We are handling rolling updates to code and logic via pipelines. Du solltest diese Befehle nicht ausführen müssen. Sie dienen nur der Dokumentation.

#### 3. Updating Node

1. Install new Node version

2. Update pm2 to use the new version

```bash
pm2 update
```

## Work on Client Instances

1. Install build tools for node binaries (`node-gyp`) etc.

```bash
sudo apt install build-essential
```

### Erstinstallation

Bereitstellung von VMs mit dem Code

1. Install Node LTS.

2. Update `npm` and install PM2 and setup `logrotate` and startup on boot

   ```bash
   npm i -g npm@8
   npm i -g pm2@4
   npm install -g serve@13
   pm2 install pm2-logrotate
   pm2 startup
   ```

3. Clone client config, setup env and keys.

   ```bash
   git clone https://github.com/freeCodeCamp/client-config.git client
   cd client
   ```

   Start placeholder instances for the web client, these will be updated with artifacts from the Azure pipeline.

   > Todo: This setup needs to move to S3 or Azure Blob storage
   >
   > ```bash
   >    echo "serve -c ../serve.json -p 50505 www" > client-start-primary.sh
   >    chmod +x client-start-primary.sh
   >    pm2 delete client-primary
   >    pm2 start  ./client-start-primary.sh --name client-primary
   >    echo "serve -c ../serve.json -p 52525 www" > client-start-secondary.sh
   >    chmod +x client-start-secondary.sh
   >    pm2 delete client-secondary
   >    pm2 start  ./client-start-secondary.sh --name client-secondary
   > ```

### Logging und Monitoring

```bash
pm2 logs
```

```bash
pm2 monit
```

### Instanzen aktualisieren (Wartung)

Codeänderungen müssen von Zeit zu Zeit auf die API-Instanzen übertragen werden. Es kann ein fortlaufendes Update oder ein manuelles Update sein. Letzteres ist wichtig, wenn du Abhängigkeiten ändern oder Umgebungsvariablen hinzufügen.

:::danger
Automatisierte Pipelines können derzeit keine Aktualisierungen von Abhängigkeiten vornehmen. Wir müssen eine manuelle Aktualisierung durchführen, bevor die Deployment-Pipeline ausgeführt wird.
:::

#### 1. Manuelle Updates - Werden für die Aktualisierung von Abhängigkeiten und Umgebungsvariablen verwendet.

1. Stop all instances

   ```bash
   pm2 stop all
   ```

2. Install or update dependencies

3. Start Instances

   ```bash
   pm2 start all --update-env && pm2 logs
   ```

#### 2. Fortlaufende (Rolling) Updates - Werden für logische Änderungen am Code verwendet.

```bash
pm2 reload all --update-env && pm2 logs
```

> [!NOTE] Wir führen fortlaufende Aktualisierungen des Codes, der Logik, mittels Pipelines durch. Du sollte diese Befehle nicht ausführen müssen. Sie dienen nur der Dokumentation.

## Work on Chat Servers

Unsere Chatserver sind mit einer HA-Konfiguration verfügbar, die [in den Rocket.Chat-Dokumenten empfohlen wird](https://docs.rocket.chat/installation/docker-containers/high-availability-install). Die Datei `docker-compose` dafür ist [hier](https://github.com/freeCodeCamp/chat-config) verfügbar.

Wir stellen redundante NGINX-Instanzen bereit, die ihrerseits einen Load Balancing (Azure Load Balancer) vor dem Rocket.Chat-Cluster aufweisen. Die NGINX-Konfigurationsdatei ist [hier](https://github.com/freeCodeCamp/chat-nginx-config) verfügbar.

### First Install

Bereitstellen von VMs mit dem Code

**NGINX Cluster:**

1. Install NGINX and configure from repository.

   ```bash
   sudo su

   cd /var/www/html
   git clone https://github.com/freeCodeCamp/error-pages

   cd /etc/
   rm -rf nginx
   git clone https://github.com/freeCodeCamp/chat-nginx-config nginx

   cd /etc/nginx
   ```

2. Install Cloudflare origin certificates and upstream application config.

   Get the Cloudflare origin certificates from the secure storage and install at required locations.

   **OR**

   Move over existing certificates:

   ```bash
   # Local
   scp -r username@source-server-public-ip:/etc/nginx/ssl ./
   scp -pr ./ssl username@target-server-public-ip:/tmp/

   # Remote
   rm -rf ./ssl
   mv /tmp/ssl ./
   ```

   Update Upstream Configurations:

   ```bash
   vi configs/upstreams.conf
   ```

   Add/update the source/origin application IP addresses.

3. Set up networking and firewalls.

   Configure Azure firewalls and `ufw` as needed for ingress origin addresses.

4. Add the VM to the load balancer backend pool.

   Configure and add rules to load balancer if needed. You may also need to add the VMs to load balancer backend pool if needed.

**Docker Cluster:**

1. Install Docker and configure from the repository

   ```bash
   git clone https://github.com/freeCodeCamp/chat-config.git chat
   cd chat
   ```

2. Configure the required environment variables and instance IP addresses.

3. Run rocket-chat server

   ```bash
   docker-compose config
   docker-compose up -d
   ```

### Logging and Monitoring

1. Check status for NGINX service using the below command:

   ```bash
   sudo systemctl status nginx
   ```

2. Check status for running docker instances with:

   ```bash
   docker ps
   ```

### Updating Instances (Maintenance)

**NGINX Cluster:**

Konfigurationsänderungen für unsere NGINX-Instanzen werden auf GitHub gepflegt. Diese sollten auf jeder Instanz wie folgt implementiert werden:

1. SSH into the instance and enter sudo

   ```bash
   sudo su
   ```

2. Get the latest config code.

   ```bash
   cd /etc/nginx
   git fetch --all --prune
   git reset --hard origin/main
   ```

3. Test and reload the config [with Signals](https://docs.nginx.com/nginx/admin-guide/basic-functionality/runtime-control/#controlling-nginx).

   ```bash
   nginx -t
   nginx -s reload
   ```

**Docker Cluster:**

1. SSH into the instance and navigate to the chat config path

   ```bash
   cd ~/chat
   ```

2. Get the latest config code.

   ```bash
   git fetch --all --prune
   git reset --hard origin/main
   ```

3. Pull down the latest docker image for Rocket.Chat

   ```bash
   docker-compose pull
   ```

4. Update the running instances

   ```bash
   docker-compose up -d
   ```

5. Validate the instances are up

   ```bash
   docker ps
   ```

6. Cleanup extraneous resources

   ```bash
   docker system prune --volumes
   ```

   Output:

   ```bash
   WARNING! This will remove:
     - all stopped containers
     - all networks not used by at least one container
     - all volumes not used by at least one container
     - all dangling images
     - all dangling build cache

   Are you sure you want to continue? [y/N] y
   ```

   Select yes (y) to remove everything that is not in use. This will remove all stopped containers, all networks and volumes not used by at least one container, and all dangling images and build caches.

## Work on Contributor Tools

### Deploy Updates

ssh in die VM (gehostet auf Digital Ocean).

```bash
cd tools
git pull origin master
pnpm install
pnpm run build
pm2 restart contribute-app
```

## Updating Node.js Versions on VMs

Liste die aktuell installierten node & npm Versionen auf

```bash
nvm -v
node -v
npm -v

nvm ls
```

Installiere die neueste Node.js LTS, und installiere alle globalen Pakete neu

```bash
nvm install --lts --reinstall-packages-from=default
```

Überprüfe installierte Pakete

```bash
npm ls -g --depth=0
```

Alias the `default` Node.js version to the current LTS (pinned to the latest major version)

```bash
nvm alias default 16
```

(Optional) Deinstalliere alte Versionen

```bash
nvm uninstall <version>
```

:::danger
In Client-Anwendungen ist es nicht möglich, `pm2 resurrect` zu verwenden, um Shell-Skripte zwischen Node.js-Versionen wieder herzustellen. Setze stattdessen Prozesse von Grund auf neu auf. This should become nicer when we move to a docker-based setup.
:::

> Wenn du PM2 für Prozesse verwendest, musst du auch die Anwendungen aufrufen und die Prozessliste für die automatische Wiederherstellung bei Neustarts speichern.

Hole die Anweisungen/Befehle zur Deinstallation mit dem Befehl `unstartup` und verwende die Ausgabe, um die systemctl Dienste zu entfernen

```bash
pm2 unstartup
```

Hole dir die Installationsanweisungen/Befehle mit dem `startup` Befehl und benutze die Ausgabe, um die systemctl Dienste hinzuzufügen

```bash
pm2 startup
```

Kurzbefehle für PM2, um gespeicherte Prozesse aufzulisten, wiederherzustellen usw.

```bash
pm2 ls
```

```bash
pm2 resurrect
```

```bash
pm2 save
```

```bash
pm2 logs
```

## Installing and Updating Azure Pipeline Agents

See: https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/v2-linux?view=azure-devops and follow the instructions to stop, remove, and reinstall agents. Im Großen und Ganzen kannst du die hier aufgeführten Schritte befolgen.

Du benötigst einen PAT, den du hier finden kannst: https://dev.azure.com/freeCodeCamp-org/_usersSettings/tokens

### Installing Agents on Deployment targets

Navigiere zu [Azure Devops](https://dev.azure.com/freeCodeCamp-org) und registriere den Agenten von Grund auf neu in den erforderlichen [Entwicklungsgruppen](https://dev.azure.com/freeCodeCamp-org/freeCodeCamp/_machinegroup).

> [!NOTE] Du solltest die Skripte im Home-Verzeichnis ausführen und sicherstellen, dass kein anderes `azagent` Verzeichnis existiert.

### Updating Agents

Derzeit müssen Agents zum Aktualisieren entfernt und neu konfiguriert werden. Dies ist erforderlich, damit sie die `PATH`-Werte und andere Systemumgebungsvariablen korrekt übernehmen können. Wir müssen dies zum Beispiel tun, um Node.js auf unseren Ziel-VMs zu aktualisieren.

1. Navigate and check status of the service

   ```bash
   cd ~/azagent
   sudo ./svc.sh status
   ```

2. Stop the service

   ```bash
   sudo ./svc.sh stop
   ```

3. Uninstall the service

   ```bash
   sudo ./svc.sh uninstall
   ```

4. Remove the agent from the pipeline pool

   ```bash
   ./config.sh remove
   ```

5. Remove the config files

   ```bash
   cd ~
   rm -rf ~/azagent
   ```

Wenn du die oben genannten Schritte abgeschlossen hast, kannst du die gleichen Schritte wie bei der Installation des Agenten wiederholen.

## Flight Manual - Email Blast

Wir verwenden [ein CLI-Tool](https://github.com/freecodecamp/sendgrid-email-blast), um den wöchentlichen Newsletter zu versenden. Um dieses in Betrieb zu nehmen und den Prozess zu beginnen:

1. Sign in to DigitalOcean, and spin up new droplets under the `Sendgrid` project. Use the Ubuntu Sendgrid snapshot with the most recent date. This comes pre-loaded with the CLI tool and the script to fetch emails from the database. With the current volume, three droplets are sufficient to send the emails in a timely manner.

2. Set up the script to fetch the email list.

   ```bash
   cd /home/freecodecamp/scripts/emails
   cp sample.env .env
   ```

   You will need to replace the placeholder values in the `.env` file with your credentials.

3. Run the script.

   ```bash
   node get-emails.js emails.csv
   ```

   This will save the email list in an `emails.csv` file.

4. Break the emails down into multiple files, depending on the number of droplets you need. This is easiest to do by using `scp` to pull the email list locally and using your preferred text editor to split them into multiple files. Each file will need the `email,unsubscribeId` header.

5. Switch to the CLI directory with `cd /home/sendgrid-email-blast` and configure the tool [per the documentation](https://github.com/freeCodeCamp/sendgrid-email-blast/blob/main/README).

6. Run the tool to send the emails, following the [usage documentation](https://github.com/freeCodeCamp/sendgrid-email-blast/blob/main/docs/cli-steps).

7. When the email blast is complete, verify that no emails have failed before destroying the droplets.

## Flight Manual - Adding news instances for new languages

### Theme Changes

Wir verwenden ein eigenes [Theme](https://github.com/freeCodeCamp/news-theme) für unsere Nachrichtenpublikation. Wenn du die folgenden Änderungen am Theme vornimmst, können neue Sprachen hinzugefügt werden.

1. Include an `else if` statement for the new [ISO language code](https://www.loc.gov/standards/iso639-2/php/code_list.php) in [`setup-locale.js`](https://github.com/freeCodeCamp/news-theme/blob/main/assets/config/setup-locale.js)
2. Create an initial config folder by duplicating the [`assets/config/en`](https://github.com/freeCodeCamp/news-theme/tree/main/assets/config/en) folder and changing its name to the new language code. (`en` —> `es` for Spanish)
3. Inside the new language folder, change the variable names in `main.js` and `footer.js` to the relevant language short code (`enMain` —> `esMain` for Spanish)
4. Duplicate the [`locales/en.json`](https://github.com/freeCodeCamp/news-theme/blob/main/locales/en.json) and rename it to the new language code.
5. In [`partials/i18n.hbs`](https://github.com/freeCodeCamp/news-theme/blob/main/partials/i18n.hbs), add scripts for the newly created config files.
6. Add the related language `day.js` script from [cdnjs](https://cdnjs.com/libraries/dayjs/1.10.4) to the [freeCodeCamp CDN](https://github.com/freeCodeCamp/cdn/tree/main/build/news-assets/dayjs/1.10.4/locale)

### Ghost Dashboard Changes

Aktualisiere die Publikations-Assets, indem du zum Ghost Dashboard > Einstellungen > Allgemein gehst und die [Icon](https://github.com/freeCodeCamp/design-style-guide/blob/master/assets/fcc-puck-500-favicon.png), das [Logo](https://github.com/freeCodeCamp/design-style-guide/blob/master/downloads/fcc_primary_large.png) und das [Cover](https://github.com/freeCodeCamp/design-style-guide/blob/master/assets/fcc_ghost_publication_cover.png) der Publikationen hochlädst.
