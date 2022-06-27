import React, {useState, } from 'react'
import './App.css'
import StoreContext from './store.js'
import appConfig from './config.js'
import * as XLSX from 'xlsx'
import {Container, Row, Col, Button } from 'reactstrap'
import shuffle, {ElementsList, ConfigModal, UploadModal, PdfCreate, Header, primaLaSceltaDellaSede, ilPrimoVince, InfoModal} from './components'

function App() {
  const [dataShuffled, setDataShuffled] = useState([])
  const [configModal, setConfigModal] = useState(false)
  const toggleConfigModal = () => setConfigModal(!configModal)
  const [showList, setShowList] = useState(false)
  const [showPDF, setshowPDF] = useState(false)
  const [config, setConfig] = useState(appConfig)
  const [counter, setCounter] = useState(0)
  const [infoModal, setInfoModal] = useState(false)
  const [isOpenXls, setIsOpenXls] = useState(false)
  const [csvData, setCsvData] = useState([])
  const [ready, setReadyState] = useState(true)
  const toggleXls = () => setIsOpenXls(!isOpenXls)
  const toggleInfoModal = () => setInfoModal(!infoModal)
  // configurazione
  const {algoritmo, winners, seggi, titleSorteggio, selected, groupField} = config

  const toggleList = () => { 
    if(csvData.length) 
      setShowList(!showList)
    else 
      toggleXls()
  }

  // Mescolamento in base all'algoritmo scelto.
  const shuffleData = (data) => {
    const shuffled = shuffle(data)
   // console.log(algoritmo, typeof algoritmo)

   // In base alla scelta dell'algoritmo...
    switch (parseInt(algoritmo)){
      case 1: 
          console.log('scelta sede')
          setDataShuffled(primaLaSceltaDellaSede(shuffled, winners, groupField))
        break;
      case 2: 
          console.log('the first')
          setDataShuffled(ilPrimoVince(shuffled, winners, seggi))
        break;
      default:
        console.log('Nessuno Scelto... ')
        setDataShuffled(shuffled)
    }

  }

  // Con l'upload del file converto in array 
  const convertFileData = (inputFile) => {
    const [file] = inputFile
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    // save Name in config
    setConfig ( prevState => ({
      ...prevState, 
      "titleSorteggio": file.name.split(".")[0]
     }))

    if (rABS) {
      reader.readAsBinaryString(file)
    } else {
      reader.readAsArrayBuffer(file)
    };

    reader.onload = (e) => {
      // Parse data 
      const bstr = e.target.result
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true })
      // Get first worksheet 
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      // Convert array of arrays 
      const csv = XLSX.utils.sheet_to_json(ws)

      // Save data ub array on App state 
      setCsvData(csv)
      setIsOpenXls(false)
      setConfigModal(true)
    }
  }

  // Per visualizzare temporaneamente uno spinner ed evitare che la gente accumuli click non voluti
  const waitPlease = () => {
    setReadyState(false)
    shuffleData(csvData) 
    setCounter(counter+1) 

    setTimeout(() => {
      setReadyState(true)
    }, 750);
  }

  const disableButton = !csvData.length || !ready

  return <StoreContext.Provider value={{config, setConfig}}>
    <Container>
      <Header 
        showList={showList} 
        toggleList={()=>toggleList()} 
        importList={()=>toggleXls()} 
        openConfig={()=>{setshowPDF(false); toggleConfigModal(); }} 
        eraseData={()=>{window.location.reload()}}
        openInfo={()=>{setshowPDF(false); toggleInfoModal(); }} 
        />
      <Row className="d-flex flex-column">
        <Col className="p-2">
          {titleSorteggio && <p style={{textAlign:"center"}}>Sorteggio: {titleSorteggio}</p>}

          <Button color="link" onClick={()=> toggleList()}> 
            Elenco con {csvData.length} record {csvData.length ? <i className={`fa fa-caret-${showList ? "up" : "down"}`}></i>: ""} 
          </Button>
          {showList ? <div className={'list'}><ElementsList data={csvData} label=" " /></div> : null }
        </Col>
        <Col className="p-2">
          {!!(selected) ? <>Record da evidenziare <b>{selected}</b><br/></> : null }
          {groupField ?<>raggruppati per: <b>{groupField.toString()}</b></> : null } 
        </Col>
      </Row>
      <Row className="d-flex justify-content-around d-flex flex-row align-items-baseline  ">
          <Col className="text-center">
            <Button color="primary" size="lg" className="customButton" disabled={disableButton || showPDF} onClick={()=>{waitPlease()} }> 
              <i className="fa fa-sync" /> &nbsp; Mescola 
            </Button>
            {counter ? <p className="text-muted display-4">cliccato&nbsp;{counter}&nbsp;volte</p> : null}
          </Col>
          <Col className="text-center">
              {(dataShuffled.data && dataShuffled.data.length) 
                ?<Button color="primary" onClick={()=>setshowPDF(!showPDF)} size="lg" disabled={disableButton}>
                  {showPDF ? "Nascondi PDF" : "Mostra PDF"}
                 </Button> 
                : null}
          </Col>
      </Row>
      {(dataShuffled.data && dataShuffled.data.length) ? 
        <Row>
          <Col>
            <div className="list2">
              <ElementsList className="list" data={dataShuffled.data} grouped={true} shuffled={true} label="Combinazione generata" />
            </div>
          </Col>
          <Col style={{paddingTop: 68 }}>
            {(showPDF && dataShuffled.data && dataShuffled.data.length) ? <PdfCreate titleSorteggio={titleSorteggio} data={dataShuffled} /> : null}
          </Col>
        </Row>
        : null}
      </Container>
        {configModal && <ConfigModal isOpenConfig={configModal} toggleConfig={toggleConfigModal} data={csvData.length ? Object.keys(csvData[0]): []}/>}
        {infoModal && <InfoModal isOpenInfo={infoModal} toggleInfo={toggleInfoModal}/>}
        {isOpenXls &&  <UploadModal isOpenXls={isOpenXls} toggleXls={toggleXls} convertData={convertFileData} />}
    </StoreContext.Provider>
}

export default App
