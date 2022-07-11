import React,{useState,useEffect} from 'react'
import Header from '../../headers/Header'
import Footer from '../../footers/Footer'
import '../../../index.css'
import DoctorWidget from './DoctorWidget'
import { useParams } from 'react-router-dom'
import axios from 'axios'
export default function DoctorProfile() {
    const params = useParams()
    const id = params.id
    const [doctor, setdoctor] = useState({})
    const [details, setdetails] = useState({})
    const [experience, setexperience] = useState([])
    const [education, seteducation] = useState([])
    const [services, setservices] = useState([])
    const [specialize, setspecialize] = useState([])
    const [contact, setcontact] = useState({})
    const loadDoctor = async() =>{
        const uri = `http://localhost:5000/doctor/getDoctor/${id}`
        const token = localStorage.getItem('token')
        const getDoc = await axios.get(uri)
         
        console.log(getDoc.data.data)
        setdoctor(getDoc.data.data)
        setdetails(getDoc.data.data.details)
        setservices(getDoc.data.data.service)
        seteducation(getDoc.data.data.education)
        setexperience(getDoc.data.data.experince)
        setcontact(getDoc.data.data.contact_details)
        setspecialize(getDoc.data.data.specialization)
    }
    useEffect(() => {
      loadDoctor()
    }, [])
    var a = ""
    if(specialize !== []){
        specialize.map(ele=>{
            if(a == ""){
                a = `${ele}`
            }else{
                a = `${a}, ${ele}`
            }
        })
    }
    var edu = ""
    if(education!==[]){
        education.map((e)=>{
            if(edu == ""){
                edu = `${e.degree}`
            }else{
                edu = `${edu} - ${e.degree}`
            }
            
        })
    }
    
    
    //
  return (
    <div>
        <Header />
        <div class="breadcrumb-bar">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-12 col-12">							
							<h2 class="breadcrumb-title">Doctor Profile</h2>
						</div>
					</div>
				</div>
			</div>
            
            
            <div class="content">
				<div class="container">
                {
                doctor !== {} ? <DoctorWidget id={doctor._id} fees={details.fees} name= {details.fname}  image={details.imageUrl} services={services} education={edu} specialist={a} city={contact.city} state={contact.state}/>
              :""
               } 
               <div class="card">
						<div class="card-body pt-0">
						
						
							<nav class="user-tabs mb-4">
								<ul class="nav nav-tabs nav-tabs-bottom nav-justified">
									<li class="nav-item">
										<a class="nav-link active" href="#doc_overview" data-toggle="tab">Overview</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="#doc_locations" data-toggle="tab">Locations</a>
									</li>																	
								</ul>
							</nav>
							
							<div class="tab-content pt-0">
							
								
								<div role="tabpanel" id="doc_overview" class="tab-pane fade show active">
									<div class="row">
										<div class="col-md-12 col-lg-9">
										
										
											<div class="widget about-widget">
												<h4 class="widget-title">About Me</h4>
												<p>{details.about_me}</p>
											</div>
										
											<div class="widget education-widget">
												<h4 class="widget-title">Education</h4>
												<div class="experience-box">
													<ul class="experience-list">
                                                        {
                                                        education.map((ele)=>{
                                                            const {degree,college,year} = ele
                                                            return(
                                                                <li>
															<div class="experience-user">
																<div class="before-circle"></div>
															</div>
															<div class="experience-content">
																<div class="timeline-content">
																	<a href="#/" class="name text-decoration-none text-dark ">{college}</a>
																	<div>{degree}</div>
																	<span class="time">{year}</span>
																</div>
															</div>
														</li>
                                                            )
                                                        })
                                                        }
														
													</ul>
												</div>
											</div>
										
											<div class="widget experience-widget">
												<h4 class="widget-title">Work & Experience</h4>
												<div class="experience-box">
													<ul class="experience-list">
                                                    {experience !== [] ?
                                                            experience.map((exp)=>{
                                                                const {hospital_name,from,to} = exp
                                                                return(
                                                                    <li>
															<div class="experience-user">
																<div class="before-circle"></div>
															</div>
															<div class="experience-content">
																<div class="timeline-content">
																	<a href="#/" class="name text-decoration-none text-dark">{hospital_name}</a>
																	<span class="time">{from}- {to}</span>
																</div>
															</div>
														</li>
                                                                )
                                                            }):""
                                                        }
														
													</ul>
												</div>
											</div>
											
											<div class="service-list">
												<h4>Services</h4>
												<ul class="clearfix">
                                                    {
                                                        services.map(ele=>{
                                                            return(<li>{ele} </li>)
                                                        })
                                                    }
											
												</ul>
											</div>
											
											<div class="service-list">
												<h4>Specializations</h4>
												<ul class="clearfix">
                                                    {
                                                        specialize.map(ele=>{
                                                            return(<li>{ele}</li>)
                                                        })
                                                    }
													
													
												</ul>
											</div>
										

										</div>
									</div>
								</div>
								
								<div role="tabpanel" id="doc_locations" class="tab-pane fade">
								
								
									<div class="location-list">
										<div class="row">
								
											<div class="col-md-6">
												<div class="clinic-content">
													<h4 class="clinic-name"><a href="#">Smile Cute Dental Care Center</a></h4>
													<p class="doc-speciality">MDS - Periodontology and Oral Implantology, BDS</p>
													<div class="rating">
														<i class="fas fa-star filled"></i>
														<i class="fas fa-star filled"></i>
														<i class="fas fa-star filled"></i>
														<i class="fas fa-star filled"></i>
														<i class="fas fa-star"></i>
														<span class="d-inline-block average-rating">(4)</span>
													</div>
													<div class="clinic-details mb-0">
														<h5 class="clinic-direction"> <i class="fas fa-map-marker-alt"></i> 2286  Sundown Lane, Austin, Texas 78749, USA <br/><a href="javascript:void(0);">Get Directions</a></h5>
														<ul>
															<li>
																<a href="assets/img/features/feature-01.jpg" data-fancybox="gallery2">
																	<img src="assets/img/features/feature-01.jpg" alt="Feature Image"/>
																</a>
															</li>
															<li>
																<a href="assets/img/features/feature-02.jpg" data-fancybox="gallery2">
																	<img src="assets/img/features/feature-02.jpg" alt="Feature Image"/>
																</a>
															</li>
															<li>
																<a href="assets/img/features/feature-03.jpg" data-fancybox="gallery2">
																	<img src="assets/img/features/feature-03.jpg" alt="Feature Image"/>
																</a>
															</li>
															<li>
																<a href="assets/img/features/feature-04.jpg" data-fancybox="gallery2">
																	<img src="assets/img/features/feature-04.jpg" alt="Feature Image"/>
																</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
											
											<div class="col-md-4">
												<div class="clinic-timing">
													<div>
														<p class="timings-days">
															<span> Mon - Sat </span>
														</p>
														<p class="timings-times">
															<span>10:00 AM - 2:00 PM</span>
															<span>4:00 PM - 9:00 PM</span>
														</p>
													</div>
													<div>
													<p class="timings-days">
														<span>Sun</span>
													</p>
													<p class="timings-times">
														<span>10:00 AM - 2:00 PM</span>
													</p>
													</div>
												</div>
											</div>
											
											
											<div class="col-md-2">
												<div class="consult-price">
													$250
												</div>
											</div>
										</div>
									</div>
									
									<div class="location-list">
										<div class="row">
										
											
											<div class="col-md-6">
												<div class="clinic-content">
													<h4 class="clinic-name"><a href="#">The Family Dentistry Clinic</a></h4>
													<p class="doc-speciality">MDS - Periodontology and Oral Implantology, BDS</p>
													<div class="rating">
														<i class="fas fa-star filled"></i>
														<i class="fas fa-star filled"></i>
														<i class="fas fa-star filled"></i>
														<i class="fas fa-star filled"></i>
														<i class="fas fa-star"></i>
														<span class="d-inline-block average-rating">(4)</span>
													</div>
													<div class="clinic-details mb-0">
														<p class="clinic-direction"> <i class="fas fa-map-marker-alt"></i> 2883  University Street, Seattle, Texas Washington, 98155 <br/><a href="javascript:void(0);">Get Directions</a></p>
														<ul>
															<li>
																<a href="assets/img/features/feature-01.jpg" data-fancybox="gallery2">
																	<img src="assets/img/features/feature-01.jpg" alt="Feature Image"/>
																</a>
															</li>
															<li>
																<a href="assets/img/features/feature-02.jpg" data-fancybox="gallery2">
																	<img src="assets/img/features/feature-02.jpg" alt="Feature Image"/>
																</a>
															</li>
															<li>
																<a href="assets/img/features/feature-03.jpg" data-fancybox="gallery2">
																	<img src="assets/img/features/feature-03.jpg" alt="Feature Image"/>
																</a>
															</li>
															<li>
																<a href="assets/img/features/feature-04.jpg" data-fancybox="gallery2">
																	<img src="assets/img/features/feature-04.jpg" alt="Feature Image"/>
																</a>
															</li>
														</ul>
													</div>

												</div>
											</div>
											
											<div class="col-md-4">
												<div class="clinic-timing">
													<div>
														<p class="timings-days">
															<span> Tue - Fri </span>
														</p>
														<p class="timings-times">
															<span>11:00 AM - 1:00 PM</span>
															<span>6:00 PM - 11:00 PM</span>
														</p>
													</div>
													<div>
														<p class="timings-days">
															<span>Sat - Sun</span>
														</p>
														<p class="timings-times">
															<span>8:00 AM - 10:00 AM</span>
															<span>3:00 PM - 7:00 PM</span>
														</p>
													</div>
												</div>
											</div>
											
											
											<div class="col-md-2">
												<div class="consult-price">
													$350
												</div>
											</div>
										</div>
									</div>
									
								</div>
													
							</div>
						</div>
					</div>
					
                </div>
            </div>
                                                    
        <Footer />
    </div>
  )
}
