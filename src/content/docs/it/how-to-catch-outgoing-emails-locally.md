---
title: Catching emails locally
---

> **Nota:** Questo è un **passaggio opzionale** ed è richiesto solo quando si lavora con flussi di lavoro sulle email

- [Introduzione](#introduction)
- [Installare MailHog](#installing-mailhog)
- [Usare Mailhog](#using-mailhog)
- [Link Utili](#useful-links)

## Introduzione

Some email workflows, like updating a user's email, require the back-end API server to send outgoing emails. MailHog è una alternativa ad usare un provider di un servizio email per mandare messagi email. È uno strumento per lo sviluppo per testare le email che catturerà i messaggi email mandati dalla tua istanza di freeCodeCamp.

## Installare MailHog

MailHog can be installed on macOS, Windows, and Linux or used via Docker.

<details><summary>Installare MailHog con Docker</summary>

Se hai Docker installato puoi usare

```bash
docker run -d --name mailhog --network host --rm mailhog/mailhog
```

per avviare MailHog in background e

```bash
docker stop mailhog
```

per arrestarlo.

Quando l'installazione è completa, puoi iniziare a [usare MailHog](#using-mailhog).

</details>

<details><summary>Installare MailHog su macOS</summary>

Installa MailHog su macOS con [Homebrew](https://brew.sh/):

```bash
brew install mailhog
brew services start mailhog
```

The above commands will start a MailHog service in the background.

Quando l'installazione è completa, puoi iniziare a [usare MailHog](#using-mailhog).

</details>

<details><summary>Installare MailHog su Windows</summary>

Scarica l'ultima versione di MailHog dalla [repository ufficiale di MailHog](https://github.com/mailhog/MailHog/releases). Trova e clicca sul link per la tua versione di Windows (32 o 64 bit) e un file `.exe` sarà scaricato sul tuo computer.

Quando il download è stato completato, clicca per aprire il file. Potrebbe comparire una notifica del firewall di Windows, chiedendo i permessi di accesso per MailHog. Dopo aver consentito l'accesso nel firewall, si aprirà un prompt standard della riga di comando di Windows con MailHog in esecuzione.

Chiudi MailHog chiudendo la finestra del prompt dei comandi. Per riaprire MailHog, clicca sul file eseguibile (`.exe`) di MailHog che è stato scaricato all'inizio; non è necessario scaricare un nuovo file di installazione.

Inizia a [usare MailHog](#using-mailhog).

</details>

<details><summary>Installare MailHog su Linux</summary>

Come prima cosa, installa [Go](https://golang.org).

Usa i seguenti comandi per installare GO su sistemi basati su Debian come Ubuntu e Linux Mint.

```bash
sudo apt-get install golang
```

Usa i seguenti comandi per installare GO su sistemi basati su RPM come CentOS, Fedora, Red Hat Linux, ecc.

```bash
sudo dnf install golang
```

In alternativa, esegui i seguenti comandi per installare GO.

```bash
sudo yum install golang
```

Ora imposta il path per Go con i seguenti comandi.

```bash
echo "export GOPATH=$HOME/go" >> ~/.profile
echo 'export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin' >> ~/.profile
source ~/.profile
```

In fine, esegui i comandi seguenti per installare ed eseguire MailHog.

```bash
go get github.com/mailhog/MailHog
sudo cp /home/$(whoami)/go/bin/MailHog /usr/local/bin/mailhog
mailhog
```

Inizia a [usare MailHog](#using-mailhog).

</details>

## Usare Mailhog

Open a new browser tab or window and navigate to [http://localhost:8025](http://localhost:8025) to open your MailHog inbox when the MailHog installation has been completed and MailHog is running.

## Link Utili

- Controlla il repository [MailHog](https://github.com/mailhog/MailHog) per ulteriori informazioni relative a MailHog. Ulteriori informazioni sono disponibili anche per quanto riguarda le configurazioni personalizzate di MailHog.
