import React,{useEffect,useState} from 'react'
import {Carousel} from 'react-bootstrap'
import './homepage.css'
import '../../index.css'
import Footer from '../footers/Footer'
import Header from '../headers/Header'
import specialities_01 from '../../assets/img/specialities/specialities-01.png'
import specialities_02 from '../../assets/img/specialities/specialities-02.png'
import specialities_03 from '../../assets/img/specialities/specialities-03.png'
import specialities_04 from '../../assets/img/specialities/specialities-04.png'
import specialities_05 from '../../assets/img/specialities/specialities-05.png'

import '../../assets/plugins/fontawesome/css/fontawesome.min.css'
import '../../assets/plugins/fontawesome/css/all.min.css'
import doctor1 from '../../assets/img/doctors/doctor-01.jpg'
import axios from 'axios'
import feature from '../../assets/img/features/feature.png'
import feature1 from '../../assets/img/features/feature-01.jpg'
import feature2 from '../../assets/img/features/feature-02.jpg'
import feature3 from '../../assets/img/features/feature-03.jpg'
import feature4 from '../../assets/img/features/feature-04.jpg'
import feature5 from '../../assets/img/features/feature-05.jpg'
import feature6 from '../../assets/img/features/feature-06.jpg'

export default function Homepage() {

    const [all_doctors, setall_doctors] = useState([])
	const [CurrentUser, setCurrentUser] = useState({})
    const loadDoctors = async() =>{
        const uri = 'http://localhost:5000/doctor/all_doctor'
        const response = await axios.get(uri)
        console.log(response.data.data)
        setall_doctors(response.data.data)

    }
    const loaduser = async(token) =>{
		
		if(localStorage.getItem('userGroup') !== null && localStorage.getItem('userGroup') == "2"){
			const token = localStorage.getItem('token')

			const uri = "http://localhost:5000/patients/getPatient"
				const getPatient = await axios.get(uri,{headers:{
					'x-auth-token':token
				}})
		setCurrentUser(getPatient.data.user)
		console.log(getPatient.data.user.details)
		localStorage.setItem('userid',getPatient.data.user._id)
		console.log(getPatient.data.user._id)
		if( getPatient.data.user.details !== undefined){
			
			const data = getPatient.data.user.details
			console.log(getPatient.data.user)
			localStorage.setItem('fname',data.fname)
			localStorage.setItem('lname',data.lname)
			localStorage.setItem('email',data.email)
			localStorage.setItem('contact',data.contact)
			localStorage.setItem('profile',`http://localhost:5000/${data.imageUrl}`)
			localStorage.setItem('image',data.imageUrl)
			localStorage.setItem('address',data.address)
			
		}
		}
		else if(localStorage.getItem('userGroup') !== null && localStorage.getItem('userGroup') == "1"){
			const token = localStorage.getItem('token')

			const uri = "http://localhost:5000/doctor/getDoctor"
				const getDoctor = await axios.get(uri,{headers:{
					'x-auth-token':token
				}})
		setCurrentUser(getDoctor.data.user)
		console.log(getDoctor.data.user)
		
		localStorage.setItem('userid',getDoctor.data.user._id)
		if( getDoctor.data.user.details !== undefined){
			
			const data = getDoctor.data.user.details
			console.log(getDoctor.data.user)
			localStorage.setItem('fname',data.fname)
			localStorage.setItem('lname',data.lname)
			localStorage.setItem('email',data.email)
			localStorage.setItem('contact',data.contact)
			localStorage.setItem('profile',`http://localhost:5000/${data.imageUrl}`)
			localStorage.setItem('image',data.imageUrl)
			localStorage.setItem('city',getDoctor.data.user.contact_details.city)
			localStorage.setItem('state',getDoctor.data.user.contact_details.state)
			
		}
		}
		else if(localStorage.getItem('userGroup') !== null && localStorage.getItem('userGroup') == "3"){
			const token = localStorage.getItem('token')

			const uri = "http://localhost:5000/lab_appointment/getLab"
				const getlab = await axios.get(uri,{headers:{
					'x-auth-token':token
				}})
		setCurrentUser(getlab.data.user)
		console.log(getlab.data.user)
		
		localStorage.setItem('userid',getlab.data.user._id)
		}
		
		
	}
    
    useEffect(() => {
		loadDoctors()
      loaduser()
    }, [])
  return (
    <div>
        <Header />
			<section class="section section-search">
				<div class="container-fluid">
					<div class="banner-wrapper">
						<div class="banner-header text-center">
							<h1>Search Doctor, Make an Appointment</h1>
							<p>Discover the best doctors, clinic & hospital the city nearest to you.</p>
							<a href='/search_doctor' className='btn btn-success mt-4  btn-lg py-2 px-4'>Get Started</a>
						</div>
                         
						
						{/*<div class="search-box">
							<form action="templateshub.net">
								<div class="form-group search-location">
									<input type="text" class="form-control" placeholder="Search Location"/>
									<span class="form-text">Based on your Location</span>
								</div>
								<div class="form-group search-info">
									<input type="text" class="form-control" placeholder="Search Doctors, Clinics, Hospitals, Diseases Etc"/>
									<span class="form-text">Ex : Dental or Sugar Check up etc</span>
								</div>
								<button type="submit" class="btn btn-primary search-btn"><i class="fas fa-search"></i> <span>Search</span></button>
							</form>
  </div>*/}
						
						
					</div>
				</div>
			</section>
            <section class="section section-specialities">
            <div class="container-fluid">
                <div class="section-header text-center">
                    <h2>Clinic and Specialities</h2>
                    <p class="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div className='Specialities px-5 justify-content-center align-items-center'>
                    
                    <div className=' d-flex mx-lg-1 justify-content-center align-items-center'>
                    <div class="speicality-item   text-center">
                            <div class="speicality-img m-2">
                                <img src={specialities_01} class="img-fluid" alt="Speciality"/>
                                <span><i class="fa fa-circle" aria-hidden="true"></i></span>
                            </div>
                            <p>Urology</p>
                        </div>
                    </div>
                    

                    <div className='d-flex mx-lg-1 justify-content-center align-items-center'>
                    <div class="speicality-item   text-center">
                            <div class="speicality-img m-2">
                                <img src={specialities_05} class="img-fluid" alt="Speciality"/>
                                <span><i class="fa fa-circle" aria-hidden="true"></i></span>
                            </div>
                            <p>Dentist</p>
                        </div>
                    </div>

                    <div className='d-flex mx-lg-1 justify-content-center align-items-center'>
                    <div class="speicality-item   text-center">
                            <div class="speicality-img m-2">
                                <img src={specialities_02} class="img-fluid" alt="Speciality"/>
                                <span><i class="fa fa-circle" aria-hidden="true"></i></span>
                            </div>
                            <p>Neurology</p>
                        </div>
                    </div>
                    <div className='d-flex mx-lg-1 justify-content-center align-items-center'>
                    <div class="speicality-item   text-center">
                            <div class="speicality-img m-2">
                                <img src={specialities_03} class="img-fluid" alt="Speciality"/>
                                <span><i class="fa fa-circle" aria-hidden="true"></i></span>
                            </div>
                            <p>Orthopedic</p>
                        </div>
                    </div>
                    <div className='d-flex mx-lg-1 justify-content-center align-items-center'>
                    <div class="speicality-item   text-center">
                            <div class="speicality-img m-2">
                                <img src={specialities_04} class="img-fluid" alt="Speciality"/>
                                <span><i class="fa fa-circle" aria-hidden="true"></i></span>
                            </div>
                            <p>Cardiologist</p>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            </section>





			<section class="section section-doctor">
				<div class="container-fluid">
				   <div class="row">
						<div class="col-sm-12 col-lg-4">
							<div class="section-header ">
								<h2>Book Our Doctor</h2>
								<p>Lorem Ipsum is simply dummy text </p>
							</div>
							<div class="about-content">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.</p>
								<p>web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes</p>					
								<a href='/search_doctor'>Read More..</a>
							</div>
						</div>
						<div class="col-sm-12 col-lg-8 ">
							
							<div class="doctor-slider doc_cards1 d-flex  flex-nowrap slider">
							
								
								
								{all_doctors.length > 0 && all_doctors.map((doctor)=>{
									if(doctor.verified === true){
									const {details,contact_details} = doctor
                                  
								var edu = ""
								doctor.education.map((ele)=>{

									if(edu == ""){
										edu = `${ele.degree}`
									}else{
										edu = `${edu} - ${ele.degree}`
									}
											
										
								})
								
								return(
									<>
									
							
								<div className="profile-widget mx-2">
											<div className="doc-img">
												<a >
													<img className="img-fluid" alt="User Image" src={`http://localhost:5000/${details.imageUrl}`}/>
												</a>
												<a href="javascript:void(0)" class="fav-btn">
													<i className="far fa-bookmark"></i>
												</a>
											</div>
											<div className="pro-content">
												<h3 className="title">
													<a className='text-decoration-none text-dark'>Dr.{`${details.fname} ${details.lname}`}</a> 
													<i className="fas fa-check-circle verified"></i>
												</h3>
												<p className="speciality">{edu}</p>
												
												<ul className="available-info">
													<li>
														<i className="fas fa-map-marker-alt"></i> {contact_details.city}, {contact_details.state}
													</li>
													
													<li>
														<i className="far fa-money-bill-alt"></i> $100 - $500 
														<i className="fas fa-info-circle" data-toggle="tooltip" title="Lorem Ipsum"></i>
													</li>
												</ul>
												<div class="row row-sm">
													<div class="col-6">
														<a href={`/profile/${doctor._id}`} className="btn view-btn">View Profile</a>
													</div>
													<div class="col-6">
														<a href={`/booking/${doctor._id}`} className="btn book-btn">Book Now</a>
													</div>
												</div>
											</div>
										</div></>
								)
							}})}
							
								
								
							</div>
						</div>
				   </div>
				</div>
			</section>

			<section class="section section-features">
				<div class="container-fluid">
				   <div class="row">
						<div class="col-md-5 features-img">
							<img src={feature} class="img-fluid" alt="Feature"/>
						</div>
						<div class="col-md-7">
							<div class="section-header">	
								<h2 class="mt-2">Availabe Features in Our Clinic</h2>
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
							</div>	
							<div class="features-slider slider d-flex flex-nowrap  doc_cards1" >
								
								<div class="feature-item mx-2 text-center">
									<img src={feature1} class="img-fluid" width="100%" alt="Feature"/>
									<p>Patient Ward</p>
								</div>
								
								<div class="feature-item mx-2 text-center">
									<img src={feature2} class="img-fluid" alt="Feature"/>
									<p>Test Room</p>
								</div>
								
								
								
								<div class="feature-item  mx-2 text-center">
									<img src={feature3} class="img-fluid" alt="Feature"/>
									<p>ICU</p>
								</div>
								<div class="feature-item mx-2 text-center">
									<img src={feature4} class="img-fluid" alt="Feature"/>
									<p>Laboratory</p>
								</div>
								
								<div class="feature-item  mx-2 text-center">
									<img src={feature5} class="img-fluid" alt="Feature"/>
									<p>Operation</p>
								</div>
								
								
								
								<div class="feature-item text-center">
									<img src={feature6} class="img-fluid" alt="Feature"/>
									<p>Medical</p>
								</div>
								
							</div>
						</div>
				   </div>
				</div>
			</section>		

            
			
            
			
            <Footer />
			
    </div>
  )
}
