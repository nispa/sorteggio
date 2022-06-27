import React from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Input, FormText} from 'reactstrap'
import StoreContext from '../../store'

const UploadModal = ({isOpenXls, toggleXls, convertData}) => {

    const {config} = React.useContext(StoreContext)

    return <Modal isOpen={isOpenXls} toggle={toggleXls}>
    <ModalHeader toggle={toggleXls}  close={<button className="close" onClick={toggleXls}>×</button>}>
      Importazione file CSV/Excel
    </ModalHeader>
    <ModalBody>
      <Input color="primary" 
        type='file' 
        accept=".csv,.xls,.xlsx" 
        onChange={(e)=>{
                const files = Array.from(e.target.files)
                convertData(files)
              }}
      />
      <FormText>Aggiungi un file CSV/excel con la lista delle persone</FormText>
      <br />
      <p>
        <i>Attenzione. I campi al momento usati sono:</i> <b>{config.visibilityFields.map( item => item.label.toString() + ", " )} {config.squared ? " e " + config.squared : ""}.</b><br />
        Si possono cambiare dal pannello di <i>configurazione</i> accessibile tramite il menu <i>Elenco</i>, dopo aver importato il file.
      </p>
    </ModalBody>
    <ModalFooter>&nbsp;</ModalFooter>
  </Modal>
}

export default UploadModal