---
title: Troubleshooting Development Issues
---

If you are facing an issue, there is a high chance that the resolution is in this documentation.

## Issues with Installing the Recommended Prerequisites

Sviluppiamo regolarmente sui sistemi operativi più nuovi o più popolari come macOS 10.15 o successivi, Ubuntu 18.04 e Windows 10 (con WSL2).

Ti raccomandiamo di fare ricerche sui tuoi problemi specifici usando risorse come Google, Stack Overflow e Stack Exchange. C'è una buona probabilità che qualcuno abbia incontrato lo stesso problema e ci sia già una risposta alla tua domanda specifica.

Se sei su un sistema operativo diverso o continui ad avere dei problemi, visita [ottenere aiuto](#ottenere-aiuto).

:::caution
Per favore, evita di creare issue su GitHub per problemi con i prerequisiti. Sono al di fuori dell'ambito di questo progetto.
:::

## Issues with Missing UI, Fonts, Language Strings, or Build Errors

When you build the client, Gatsby will cache the fonts, language strings, and UI. Se uno di loro non è memorizzato nella cache, esegui quanto segue:

```bash
pnpm run clean
pnpm install
pnpm run seed
pnpm run develop
```

O

Usa la scorciatoia

```
pnpm run clean-and-develop
```

If you continue to face issues with the build, cleaning up the workspace is recommended.

Usa `git clean` in modalità interattiva:

```
git clean -ifdX
```

<details>
   <summary>
      Come pulire i file git non tracciati (screenshot)
   </summary>

   <br>
   <img src="https://user-images.githubusercontent.com/1884376/94270515-ca579400-ff5d-11ea-8ff1-152cade31654.gif" alt="Come pulire i file git non tracciati" />
</details>

## Issues with API, login, Challenge Submissions, etc.

If you can't sign in, and instead you see a banner with an error message saying that the error will be reported to freeCodeCamp, please double-check that your local port `3000` is not in use by a different program.

#### **From Terminal:**

```bash
netstat -a | grep "3000"

tcp4    0   0    0.0.0.0:3000           DESKTOP      LISTEN
```

## Issues Signing Out while Navigating

Durante lo sviluppo, la sessione viene memorizzata come cookie. Cancellarli ti farà uscire dal tuo account di sviluppo.

Ti disconnetterai anche eseguendo `pnpm run seed:certified-user`. Sovrascriverà l'utente di sviluppo nel database locale.

## Issue Getting 404 when Navigating Profile Page

Quando provi a navigare su http://localhost:8000/developmentuser per visualizzare la pagina del profilo, Gatsby prende in consegna le pagine lato client, quindi otterrai una pagina 404 per il profilo utente quando lavori.

C'è un pulsante "Preview Custom 404 Page", cliccalo per vedere il profilo.

## Issues Installing Dependencies

Se incontri degli errori durante l'installazione delle dipendenze, assicurati di non essere in una rete ristretta o che le impostazioni del tuo firewall non ti impediscano di accedere alle risorse.

La prima configurazione può richiedere un po' di tempo a seconda della larghezza di banda della rete. Be patient, and if you are still stuck we recommend using Gitpod instead of an offline setup.

> [!NOTE] Se stai usando un dispositivo Apple con Chip M1 per eseguire l'applicazione in locale, suggeriamo di usare Node v14.7 o superiore. Altrimenti potresti avere problemi con dipendenze come Sharp.

## Working With Other Languages

To see how the client renders in another language go to [testing the client app in a world language.](how-to-work-on-localized-client-webapp#Testing-the-Client-App-in-a-World-Language)

## Getting Help

Se sei bloccato e hai bisogno di aiuto, poni liberamente le tue domande nella [categoria 'Contributors' sul nostro forum](https://forum.freecodecamp.org/c/contributors) o [nella chat room per i contributori](https://discord.gg/PRyKn3Vbay).

Potrebbe esserci un errore nella console del browser o in Bash / Terminale / Linea di comando che ti aiuterà a identificare il problema. Fornisci questo messaggio di errore nella descrizione del problema in modo che gli altri possano identificarlo più facilmente e aiutarti a risolverlo.
