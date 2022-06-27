import React, {useContext} from 'react'
import {Input, Modal, ModalHeader, ModalBody, Button, ModalFooter, Row, Col} from 'reactstrap'
import StoreContext from '../../store'
import Select from 'react-select'


export default function ConfigModal ({isOpenConfig, toggleConfig, data = []}){
 

  const {config, setConfig} = useContext(StoreContext) 
  const {winners, seggi, titleSorteggio, selected, algoritmo, groupField, squared, visibilityFields, pdfVisibilityFields, pdfSquared} = config

  const setContext = (contextField, value) => {
    setConfig( config => ({...config,  [contextField] : value }))
  }

  const visibilityOptions = []

  for (const item of data) {
    visibilityOptions.push( { value: item, label: item})
  }


  return <><React.StrictMode>
    <Modal isOpen={isOpenConfig} size="xl" toggle={toggleConfig}>
      <ModalHeader toggle={toggleConfig}  close={<button className="close" onClick={toggleConfig}>×</button>}>
        Configurazione
      </ModalHeader>
      <ModalBody>
      <Row>
        <Col md="12">
          <label style={{width: "100%"}}>
            Titolo Sorteggio
            <Input  
            type='text' 
            style={{width: "100%"}}
            onChange={(e)=>{setContext('titleSorteggio', e.target.value)}}
            defaultValue={titleSorteggio}
          />
          </label>
        </Col>
      </Row>
       <Row>
         <Col md="6">
         <label>
          # Seggi
          <Input  
          type='number' 
          onChange={(e)=>{setContext('seggi',e.target.value)}}
          defaultValue={seggi}
         />
        </label>
         </Col>
        <Col md="6">
          <label>
           # Vincitori per seggio
            <Input  
            type='number' 
            onChange={(e)=>{setContext('winners', e.target.value)}}
            defaultValue={winners}
          />
          </label>
        </Col>
        </Row>
        <Row>
        <Col md="12">
          <label>
            # record da evidenziare (opzionale)
            <Input  
            type='number' 
            onChange={(e)=>{setContext('selected', e.target.value)}}
            defaultValue={selected}
          /></label><hr />
        </Col>
        </Row>
        <Row>
        <Col md="6">
        <label>
          {
            // Al momento resta statico e legacy. ToDo: V1.0.0 diventerà un parametro dinamico
          }
           Algoritmo 
          <Input className="form-control" type="select" value={algoritmo}  style={{width: "100%"}} onChange={(e)=>{
            setContext('algoritmo', e.target.value)
            }}>
              <option value="">
                Seleziona un campo 
              </option>
              <option value={1} >
                Il primo ha scelta, poi d'ufficio
              </option>
              <option value={2}>
                Il primo vince 
              </option>
              </Input>
         </label>
        </Col>
         {parseInt(algoritmo) === 1 && <Col md="6">

          {!!data.length &&<label>
            Campo usato per raggruppare 
            <Input className="form-control" type="select" value={groupField} onChange={(e)=>{
              setContext('groupField', e.target.value)
              }} >
                <option value="">
                  Seleziona un campo (opzionale)
                </option>
                {data.map( item => {
                  return <option key={item} value={item}>
                    {item}
                  </option>
                })}
                </Input>
          </label>}
        </Col>}
         </Row>
         <Row>
           <Col md="12"><hr />
             <h4>Anteprima</h4>
           </Col>
        <Col md="6">
          {!!data.length &&<label>
            Primo Campo (come composizione di elementi) da visualizzare
            <Select className="form-control"  isMulti defaultValue={visibilityFields} onChange={(val)=>{
              setContext('visibilityFields', val)
              }} options={visibilityOptions} />

          </label>}
        </Col>
        <Col md="6">
        {!!data.length &&<label>
            Campo da visualizzare in parentesi quadra
            <Input className="form-control" type="select" value={squared} onChange={(e)=>{
              setContext('squared', e.target.value)
              }} >
                <option value="">
                  Seleziona un campo
                </option>
                {data.map( item => {
                  return <option key={item} value={item}>
                    {item}
                  </option>
                })}
                </Input>
          </label>}
        </Col>
         </Row>
         <Row>
           <Col md="12" style={{paddingTop: 22}}><h4>Visualizzazione PDF</h4></Col>
        <Col md="6">
        {!!data.length &&<label>
            Primo Campo (come composizione di elementi) da visualizzare
            <Select className="form-control"  isMulti defaultValue={pdfVisibilityFields} onChange={(val)=>{
              setContext('pdfVisibilityFields', val)
              }} options={visibilityOptions} />
          </label>}
        </Col>
        <Col md="6">
        {!!data.length &&<label>
            Campo da visualizzare in parentesi quadra
            <Input className="form-control" type="select" value={pdfSquared} onChange={(e)=>{
              setContext('pdfSquared', e.target.value)
              }} >
                <option value="">
                  Seleziona un campo
                </option>
                {data.map( item => {
                  return <option key={item} value={item}>
                    {item}
                  </option>
                })}
                </Input>
          </label>}
        </Col>
         </Row>
      </ModalBody>
      <ModalFooter><Button color="primary" onClick={toggleConfig}>Ok</Button></ModalFooter>
    </Modal>
  </React.StrictMode></>
}

