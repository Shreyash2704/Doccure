import React from 'react'
import footer_logo from '../../assets/img/footer-logo.png'
import '../../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/fontawesome-svg-core'
export default function Footer() {
  return (
    <div>
        <footer class="footer mt-5">
            
           
            <div class="footer-top">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-3 col-md-6">
                        
                            
                            <div class="footer-widget footer-about">
                                <div class="footer-logo">
                                    <img src={footer_logo} alt="logo"/>
                                </div>
                                <div class="footer-about-content">
                                    <p>Follow us on</p>
                                    <div class="social-icon">
                                        <ul>
                                            <li>
                                                <a href="#" target="_blank">

                                                <i class="fab fa-facebook"></i>

                                                                    </a>
                                            </li>
                                            <li>
                                                <a href="#" target="_blank"><i class="fab fa-twitter"></i> </a>
                                            </li>
                                         
                                            <li>
                                                <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                        
                        <div class="col-lg-3 col-md-6">							
                            							
                        </div>
                        
                        <div class="col-lg-3 col-md-6">							
                          						
                        </div>
                        
                        <div class="col-lg-3 col-md-6">							
                           
                            <div class="footer-widget footer-contact">
                                <h2 class="footer-title">Contact Us</h2>
                                <div class="footer-contact-info">
                                    <div class="footer-address">
                                        <span><i class="fas fa-map-marker-alt"></i></span>
                                        <p> Thane <br/> Maharashtra, India </p>
                                    </div>
                                    <p>
                                        <i class="fas fa-phone-alt"></i>
                                        +91 9653682623
                                    </p>
                                    <p class="mb-0">
                                        <i class="fas fa-envelope"></i>
                                        doccure@gmail.com
                                    </p>
                                </div>
                            </div>
                            
                            
                        </div>
                        
                    </div>
                </div>
            </div>
           
            <div class="footer-bottom">
                <div class="container-fluid">
                
                   
                    <div class="copyright">
                        <div class="row">
                            
                            <div class="col-md-6 col-lg-6">
                            
                               
                                <div class="copyright-menu">
                                    <ul class="policy-menu">
                                        <li><a href="term-condition">Terms and Conditions</a></li>
                                        <li><a href="privacy-policy">Policy</a></li>
                                    </ul>
                                </div>
                               
                                
                            </div>
                        </div>
                    </div>
                    					
                </div>
            </div>
          		
        </footer>
       
    </div>
  )
}
