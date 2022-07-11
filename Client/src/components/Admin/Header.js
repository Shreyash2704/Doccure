import React from 'react'
import logo from '../../assets/img/logo.png'
import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHospital,faUser } from '@fortawesome/free-solid-svg-icons'
import '../headers/header.css'

export default function Header() {
  return (
    <div className='mb-1'>
        <Navbar collapseOnSelect expand="lg" bg="" variant="light">
            <Container fluid>
            <Navbar.Brand href="#home">
                <img src={logo} class="img-fluid" alt="Logo"/>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-5 main-nav ">
               {/* <Nav.Link href="/" className='fs-6  text-dark'>Dashboard</Nav.Link>
                <Nav.Link href="/" className='fs-6  text-dark'>Appointments</Nav.Link>

                <Nav.Link href="/" className='fs-6  text-dark'>Doctors</Nav.Link>

                <Nav.Link href="/" className='fs-6  text-dark'>Patients</Nav.Link>
  */}
                </Nav>
                <Nav className="ms-auto main-nav">
                
                {localStorage.getItem("userGroup") === "1" ? 
                    
                    <>
                   
                   <div class="header-contact-img py-2 mx-2 fs-3 ">
                       {localStorage.getItem('profile') === null ? 
                       <FontAwesomeIcon icon={faUser} />
                       :
                       <div class="profile-img ">
                            <img class="image001" src={localStorage.getItem('profile')} height="50" width="50" alt="User Image"/>
                        </div>
                        
                  
                       
                       }
                      							
                </div>
                <NavDropdown title="" className='fs-6 py-2 ' id="collasible-nav-dropdown">
                    <Nav.Link href="/doctor_dashboard" className='fs-6  text-dark'>Dashboard</Nav.Link>
                    <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
                
                    </>
                    :
                    <>
                   
                   <div class="header-contact-img py-2 mx-2 fs-3 ">
                       {localStorage.getItem('profile') === null ? 
                       <FontAwesomeIcon icon={faUser} />
                       :
                       <div class="profile-img ">
                            <img class="image001" src={localStorage.getItem('profile')} height="50" width="50" alt="User Image"/>
                        </div>
                        
                  
                       
                       }
                      							
                </div>
                <NavDropdown title="" className='fs-6 py-2' id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/admin">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/doctor">Verification</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/doctor">All Doctor</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/patient">All Patients</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/appointment">All Appointments</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/labs">All Labs</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/labappointment">All Lab Appointments</NavDropdown.Item>
                    <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
                
                    </>}

                        <Nav.Link href="#deets" className='d-flex'>
                        <div class="header-contact-img fs-3 ">
                        <FontAwesomeIcon icon={faHospital} />							
                        </div>

                        <div class="header-contact-detail ">
                            <p class="contact-header">Contact</p>
                            <p class="contact-info-header fw-bold">+91 9653682623</p>
                        </div>
                        </Nav.Link>
                   
                
                {localStorage.getItem('token') === null ?<Nav.Link className='nav-button' href="/login">
                <a class=" header-login btn btn-outline-success btn-lg" type="button" href="/login">login / Signup </a>
                </Nav.Link>
                :
                ""}
                
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}
