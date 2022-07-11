import React,{useState,useEffect} from 'react'


import '../../../index.css'

import Header from '../../headers/Header'

import axios from 'axios'
import ProfileSetting from './ProfileSetting'

export default function LabDashboard() {
	const state = {
		name:"",
		address: "",
		city: "",
		contact: "",
		country: "",
		email: "",
		imageUrl: "",
		state: "",
		zipcode: ""
	}
	
	const [user, setuser] = useState({})
	const [details, setdetails] = useState(state)
	const token = localStorage.getItem('token')
	const [profile_image, setprofile_image] = useState("")
	const [dob, setdob] = useState("")
	const [name, setname] = useState("")
	const [location, setlocation] = useState("")
	const [allApointments, setallApointments] = useState([])
	const [prescriptions, setprescriptions] = useState([])
    const [services, setservices] = useState([])

	
	const toggleTableFunction_1 = () =>{
		document.getElementById('nav-toggle1').setAttribute('class','nav-link active')
		document.getElementById('nav-toggle2').setAttribute('class','nav-link ')

		document.getElementById('pat_appointments').setAttribute('class','tab-pane fade show active')
		document.getElementById('pat_prescriptions').setAttribute('class','tab-pane fade show')
	}
	const toggleTableFunction_2 = () =>{
		document.getElementById('nav-toggle1').setAttribute('class','nav-link ')
		document.getElementById('nav-toggle2').setAttribute('class','nav-link active')
		document.getElementById('pat_prescriptions').setAttribute('class','tab-pane fade show active')
			document.getElementById('pat_appointments').setAttribute('class','tab-pane fade show')
	}
	
	
	const loaduser = async(token) =>{
		const uri = "http://localhost:5000/lab_appointment/getLab"
		const getLab = await axios.get(uri,{headers:{
			'x-auth-token':token
		}})
		setuser(getLab.data.user)
		console.log(getLab.data.user.details)
		if( getLab.data.user.details !== null){
			setdetails(getLab.data.user.details)
			const data = getLab.data.user.details
			console.log(getLab.data.user)
			setname(`${data.name}`)
			setservices(data.services)
			setlocation(`${data.city} , ${data.state}`)
			setprofile_image(`http://localhost:5000/${data.imageUrl}`)
			localStorage.setItem('profile',`http://localhost:5000/${data.imageUrl}`)

		}
		
	}
	const loadAppointments = async(token) =>{
		const uri2 = "http://localhost:5000/lab_appointment/getAppointment"
		const getAppointment = await axios.get(uri2,{headers:{
			'x-auth-token':token
		}})
		console.log(getAppointment.data.data)
		setallApointments(getAppointment.data.data)

	}
	const toggleNavigation = (ele) => {
		var ele = parseInt(ele)
		var array = ['d_dashboard','d_setting','d_changePass']
		for(var i=0;i<array.length;i++){
			if(i == ele-1){
				document.getElementById(array[i]).setAttribute('class','col-md-7 col-lg-8 col-xl-9')
			}
			else{
				document.getElementById(array[i]).setAttribute('class','col-md-7 col-lg-8 col-xl-9 d-none')
			}
		}
		
	}
	
    const loadPrescription = async() =>{
		const uri = "http://localhost:5000/prescription/patient"
		const token = localStorage.getItem("token")
		const res = await axios.get(uri,{
			headers:{
				'x-auth-token':token
			}
		})
		console.log(res.data.data)
		setprescriptions(res.data.data)
	}

	useEffect(() => {
		
        loaduser(token)
		loadAppointments(token)
		//loadPrescription()
		document.getElementById('pat_appointments').setAttribute('class','tab-pane fade show active')
		document.getElementById('pat_prescriptions').setAttribute('class','tab-pane fade show')
	
	  
	}, [token])
	

  return (
    <div>
		<Header />
			<div class="breadcrumb-bar">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-12 col-12">							
							<h2 class="breadcrumb-title">Lab Dashboard</h2>
						</div>
					</div>
				</div>
			</div>
			
			<div class="content">
				<div class="container-fluid">

					<div class="row">
                        
					
						<div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
							<div class="profile-sidebar">
								<div class="widget-profile pro-widget-content">
									<div class="profile-info-widget">
										<a href="#" class="booking-doc-img">
											<img src={profile_image} alt="User Image"/>
										</a>
										<div class="profile-det-info">
											<h3>{name !== "" ?  name:user.username }</h3>
											<div class="patient-details">
												<h5><i class="fas fa-envelope" aria-hidden="true"></i>
                                                  {user.email !== "" ? user.email:"Please Update the info"}</h5>
												
												{/*<h5><i class="fas fa-birthday-cake"></i> 24 Jul 1983, 38 years</h5>*/}
												<h5 class="mb-0"><i class="fas fa-map-marker-alt"></i>{location === "" ? "Please Update the info":location}</h5>
											</div>
										</div>
									</div>
								</div>
								<div class="dashboard-widget">
									<nav class="dashboard-menu">
										<ul>
											<li class="" onClick={() => toggleNavigation(1)}>
												<a href="#" >
													<i class="fas fa-columns"></i>
													<span>Dashboard</span>
												</a>
											</li>											
											<li>
												<a href="#" onClick={() => toggleNavigation(2)}>
													<i class="fas fa-comments"></i>
													<span>Profile Settings</span>
													
												</a>
											</li>
											
											
											<li>
												<a href="/logout">
													<i class="fas fa-sign-out-alt"></i>
													<span>Logout</span>
												</a>
											</li>
										</ul>
									</nav>
								</div>

							</div>
						</div>
					
						
						<div id="d_dashboard" class="col-md-7 col-lg-8 col-xl-9">
							<div class="card">
								<div class="card-body pt-0">
								
									
									<nav class="user-tabs mb-4">
										<ul class="nav nav-tabs nav-tabs-bottom nav-justified">
											<li class="nav-item">
												<a class="nav-link active" id="nav-toggle1" onClick={toggleTableFunction_1} href="#pat_appointments" data-toggle="tab">Appointments</a>
											</li>
											<li class="nav-item">
												<a class="nav-link" id="nav-toggle2" onClick={toggleTableFunction_2} href="#pat_prescriptions" data-toggle="tab">Completed Appointments</a>
											</li>											
											
										</ul>
									</nav>
									
									<div class="tab-content pt-0">
										
									
										<div id="pat_appointments" class=" ">
											<div class="card card-table mb-0">
												<div class="card-body">
													<div class="table-responsive">
														<table class="table table-hover table-center mb-0">
															<thead>
																<tr>
																	<th>Patient</th>
																	<th>Appt Date</th>
                                                                    <th>Test</th>
																	<th>Appt Type</th>
																	<th>Status</th>
																	<th>Payment</th>
																</tr>
															</thead>
															<tbody>
																{allApointments !== [] ? (
																	allApointments.map((ele)=>{
                                                                        if(ele.status !== true){
																		const {_id,name,date,cost,status,time,app_type,test} = ele
																		return(
																			<tr>
																	<td>
																	<a href={`/Lab/appointmentDetails/${_id}`} className='text-decoration-none text-dark'>{name}</a>
																	</td>
																	<td>{date} <span class="d-block text-info">{time}</span></td>
																	<td>{test}</td>
																	<td>{app_type === "0" ? "Lab":"Home"}</td>
																	
																	{status !== false ? <td><span class="badge badge-pill bg-success-light">confirmed</span></td>:
																	<td><span class="badge badge-pill bg-danger-light">Pending</span></td>
																	}
                                                                    <td>Rs. {cost}</td>
																	
																	
																</tr>
																		)}
																	})
                                                                
																):""}																
																
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                       
										
										<div class="" id="pat_prescriptions">
											<div class="card card-table mb-0">
												<div class="card-body">
													<div class="table-responsive">
														<table class="table table-hover table-center mb-0">
															<thead>
																<tr>
                                                                <th>Patient</th>
																	<th>Appt Date</th>
                                                                    <th>Test</th>
																	<th>Appt Type</th>
																	<th>Status</th>
																	<th>Payment</th>
                                                                    <th>Result</th>
																</tr>     
															</thead>
															<tbody>
                                                            {allApointments !== [] ? (
																	allApointments.map((ele)=>{
                                                                        if(ele.status === true){
																		const {_id,name,date,cost,status,time,app_type,test,reportFile} = ele
																		return(
																			<tr>
																	<td>
																	<a href={`/Lab/appointmentDetails/${_id}`} className='text-decoration-none text-dark'>{name}</a>
																	</td>
																	<td>{date} <span class="d-block text-info">{time}</span></td>
																	<td>{test}</td>
																	<td>{app_type === "0" ? "Lab":"Home"}</td>
																	
																	{status !== false ? <td><span class="badge badge-pill bg-success-light">confirmed</span></td>:
																	<td><span class="badge badge-pill bg-danger-light">Pending</span></td>
																	}
                                                                    <td>Rs. {cost}</td>
																	<td><a href={`http://localhost:5000/${reportFile}`}>View</a></td>
																	
																</tr>
																		)}
																	})
                                                                
																):""}																
																
															</tbody>	
														</table>
													</div>
												</div>
											</div>
										</div>
										

                                    </div>
                                </div>
                            </div>
					    </div>
                       {/*-------------------------------------Profile Setting -------------------------------------------- */}
					   <div id="d_setting" class="d-none">
							 
							<ProfileSetting details={details} services={services}/>
						</div>
						
						
                    </div>
                </div>
			</div>
    </div>
  )
}
