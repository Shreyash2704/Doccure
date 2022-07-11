import React from 'react'
import logo from '../../assets/img/logo.png'
import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHospital,faUser } from '@fortawesome/free-solid-svg-icons'
import './header.css'

export default function Header() {
  return (
    <div className='mb-1'>
        <Navbar collapseOnSelect expand="lg" bg="" variant="light">
            <Container fluid>
            <Navbar.Brand href="/">
                <img src={logo} class="img-fluid" alt="Logo"/>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-5 main-nav ">
                <Nav.Link href="/" className='fs-6  text-dark'>Home</Nav.Link>

                {localStorage.getItem("userGroup") === null ? 
                <>
                
                <NavDropdown title="Patients" className='fs-6  text-dark' id="collasible-nav-dropdown">
                    <NavDropdown.Item className=' text-dark' href="/signup">Patient Register</NavDropdown.Item>
                    <NavDropdown.Item  className=' text-dark'href="/login">Patient Login</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Doctors" className='fs-6  text-dark' id="collasible-nav-dropdown">
                    <NavDropdown.Item  className=' text-dark' href="/signup/doctor">Doctor Register</NavDropdown.Item>
                    <NavDropdown.Item  className=' text-dark' href="/login">Doctor Login</NavDropdown.Item>
                </NavDropdown>
                
                <NavDropdown title="Lab Test" className='fs-6  text-dark' id="collasible-nav-dropdown">
                    <NavDropdown.Item  className=' text-dark' href="/signup/lab">Register</NavDropdown.Item>
                    <NavDropdown.Item  className=' text-dark' href="/login">Login </NavDropdown.Item>
                </NavDropdown></>
                :
                localStorage.getItem("userGroup") === "1" ? 
                    ""
                    :
                    <>
                    
                    <Nav.Link href="/search_doctor" className='fs-6  text-dark'>Search Doctor</Nav.Link>
                    </>
                    
                }
                {localStorage.getItem("userGroup") === "2" && <Nav.Link href="/Lab" className='fs-6  text-dark'>Lab</Nav.Link>}
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
                   
                   {localStorage.getItem("userGroup") === "2" ? 
                        (<>
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
                                    <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                                </NavDropdown>
                        </>)
                        :
                        <>
                        {localStorage.getItem("userGroup") === "3" ? 
                        (<>
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
                                            <NavDropdown.Item href="/labDashboard">Dashboard</NavDropdown.Item>
                                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                                        </NavDropdown>
                        </>):""
                        }
                        </>
                        /*(<>
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
                                            <NavDropdown.Item href="/labDashboard">Dashboard</NavDropdown.Item>
                                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                                        </NavDropdown>
                        </>)*/
                
                }</>}



                <Nav.Link href="#deets" className='d-flex'>
                <div class="header-contact-img fs-3 ">
                <FontAwesomeIcon icon={faHospital} />							
                </div>

                <div class="header-contact-detail ">
                    <p class="contact-header">Contact</p>
                    <p class="contact-info-header fw-bold">+91 9653682623</p>
                </div>
                </Nav.Link>
                   
                
                {localStorage.getItem('token') === null ?
                <Nav.Link className='nav-button' href="/login">
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
