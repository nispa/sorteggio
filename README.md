
# Sorteggio UniME
Software per generare graduatorie partendo da elenchi.

*Sviluppato da Nicola Spada - CIAM - Università degli Studi di Messina*
## Descrizione
Il software è stato realizzato per la generazione di graduatorie per scrutatori nel caso di elezioni studentesche e del personale. Per la creazione di commissioni elettorali, ecc...
Vista l'esigenza di generare graduatorie casuali, durante la pandemia, si è abbandonata l'estrazione fisica, e si è deciso di implementare un'estrazione a cui è possibile assistere online. 
Un operatore accede al software, che è presente per comodità online ad un indirizzo specifico sottoforma di WebApp, condividendo il proprio schermo in una chat Video pubblica, 3 utenti del pubblico decidono 3 numeri casuali (da 1 a 10) per estrarre un numero magico da usare per mescolare l'elenco. 
Il software di sorteggio infatti si è usato in congiunzione ad un altro per l'estrazione di numeri casuali. Una volta generato il numero magico `N` con un altro metodo, si provvede a mescolare `N` volte la graduatoria. 

## Finalità
Il software sostituisce l'estrazione fisica di pizzini contenenti il nome di candidati a commissioni. Utilizzando un algoritmo di mescolamento molto famoso. 

Per mantenere il più possibile la trasparenza durante l'operazione di sortreggio, si è  deciso di creare un'app web, staccata da qualsivoglia server di dati. 
## Casi d'uso
Vista l'esigenza di generare graduatorie casuali, durante la pandemia, si è abbandonata l'estrazione fisica, e si è deciso di implementare un'estrazione digitalizzata. Vista l'assenza di un database, il software di sorteggio accetta in tempo reale un file excel o csv, mostra l'elenco e 

Il software di sorteggio è realizzato in javascript usando le librerie React. Non necessita di backend, ma solo di un webserver in cui esporre i file generati, presenti nella cartella build, usando il comando `yarn build`.

Il software prende in input un file tabulare csv (si usa la libreria [sheetJs](github.com/SheetJS/sheetjs)), e tramite il pulsante `mescola` presente nell'interfaccia, consente di riordinare le righe in modo casuale. Una volta riordinate, viene renderizzato il tutto in un file in formato PDF (si usa la libreria ([react-pdf](github.com/diegomura/react-pdf)).

L'algoritmo di mescolamento usato è Fisher–Yates Shuffle, 
l'orginale è presente a questo indirizzo: https://bost.ocks.org/mike/shuffle/

Per la stampa bisogna ricordarsi di sostituire il logo presente in `src/assets/logo.png` con un altro, di gradimento, delle medesime proporzioni (quadrato).


L'unica modifica fatta all'algoritmo originale:
```javascript
function shuffle(array) {​​​
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {​​​
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }​​​
  return array;
}​​​
```
riguarda il passaggio di parametri, che al posto di essere per indirizzo, si è preferito invece il passaggio per valore,
quindi `function shuffle(array)` diventa function `function shuffle([...array])`.

## Considerazioni 

L'aggiornamento a `webpack5` e a `React18` (in origine è stato sviluppato usando React 16) ha comportato alcuni problemi di compatibilità con **react-pdf** (che nella versione attuale ancora ha presentato problemi con webpack5), ed è stato necessario usare la libreria `craco` per personalizzare la configurazione di webpack (/craco.config.js) per consentire la generazione dei PDF senza fare l'ejecting di CRA, ossia perdere la possibilità di continuare ad usare Create React App.

## Istruzioni per la configurazione e la personalizzazione
All'interno della directory `/src` vi è uno script config.js che consente la configurazione dei parametri di default del software, in modo tale che una volta fatto il build, tali parametri non sia necessario riconfigurarli al volo. Questo è utile per la presentazione in tempo reale durante le operazioni di sorteggio pubblico. 

I parametri che è possibile configurare sono: il titolo, il logo dell'App, l'algoritmo di default da usare, ecc... 

Inoltre ci sono i parametri riguardanti la visualizzazione dell'elenco di estratti nella composizione predefinita di react-select (pdfVisibilityGields e visibilitFields), ossia nell'impostazione ad array di oggetti `[{value, label}, ....]`. Bisogna configurare questi parametri di default in base alle colonne presenti nel foglio excel da elaborare (i parametri sono configurabili anche dal pannello di opzioni dentro l'app avviata).
Il parametro `squared` e `pdfSquared` rappresenta invece il campo opzionale mostrato all'interno di parentesi quadre per specificare meglio il record mostrato.

Per la realizzazione di ulteriori algoritmi di mescolamento e raggruppamento, è necessario configurare sia l'algoritmo in `/src/components/helpers/index.js` che la funzione di selezione all'interno di `App.js`, oltre che la configurazione nel pannello di controllo `configModal`. In prossime versioni, anche gli algoritmi saranno transitati in un opportuno file di configurazione.

Il progetto è stato creato usando Create React App, di seguito il README che spiega come usare CRA.
---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
