import React, {useState, useContext} from 'react'
import {Navbar, NavbarBrand,
   NavbarToggler, DropdownMenu, UncontrolledDropdown, 
   DropdownItem, DropdownToggle, Collapse, Nav, NavItem, NavLink} from 'reactstrap'
import StoreContext from '../../store'

export default function Header ({showList, toggleList, importList, openConfig, eraseData, openInfo}) {
    const [isOpen, setIsOpen] = useState(false)
    const {config} = useContext(StoreContext)
    const toggle = ()=> setIsOpen(!isOpen)
  
  
  return <><Navbar color="dark" dark expand="sm">
    <NavbarBrand href="/" style={{paddingLeft: 30, textDecoration: "none"}}>{config.appName}</NavbarBrand>
    <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Elenco
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem onClick={()=>{toggleList()}}>
                <i className={`fa fa-eye${showList ? '-slash' : ""}`} ></i> {showList ? " Nascondi " :  "Mostra" } Elenco
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={()=>{importList();}}>
                <i className="fa fa-upload"></i> Importa Elenco
              </DropdownItem>
              <DropdownItem onClick={()=>{openConfig()}}>
                <i className="fa fa-cog"></i> Configurazione
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={()=>{eraseData()}}>
                <span className="text-danger">
                  <i className="fa fa-trash"></i> <b>Cancella dati </b>
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Nav>
          <NavItem className="ms-auto">
            <NavLink href='#' onClick={()=>{openInfo()}} className='text-white'>?</NavLink>
          </NavItem>
        </Nav>
    </Collapse>
  </Navbar>
  </>
}