import React,{useState,useEffect} from 'react'
import './style.css'
import '../../headers/header.css'
import '../../../index.css'
import doctor1 from '../../../assets/img/doctors/doctor-01.jpg'
import patient1 from '../../../assets/img/patients/patient1.jpg'
import Header from '../../headers/Header'
import Profile_setting from './Profile_setting'
import axios from 'axios'
import ChangePassword from './ChangePassword'
import ChatSection from './ChatSection'
import Lab_Appointment from './Lab_Appointment'
export default function Dashboard() {
	const state = {
		fname:"",
		lname:"",
		address: "",
		blood_group: "",
		city: "",
		contact: "",
		country: "",
		dob: "",
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
		const uri = "http://localhost:5000/patients/getPatient"
		const getPatient = await axios.get(uri,{headers:{
			'x-auth-token':token
		}})
		setuser(getPatient.data.user)
		console.log(getPatient.data.user.details)
		if( getPatient.data.user.details !== undefined){
			setdetails(getPatient.data.user.details)
			const data = getPatient.data.user.details
			console.log(getPatient.data.user)
			setname(`${data.fname} ${data.lname}`)
			setdob(data.dob)
			setlocation(`${data.city} , ${data.state}`)
			setprofile_image(`http://localhost:5000/${data.imageUrl}`)
			localStorage.setItem('profile',`http://localhost:5000/${data.imageUrl}`)

		}
		
	}
	const loadAppointments = async(token) =>{
		const uri2 = "http://localhost:5000/appointment/getPatientAppointment"
		const getAppointment = await axios.get(uri2,{headers:{
			'x-auth-token':token
		}})
		console.log(getAppointment.data.data)
		setallApointments(getAppointment.data.data)

	}
	const toggleNavigation = (ele) => {
		var ele = parseInt(ele)
		var array = ['d_dashboard','d_chat','d_setting','d_lab','d_changePass']
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
		loadPrescription()
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
							<h2 class="breadcrumb-title">Patient Dashboard</h2>
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
												<h5><i class="fas fa-birthday-cake"></i> {dob !== "" ?  dob:"Please Update the info" }</h5>
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
													<span>Message</span>
													
												</a>
											</li>
											<li onClick={() => toggleNavigation(3)}>
												<a href="#" >
													<i class="fas fa-user-cog"></i>
													<span>Profile Settings</span>
												</a>
											</li>
											<li onClick={() => toggleNavigation(4)}>
												<a href="#" >
													<i class="fas fa-user-cog"></i>
													<span>Lab Appointments</span>
												</a>
											</li>
											<li>
												<a href="#"onClick={() => toggleNavigation(5)}>
													<i class="fas fa-lock"></i>
													<span>Change Password</span>
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
												<a class="nav-link" id="nav-toggle2" onClick={toggleTableFunction_2} href="#pat_prescriptions" data-toggle="tab">Prescriptions</a>
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
																	<th>Doctor</th>
																	<th>Appt Date</th>
																	<th>Booking Date</th>
																	<th>Amount</th>
																	<th>Status</th>
																	<th></th>
																</tr>
															</thead>
															<tbody>
																{allApointments !== [] ? (
																	allApointments.map((ele)=>{
																		const {d_id,d_image,appointment_date,booking_date,amount,status,time,d_name,d_specialist} = ele
																		return(
																			<tr>
																	<td>
																		<h2 class="table-avatar">
																			<a href={`/profile/${d_id}`} class="avatar avatar-sm m-2">
																				<img class="avatar-img rounded-circle" src={`http://localhost:5000/${d_image}`} alt="User Image"/>
																			</a>
																			<a href={`/profile/${d_id}`} className='text-decoration-none'>Dr. {d_name} <span>{d_specialist}</span></a>
																		</h2>
																	</td>
																	<td>{appointment_date} <span class="d-block text-info">{time}</span></td>
																	<td>{booking_date}</td>
																	<td>{amount}</td>
																	{/*<td>14 Nov 2019</td>*/}
																	{status !== "false" ? <td><span class="badge badge-pill bg-success-light">Completed</span></td>:
																	<td><span class="badge badge-pill bg-danger-light">Not Completed</span></td>
																	}
																	
																	{/*<td class="text-center">
																		<div class="table-action">																			
																			<a href="javascript:void(0);" class="btn btn-sm bg-info-light">
																				<i class="far fa-eye"></i> View
																			</a>
																		</div>
																</td>*/}
																</tr>
																		)
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
																	<th>Date </th>
																	<th>Name/Id</th>									
																	<th>Created by </th>
																	<th></th>
																</tr>     
															</thead>
															<tbody>
																{
																	prescriptions.length > 0 &&
																	prescriptions.map(ele=>{
																		const {_id,d_id,d_name,d_image,date} = ele
																		return(
																			<>
																			<tr>
																	<td>{date}</td>
																	<td>{_id}</td>
																	<td>
																		<h2 class="table-avatar">
																			<a href={`/profile/${d_id}`} class="avatar avatar-sm m-2">
																				<img class="avatar-img rounded-circle" src={`http://localhost:5000/${d_image}`} alt="User Image"/>
																			</a>
																			<a href={`/profile/${d_id}`} className='text-decoration-none'>Dr. {d_name} </a>
																		</h2>
																	</td>
																	<td class="text-right">
																		<div class="table-action">
																			
																			<a href={`ShowPrescription/${_id}`} class="btn btn-sm bg-info-light">
																				<i class="far fa-eye"></i> View
																			</a>
																		</div>
																	</td>
																</tr>
																			</>
																		)
																	})
																}
																
																
																
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
							
							<Profile_setting image={profile_image} details={details}/>

						</div>
						{/*----------------------Chat section--------------------------------------*/}
						<div id="d_chat" className="d-none">
							<h1>Chat Section</h1>
							<ChatSection />

						</div>
						{/*----------------------Chat section--------------------------------------*/}
						<div id="d_lab" className="d-none">
							
							<Lab_Appointment />

						</div>
						{/*----------------------Chang Password section--------------------------------------*/}
						<div id="d_changePass" className='d-none'>
                             <ChangePassword />
						</div>
                    </div>
                </div>
			</div>
    </div>
  )
}
