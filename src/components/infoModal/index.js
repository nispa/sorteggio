import React from 'react'
import {Modal, ModalHeader, ModalBody, Button, ModalFooter, Row, Col} from 'reactstrap'
import logo from '../../assets/sorteggio.jpeg'
import pkjson from '../../../package.json'

export default function InfoModal ({isOpenInfo, toggleInfo}){
 return <><React.StrictMode>
    <Modal isOpen={isOpenInfo} size="xl" toggle={toggleInfo}>
      <ModalHeader toggle={toggleInfo}  close={<button className="close" onClick={toggleInfo}>×</button>}>
        Info
      </ModalHeader>
      <ModalBody>
      <Row>
        <Col xs="3">
          <img alt="logo" src={logo} width="100%" />
        </Col>
        <Col xs="9">
          <b>Sorteggio Unime v. {pkjson.version}</b>
          <br />
          Sviluppato da Nicola Spada - CIAM - Università degli Studi di Messina
        </Col>
      </Row>
      </ModalBody>
      <ModalFooter><Button color="primary" onClick={toggleInfo}>Ok</Button></ModalFooter>
    </Modal>
  </React.StrictMode></>
}

