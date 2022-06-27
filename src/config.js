
  // Default config for store context (store.js)
// Fonts import
import OpenSans from "./assets/OpenSans-Regular.ttf"
import OpenSansBold from "./assets/OpenSans-Bold.ttf"
import Logo from "./assets/logo.png"


 const defaultPdfFonts = {
    OpenSans: OpenSans,
    OpenSansBold: OpenSansBold
 }

  const appConfig = {
    appName: "Sorteggio Unime",
    institutionName: "Università degli Studi di Messina",
    institutionLogo: Logo,
    algoritmo: 2,
    seggi: 8,   
    winners: 3,
    selected: 0,
    groupField: "",
    visibilityFields: [ {value: "lastname", label:"lastname" }, {value: "firstname", label:"firstname"}],
    squared: "Matricola",
    pdfVisibilityFields: [ {value: "lastname", label:"lastname" }, {value: "firstname", label:"firstname"}],
    pdfSquared: "Matricola",
    titleSorteggio: " Non Definito (prenderà il nome dal file) "
  }

export {defaultPdfFonts}
export default appConfig;