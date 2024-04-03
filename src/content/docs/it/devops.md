---
title: Manuale di DevOps
---

Questa guida ti aiuterà a capire lo stack della nostra infrastruttura e come gestiamo le nostre piattaforme. Anche se questa guida non ha dettagli esaustivi per tutte le operazioni, può essere utilizzata come riferimento per la comprensione dei sistemi.

Let us know if you have feedback or queries and we will be happy to clarify.

## Flight Manual - Code Deployments

This repository is continuously built, tested, and deployed to **separate sets of infrastructure (Servers, Databases, CDNs, etc.)**.

Questo prevede tre fasi da seguire in sequenza:

1. I nuovi cambiamenti (sia risoluzioni di bug che nuove caratteristiche) sono aggiunti al branch principale di sviluppo (`main`) tramite pull requests.
2. Queste modifiche sono testate da una serie di test automatizzati.
3. Una volta che i test sono superati, rilasciamo le modifiche (o aggiornamenti se necessario) alle distribuzioni sulla nostra infrastruttura.

### Building the codebase - Mapping Git Branches to Deployments

In genere, si fa un merge di [`main`](https://github.com/freeCodeCamp/freeCodeCamp/tree/main) (il ramo di sviluppo di default) nel branch [`prod-staging`](https://github.com/freeCodeCamp/freeCodeCamp/tree/prod-staging) una volta al giorno, e questo è rilasciato in una infrastruttura isolata.

Questa è una release intermedia per i nostri sviluppatori e collaboratori volontari. È anche noto come il nostro rilascio di "staging" o "beta".

È identico al nostro ambiente di produzione live su `freeCodeCamp.org`, a parte il fatto che utilizza un set separato di database, server, web-proxies, ecc. Questo isolamento ci permette di testare lo sviluppo continuo e le caratteristiche in uno scenario come quello di "produzione", senza influenzare gli utenti regolari delle principali piattaforme di freeCodeCamp.org.

Una volta che il team di sviluppo [`@freeCodeCamp/dev-team`](https://github.com/orgs/freeCodeCamp/teams/dev-team/members) è soddisfatto dei cambiamenti nella piattaforma di staging, questi cambiamenti sono spostati ogni pochi giorni al branch [`prod-current`](https://github.com/freeCodeCamp/freeCodeCamp/tree/prod-current).

Questa è la versione finale che sposta le modifiche alle nostre piattaforme di produzione su freeCodeCamp.org.

### Testing changes - Integration and User Acceptance Testing

Adottiamo vari livelli di integrazione e test di accettazione per verificare la qualità del codice. Tutti i nostri test sono fatti con software come [GitHub Actions CI](https://github.com/freeCodeCamp/freeCodeCamp/actions) e [Azure Pipelines](https://dev.azure.com/freeCodeCamp-org/freeCodeCamp).

We have unit tests for testing our challenge solutions, Server APIs, and Client User interfaces. Questi ci aiutano a testare l'integrazione tra i diversi componenti.

> [!NOTE] We are also in the process of writing end user tests which will help in replicating real-world scenarios like updating an email or making a call to the API or third-party services.

Tutti questi test aiutano a evitare che i problemi si ripetano e assicurano di non introdurre dei bug mentre si lavora su un altro bug o una nuova funzionalità.

### Deploying Changes - Pushing changes to servers

Abbiamo configurato un software di consegna continua per inviare modifiche ai nostri server di sviluppo e produzione.

Una volta che le modifiche sono inviate ai branch di rilascio protetti, una pipeline di build viene attivata automaticamente per il branch. Le pipeline di build sono responsabili della compilazione degli artefatti e di conservarli in un deposito di stoccaggio per un uso successivo.

La pipeline di build continua ad attivare una corrispondente pipeline di rilascio se completa un'esecuzione riuscita. The release pipelines are responsible for collecting the build artifacts, moving them to the servers, and going live.

The statuses of builds and releases are [available here](#build-test-and-deployment-status).

## Trigger a Build, Test, and Deploy

Currently, only members of the developer team can push to the production branches. Le modifiche ai branch `production-*` possono avvenire solo tramite il merge fast-forward all'[`upstream`](https://github.com/freeCodeCamp/freeCodeCamp).

> [!NOTE] In the upcoming days, we would improve this flow to be done via pull requests, for better access management and transparency.

### Pushing changes to Staging Applications

1. Configura correttamente i tuoi remotes.

   ```sh
   git remote -v
   ```

   **Risultati:**

   ```
   origin   git@github.com:raisedadead/freeCodeCamp.git (fetch)
   origin   git@github.com:raisedadead/freeCodeCamp.git (push)
   upstream git@github.com:freeCodeCamp/freeCodeCamp.git (fetch)
   upstream git@github.com:freeCodeCamp/freeCodeCamp.git (push)
   ```

2. Assicurati che il tuo branch `main` sia pulito e sincronizzato con la fonte (upstream).

   ```sh
   git checkout main
   git fetch --all --prune
   git reset --hard upstream/main
   ```

3. Controlla che i test GitHub CI siano superati nel branch `main` dell'upstream.

   I test di [integrazione continua](https://github.com/freeCodeCamp/freeCodeCamp/actions) dovrebbero essere verdi ed essere superati per il branch `main`. Clicca sulla spunta verde vicino all'hash del commit guardando il codice del branch `main`.

    <details> <summary> Controllare lo stato sulle GitHub Actions (screenshot) </summary>
      <br>
      ![Controllare lo stato sulle GitHub Actions](https://raw.githubusercontent.com/freeCodeCamp/freeCodeCamp/main/docs/images/devops/github-actions.png)
    </details>

   Se questo fallisce, dovresti fermarti e investigare gli errori.

4. Conferma di essere in grado di fare il build del repository localmente.

   ```
   pnpm run clean-and-develop
   ```

5. Sposta cambiamenti da `main` a `prod-staging` con un merge fast-forward

   ```
   git checkout prod-staging
   git merge main
   git push upstream
   ```

   > [!NOTE] You will not be able to force push and if you have re-written the history in any way, these commands will error out.
   >
   > Se lo fanno, potresti aver fatto qualcosa in modo errato e dovresti solo ricominciare da capo.

Gli step precedenti attiveranno automaticamente l'esecuzione della pipeline di build per il ramo `prod-staging`. Una volta completata la build, gli artefatti vengono salvati come file `.zip` in un archivio per essere recuperati e utilizzati in seguito.

La pipeline di rilascio viene attivata automaticamente quando un nuovo artefatto è disponibile dalla pipeline di build connessa. For staging platforms, this process does not involve manual approval, and the artifacts are pushed to the Client CDN and API servers.

### Pushing changes to Production Applications

Il processo è per lo più lo stesso delle piattaforme di staging, con la messa in atto di alcuni controlli aggiuntivi. Questo è solo per essere sicuri: non possiamo permetterci di rompere nulla su freeCodeCamp.org dato che può vedere centinaia di utenti che lo utilizzano in qualsiasi momento.

| NON eseguire questi comandi a meno che non sia stato verificato che tutto funziona sulla piattaforma di staging. Non dovresti bypassare o saltare alcun test di staging prima di procedere ulteriormente. |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                                                                                                                           |

1. Assicurati che il tuo ramo `prod-staging` sia pulito e sincronizzato con la fonte.

   ```sh
   git checkout prod-staging
   git fetch --all --prune
   git reset --hard upstream/prod-staging
   ```

2. Sposta cambiamenti da `prod-staging` a `prod-current` con un merge fast-forward

   ```
   git checkout prod-current
   git merge prod-staging
   git push upstream
   ```

   > [!NOTE] You will not be able to force push and if you have re-written the history in any way, these commands will error out.
   >
   > Se lo fanno, potresti aver fatto qualcosa in modo errato e dovresti solo ricominciare da capo.

Gli step precedenti attiveranno automaticamente l'esecuzione della pipeline di build per il ramo `prod-current`. Una volta che un artefatto di build è pronto, attiverà un avvio della pipeline di rilascio.

**Misure supplementari per le azioni dello Staff**

Once a release run is triggered, members of the developer staff team will receive an automated manual intervention email. Possono _approvare_ o _rifiutare_ l'esecuzione del rilascio.

Se le modifiche funzionano bene e sono state testate sulla piattaforma di staging, allora possono essere approvate. L’approvazione deve essere rilasciata entro 4 ore dall’attivazione del rilascio prima di essere respinta automaticamente. Un membro dello staff può riattivare il rilascio manualmente per gli avvi rifiutati, o attendere il prossimo ciclo di rilascio.

Per uso dello staff:

| Controlla la tua email per un link diretto o [vai alla dashboard di rilascio](https://dev.azure.com/freeCodeCamp-org/freeCodeCamp/_release) dopo che la build è completata. |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                                                                                             |

Una volta che uno dei membri dello staff approva una release, la pipeline porterà i cambiamenti live ai CDN di produzione e ai server API di freecodecamp.org.

## Build, Test and Deployment Status

Ecco lo stato attuale di test, build e deployment del codebase.

| Ramo                                                                             | Test unitari                                                                                                                                                                                                                     | Test di integrazione                                                                                                                                                                                                     | Build & rilasci                                                                                                                   |
| :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| [`main`](https://github.com/freeCodeCamp/freeCodeCamp/tree/main)                 | [![Node.js CI](https://github.com/freeCodeCamp/freeCodeCamp/workflows/Node.js%20CI/badge.svg?branch=main)](https://github.com/freeCodeCamp/freeCodeCamp/actions?query=workflow%3A%22Node.js+CI%22)                               | [![Cypress E2E Tests](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/ke77ns/main&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/ke77ns/analytics/runs-over-time)         | -                                                                                                                                 |
| [`prod-staging`](https://github.com/freeCodeCamp/freeCodeCamp/tree/prod-staging) | [![Node.js CI](https://github.com/freeCodeCamp/freeCodeCamp/workflows/Node.js%20CI/badge.svg?branch=prod-staging)](https://github.com/freeCodeCamp/freeCodeCamp/actions?query=workflow%3A%22Node.js+CI%22+branch%3Aprod-staging) | [![Cypress E2E Tests](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/ke77ns/prod-staging&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/ke77ns/analytics/runs-over-time) | [Azure Pipelines](https://dev.azure.com/freeCodeCamp-org/freeCodeCamp/_dashboards/dashboard/d59f36b9-434a-482d-8dbd-d006b71713d4) |
| [`prod-current`](https://github.com/freeCodeCamp/freeCodeCamp/tree/prod-current) | [![Node.js CI](https://github.com/freeCodeCamp/freeCodeCamp/workflows/Node.js%20CI/badge.svg?branch=prod-current)](https://github.com/freeCodeCamp/freeCodeCamp/actions?query=workflow%3A%22Node.js+CI%22+branch%3Aprod-current) | [![Cypress E2E Tests](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/ke77ns/prod-current&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/ke77ns/analytics/runs-over-time) | [Azure Pipelines](https://dev.azure.com/freeCodeCamp-org/freeCodeCamp/_dashboards/dashboard/d59f36b9-434a-482d-8dbd-d006b71713d4) |
| `prod-next` (sperimentale, futuro)                                               | -                                                                                                                                                                                                                                | -                                                                                                                                                                                                                        | -                                                                                                                                 |

## Early Access and Beta Testing

Ti diamo il benvenuto al test di queste versioni in modalità **"public beta testing"** e all'accesso anticipato alle funzionalità imminenti delle piattaforme. A volte queste funzionalità/modifiche sono indicate come **next, beta, staging,** ecc. in modo intercambiabile.

Your contributions via feedback and issue reports will help us in making the production platforms at `freeCodeCamp.org` more **resilient**, **consistent**, and **stable** for everyone.

Ti ringraziamo se vorrai segnalare i bug che incontrerai aiutandoci a migliorare freeCodeCamp.org. Sei un grande!

### Identifying the Upcoming Version of the Platforms

Currently, a public beta testing version is available at:

| Applicazione | Lingua   | URL                                      |
| :----------- | :------- | :--------------------------------------- |
| Learn        | Inglese  | <https://www.freecodecamp.dev>           |
|              | Spagnolo | <https://www.freecodecamp.dev/espanol>   |
|              | Cinese   | <https://www.freecodecamp.dev/chinese>   |
| News         | Inglese  | <https://www.freecodecamp.dev/news>      |
| Forum        | Inglese  | <https://forum.freecodecamp.dev>         |
|              | Cinese   | <https://freecodecamp.dev/chinese/forum> |
| API          | -        | `https://api.freecodecamp.dev`           |

> [!NOTE] Il nome del dominio è diverso da **`freeCodeCamp.org`**. Questo è intenzionale per prevenire l'indicizzazione dai motori di ricerca e creare confusione per i normali utenti della piattaforma.
>
> The above list is not exhaustive of all the applications that we provision. Also, not all language variants are deployed in staging to conserve resources.

### Identifying the Current Version of the Platforms

**La versione attuale della piattaforma è sempre disponibile su [`freeCodeCamp.org`](https://www.freecodecamp.org).**

Il team di sviluppo fa un merge dei cambiamenti dal ramo `prod-staging` a `prod-current` quando rilascia dei cambiamenti. Il commit superiore dovrebbe essere quello che si vede live sul sito.

È possibile identificare la versione esatta distribuita visitando i registri di compilazione e distribuzione disponibili nella sezione stato. Alternatively, you can also ping us in the [contributors chat room](https://discord.gg/PRyKn3Vbay) for a confirmation.

### Known Limitations

Ci sono alcune limitazioni e compromessi noti quando si utilizza la versione beta della piattaforma.

- **All data / personal progress on these beta platforms will NOT be saved or carried over to production**

  **Gli utenti nella versione beta avranno un account separato dalla produzione.** La versione beta utilizza un database fisicamente separato dalla produzione. Questo ci dà la possibilità di prevenire qualsiasi perdita accidentale di dati o modifiche. The dev-team may purge the database on this beta version as needed.

- **The beta platforms do not provide any assurances regarding uptime and reliability**

  Il deploy dovrebbe essere frequente e in iterazioni rapide, talvolta più volte al giorno. As a result, there will be unexpected downtime at times or broken functionality on the beta version.

- **To ensure the effectiveness of the fix, it is advised not to direct regular users to this site for verification purposes.**

  Il sito beta ha il solo scopo di supportare lo sviluppo locale e il testing, nient'altro. Non è una promessa di ciò che sta arrivando, ma un assaggio di ciò a cui si sta lavorando.

- **Sign in page may look different than production**

  Usiamo un test tenant per freeCodeCamp.dev su Auth0, e quindi non abbiamo l'abilità di impostare un dominio personalizzato. Questo fa sì che tutte le callback di reindirizzamento e la pagina di login appaiano su un dominio predefinito come: `https://freecodecamp-dev.auth0.com/`. Questo non ha effetto sulle funzionalità ed è quanto più vicino possiamo arrivare alla produzione.

## Reporting issues and leaving feedback

Per favore apri nuove issue per discutere e segnalare bug.

Puoi inviare un'email a `dev[at]freecodecamp.org` se hai domande. Come sempre tutte le vulnerabilità di sicurezza dovrebbero essere segnalate a `security[at]freecodecamp.org` invece che al tracker pubblico o nel forum.

## Flight Manual - Server Maintenance

> [!WARNING]
>
> 1. Questa guida è rivolta solo ai **membri dello staff di freeCodeCamp**.
> 2. Queste istruzioni non devono essere considerate esaustive, per favore usa cautela.

Come membro dello staff, potrebbe esserti stato dato accesso ai nostri fornitori di servizi cloud come Azure, Digital Ocean, ecc.

Ecco alcuni utili comandi che puoi usare per lavorare sulle Virtual Machine (VM), per fare manutenzione o faccende generali.

## Get a list of the VMs

> [!NOTE] While you may already have SSH access to the VMs, that alone will not let you list VMs unless you have been granted access to the cloud portals as well.

### Azure

Installa Azure CLI `az`: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

> **(Una volta sola) Installa su macOS con [`homebrew`](https://brew.sh):**

```
brew install azure-cli
```

> **(Una volta sola) Login:**

```
az login
```

> **Ottieni una lista dei nomi delle VM e degli indirizzi IP:**

```
az vm list-ip-addresses --output table
```

### Digital Ocean

Installa Digital Ocean CLI `doctl`: https://github.com/digitalocean/doctl#installing-doctl

> **(One volta sola) Installa su macOS con [`homebrew`](https://brew.sh):**

```
brew install doctl
```

> **(Una Volta) Login:**

Autenticazione e cambio di contesto: https://github.com/digitalocean/doctl#authenticating-with-digitalocean

```
doctl auth init
```

> **Ottieni una lista dei nomi delle VM e degli indirizzi IP:**

```
doctl compute droplet list --format "ID,Name,PublicIPv4"
```

## Spin New Resources

Stiamo lavorando per creare il nostro setup IaC, e mentre stiamo lavorando su quello puoi usare il portale di Azure o il CLI di Azure per creare nuove macchine virtuali e altre risorse.

:::tip
Non importa cosa usi per creare nuove risorse, abbiamo alcuni [utili file di configurazione cloud-init](https://github.com/freeCodeCamp/infra/tree/main/cloud-init) per aiutarti a fare provisioning di base, come installare docker o aggiungere le chiavi SSH, ecc.
:::

## Keep VMs Updated

Dovresti tenere aggiornate le VM eseguendo update e upgrade. This will ensure that the virtual machine is patched with the latest security fixes.

> [!WARNING] Prima di eseguire questi comandi:
>
> - Make sure that the VM has been provisioned completely and that there are no post-install steps running.
> - Se stai aggiornando pacchetti su una VM che sta già servendo una applicazione, assicurati che l'app sia stata fermata e salvata. L'aggiornamento dei pacchetti causerà picchi di utilizzo di banda, memoria e/o CPU portando a malfunzionamenti di applicazioni in esecuzione.

Aggiorna informazioni sul pacchetto

```bash
sudo apt update
```

Aggiorna i pacchetti installati

```bash
sudo apt upgrade -y
```

Pulisci i pacchetti inutilizzati

```bash
sudo apt autoremove -y
```

## Work on Web Servers (Proxy)

Stiamo eseguendo istanze di carico bilanciate (Azure Load Balancer) per i nostri server web. Questi server eseguono NGINX che inverte il proxy di tutto il traffico a freeCodeCamp.org da varie applicazioni in esecuzione sulle proprie infrastrutture.

La configurazione di NGINX è disponibile su [questo repository](https://github.com/freeCodeCamp/nginx-config).

### Prima Installazione

Provisioning delle VM con il codice

1. Installa NGINX e configuralo dal repository.

   ```bash
   sudo su

   cd /var/www/html
   git clone https://github.com/freeCodeCamp/error-pages

   cd /etc/
   rm -rf nginx
   git clone https://github.com/freeCodeCamp/nginx-config nginx

   cd /etc/nginx
   ```

2. Installa i certificati di origine di Cloudfire e la configurazione dell'applicazione di upstream.

   Ottieni il certificati di origine di Cloudflare dallo storage sicuro e installa nelle posizioni richieste.

   **O**

   Sposta i certificati esistenti:

   ```bash
   # Local
   scp -r username@source-server-public-ip:/etc/nginx/ssl ./
   scp -pr ./ssl username@target-server-public-ip:/tmp/

   # Remote
   rm -rf ./ssl
   mv /tmp/ssl ./
   ```

   Aggiorna le configurazioni di upstream:

   ```bash
   vi configs/upstreams.conf
   ```

   Aggiungi/aggiorna gli indirizzi IP di sorgente/origine dell'applicazione.

3. Set up networking and firewalls.

   Configura i firewall di Azure e `ufw` come necessario per indirizzi di origine d'ingresso.

4. Aggiungi la VM al pool del load balancer del backend.

   Configura e aggiungi regole al load balancer se necessario. Potresti anche aver bisogno di aggiungere le VM al pool del load balancer del backend.

### Log e monitoraggio

1. Controlla lo stato dei servizi NGINX usando i comandi seguenti:

   ```bash
   sudo systemctl status nginx
   ```

2. I log e il monitoraggio dei server sono disponibili su:

   NGINX Amplify: [https://amplify.nginx.com]('https://amplify.nginx.com'), l'attuale dashboard per il monitoraggio. Stiamo lavorando a metriche più granulari per una osservabilità migliore

### Aggiornamento Istanze (Manutenzione)

Le modifiche di configurazione alle nostre istanze NGINX sono mantenute su GitHub, queste dovrebbero essere distribuite su ogni istanza in questo modo:

1. SSH nell'istanza e inserisci sudo

```bash
sudo su
```

2. Ottieni l'ultimo codice di configurazione.

```bash
cd /etc/nginx
git fetch --all --prune
git reset --hard origin/main
```

3. Prova e ricarica la configurazione [con i segnali](https://docs.nginx.com/nginx/admin-guide/basic-functionality/runtime-control/#controlling-nginx).

```bash
nginx -t
nginx -s reload
```

## Work on API Instances

1. Installa strumenti di generazione per i binari di node (`node-gyp`) ecc.

```bash
sudo apt install build-essential
```

### Prima Installazione

Fare il provisioning delle VM con il codice

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

### Aggiornamento Istanze (Manutenzione)

```bash
pm2 logs
```

```bash
pm2 monit
```

### Aggiornamento Istanze (Manutenzione)

Ogni tanto devono essere fatti dei deployment dei cambiamenti al codice alle istanze delle API. Può essere un update continuo o un update manuale. The latter is essential when changing dependencies or adding environment variables.

:::danger
Le pipeline automatizzate al momento non gestiscono l'aggiornamento delle dipendenze. Dobbiamo fare un aggiornamento manuale prima dell'avvio di qualsiasi pipeline di deployment.
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

> [!NOTE] We are handling rolling updates to code and logic via pipelines. Non dovresti aver bisogno di eseguire questi comandi. Sono qui per documentazione.

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

### Prima installazione

Fare provisioning delle VM con il codice

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

### Logging e monitoraggio

```bash
pm2 logs
```

```bash
pm2 monit
```

### Aggiornamento istanze (Manutenzione)

Ogni tanto devono essere fatti dei deployment dei cambiamenti al codice alle istanze delle API. Può essere un update continuo o un update manuale. Il secondo è essenziane quando si cambiando dipendenze o si aggiungono variabili ambientali.

:::danger
Le pipeline automatizzate al momento non gestiscono l'aggiornamento delle dipendenze. Dobbiamo fare un aggiornamento manuale prima di ogni esecuzione della pipeline di deployment.
:::

#### 1. Aggiornamenti manuali - Usati per aggiornare dipendenze, variabili env.

1. Stop all instances

   ```bash
   pm2 stop all
   ```

2. Install or update dependencies

3. Start Instances

   ```bash
   pm2 start all --update-env && pm2 logs
   ```

#### 2. Aggiornamenti continui - usati per cambiamenti logici al codice.

```bash
pm2 reload all --update-env && pm2 logs
```

> [!NOTE] Gli update continui a codice e logica sono gestiti dalle pipeline. Non dovresti aver bisogno di eseguire questi comandi. Sono qui per documentazione.

## Work on Chat Servers

I nostri chat server sono disponibili con una configuratione HA [raccomandata nella documentazione di Rocket.Chat](https://docs.rocket.chat/installation/docker-containers/high-availability-install). Il file `docker-compose` per questo è [disponibile qui](https://github.com/freeCodeCamp/chat-config).

Avviamo istanze ridondanti di NGINX che sono loro stesse con bilanciamento di carico (Azure Load Balancer) sul cluster di Rocket.Chat. I file di configurazione NGINX sono [disponibili qui](https://github.com/freeCodeCamp/chat-nginx-config).

### First Install

Fare provisioning delle VM con il codice

**Cluster NGINX:**

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

**Cluster Docker:**

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

**Cluster NGINX:**

Le modifiche di configurazione alle nostre istanze NGINX sono mantenute su GitHub, queste dovrebbero essere distribuite su ogni istanza in questo modo:

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

**Cluster Docker:**

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

Fai ssh nella VM (hosted su Digital Ocean).

```bash
cd tools
git pull origin master
pnpm install
pnpm run build
pm2 restart contribute-app
```

## Updating Node.js Versions on VMs

Visualizza le versioni installate di node & npm

```bash
nvm -v
node -v
npm -v

nvm ls
```

Installa l'ultima versione di Node.js LTC, e reinstalla i pacchetti globali

```bash
nvm install --lts --reinstall-packages-from=default
```

Verifica i pacchetti installati

```bash
npm ls -g --depth=0
```

Alias the `default` Node.js version to the current LTS (pinned to the latest major version)

```bash
nvm alias default 16
```

(Facoltativo) Disinstalla vecchie versioni

```bash
nvm uninstall <version>
```

:::danger
Per applicazioni client, lo script della shell non può essere fatto risorgere tra versioni di Node.js con `pm2 resurrect`. Fai il deploy dei processi da zero. This should become nicer when we move to a docker-based setup.
:::

> Se stai usando PM2 per processi dovresti anche richiamare le applicazione e salvare la lista di processo per un recupero automatico al riavvio.

Ottieni le istruzioni/comandi di deinstallazione con il comando `unstartup` e usa l'output per rimuovere i servizi systemctl

```bash
pm2 unstartup
```

Ottieni le istruzioni/comandi di installazione con il comando `startup` e usa l'output per aggiungere i servizi systemctl

```bash
pm2 startup
```

Comandi veloci per PM2 per elencare, far ripartire processi salvati, ecc.

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

See: https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/v2-linux?view=azure-devops and follow the instructions to stop, remove, and reinstall agents. Approssimativamente puoi seguire gli step elencati qui.

Avrai bisogno di un PAT, che puoi ottenere da: https://dev.azure.com/freeCodeCamp-org/_usersSettings/tokens

### Installing Agents on Deployment targets

Vai su [Azure Devops](https://dev.azure.com/freeCodeCamp-org) e registra l'agente dall'inizio nei requisiti [deployment groups](https://dev.azure.com/freeCodeCamp-org/freeCodeCamp/_machinegroup).

> [!NOTE] Dovresti eseguire gli script nella home directory, e assicurati che nessun'altra directory `azagent` esista.

### Updating Agents

Attualmente aggiornare gli agent richiede che siano rimossi e riconfigurati. Questo è richiesto perché possano ottenere valori `PATH` e altre variabili d'ambiente di sistema. Dobbiame farlo per aggiornare Node.js sulle VM target di deployment.

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

Una volta completati gli step precedenti potrai ripetere gli stesi passi per installare l'agente.

## Flight Manual - Email Blast

Usiamo uno [strumento CLI](https://github.com/freecodecamp/sendgrid-email-blast) per inviare la nostra newsletter settimanale. Per avviare e iniziare il processo:

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

Utilizziamo un [tema](https://github.com/freeCodeCamp/news-theme) personalizzato per la nostra pubblicazione. L'aggiunta delle seguenti modifiche al tema consente l'aggiunta di nuove lingue.

1. Include an `else if` statement for the new [ISO language code](https://www.loc.gov/standards/iso639-2/php/code_list.php) in [`setup-locale.js`](https://github.com/freeCodeCamp/news-theme/blob/main/assets/config/setup-locale.js)
2. Create an initial config folder by duplicating the [`assets/config/en`](https://github.com/freeCodeCamp/news-theme/tree/main/assets/config/en) folder and changing its name to the new language code. (`en` —> `es` for Spanish)
3. Inside the new language folder, change the variable names in `main.js` and `footer.js` to the relevant language short code (`enMain` —> `esMain` for Spanish)
4. Duplicate the [`locales/en.json`](https://github.com/freeCodeCamp/news-theme/blob/main/locales/en.json) and rename it to the new language code.
5. In [`partials/i18n.hbs`](https://github.com/freeCodeCamp/news-theme/blob/main/partials/i18n.hbs), add scripts for the newly created config files.
6. Add the related language `day.js` script from [cdnjs](https://cdnjs.com/libraries/dayjs/1.10.4) to the [freeCodeCamp CDN](https://github.com/freeCodeCamp/cdn/tree/main/build/news-assets/dayjs/1.10.4/locale)

### Ghost Dashboard Changes

Cambia gli asset della pubblicazione andando alla dashboard di ghost > settings > general e caricando l'[icona](https://github.com/freeCodeCamp/design-style-guide/blob/master/assets/fcc-puck-500-favicon.png), il [logo](https://github.com/freeCodeCamp/design-style-guide/blob/master/downloads/fcc_primary_large.png), e la [copertina](https://github.com/freeCodeCamp/design-style-guide/blob/master/assets/fcc_ghost_publication_cover.png) della pubblicazione.
