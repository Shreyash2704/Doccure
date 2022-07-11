import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Header from '../../headers/Header'
import Appointment from './Appointment'
import ChangePassword from './ChangePassword'
import MyPatients from './MyPatients'
import Prescription from './Prescription'
import Profile_setting from './Profile_setting'

export default function Doctors_Dashboard() {

	const details = {
        username:"",
        fname:"",
        lname:"",
        email:"",
        contact:"",
        gender:"",
        dob:"",
        about_me:"",
        imageUrl:""

    }
    const medical_registration = {
        reg_council : "",
        reg_number:0,
        reg_year:""

    }
    const education_obj = {
        degree:"",
        college:"",
        year:""
    }
    const experience_obj = {
        hospital_name:"",
        from:"",
        to:"",
        designation:""
    }
    const clinic_info = {
        clinic_name:"",
        clinic_address:"",
        
    }
    const service = []
    const specialization = []
    const contact_details = {
        address:"",
        city:"",
        state:"",
        country:"",
        pincode:""
    }

	const [user, setuser] = useState({})
	const [UserDetails, setUserDetails] = useState(details)
    const [UserContact, setUserContact] = useState(contact_details)
    const [UserClinic, setUserClinic] = useState(clinic_info)
    const [Medical, setMedical] = useState(medical_registration)
    const [experience, setexperience] = useState([])
    const [education, seteducation] = useState([])
    const [services, setservices] = useState([])
	const [specialist, setspecialist] = useState([])
	const [d_edu, setd_edu] = useState("")
	const [spec, setspec] = useState("")
    const [allAppointments, setallAppointments] = useState([])
	const [ids, setids] = useState([])
	const [patients, setpatients] = useState([])

	const date = new Date(Date.now()).getDate()
	const month = new Date(Date.now()).getMonth()+1
	const year =  new Date(Date.now()).getFullYear() 
	var today_date = ""
	if(month < 10){
		today_date = `${year}-0${month}-${date}`
	}else{
		today_date = `${year}-${month}-${date}`
	}
	
   
	
	const loadData = async(token) =>{
		const uri = "http://localhost:5000/doctor/getDoctor"
		const getDoctor = await axios.get(uri,{headers:{
			'x-auth-token':token
		}})
		console.log(getDoctor.data.user)
		setuser(getDoctor.data.user)
		if( getDoctor.data.user.details !== undefined){
			setUserDetails(getDoctor.data.user.details)
		}
		if(getDoctor.data.user.clinic_info !== undefined){
			setUserClinic(getDoctor.data.user.clinic_info)
		}
		if(getDoctor.data.user.education !== undefined){
			seteducation(getDoctor.data.user.education)
			var degree = ""
			var len = getDoctor.data.user.education.length
			var count = 0
			getDoctor.data.user.education.map((ele)=>{
				degree = `${ele.degree} `
			})
			setd_edu(degree)
		}
		if(getDoctor.data.user.experince !== undefined){
			setexperience(getDoctor.data.user.experince)
		}
		if(getDoctor.data.user.medical_reg !== undefined){
			setMedical(getDoctor.data.user.medical_reg)
		}
		if(getDoctor.data.user.service !== undefined){
			setservices(getDoctor.data.user.service)
		}
		if(getDoctor.data.user.specialization !== undefined){
			setspecialist(getDoctor.data.user.specialization)
			var a = ""
			getDoctor.data.user.specialization.map((ele)=>{
				a = `${ele} `
			})
			setspec(a)
		}
		if(getDoctor.data.user.contact_details !== undefined){
			setUserContact(getDoctor.data.user.contact_details)
		}

	}
	const toggleNavigation = (ele) => {
		var ele = parseInt(ele)
		var array = ['dashboard','appointment','patients','timing','message','profile','change_pass']
		for(var i=0;i<array.length;i++){
			if(i == ele-1){
				document.getElementById(array[i]).setAttribute('class','col-md-7 col-lg-8 col-xl-9')
			}
			else{
				document.getElementById(array[i]).setAttribute('class','col-md-7 col-lg-8 col-xl-9 d-none')
			}
		}
		
	}
	
	
	const toggleTableFunction1 = () =>{
		document.getElementById('nav-toggle1').setAttribute('class','nav-link active')
		document.getElementById('nav-toggle2').setAttribute('class','nav-link ')
		document.getElementById('nav-toggle3').setAttribute('class','nav-link ')

		document.getElementById('upcoming-appointments').setAttribute('class','tab-pane fade show active')
		document.getElementById('today-appointments').setAttribute('class','tab-pane fade show')
		document.getElementById('completed-appointments').setAttribute('class','tab-pane fade show')
	}
	const toggleTableFunction2 = () =>{
		document.getElementById('nav-toggle1').setAttribute('class','nav-link ')
		document.getElementById('nav-toggle2').setAttribute('class','nav-link active')
		document.getElementById('nav-toggle3').setAttribute('class','nav-link ')
		document.getElementById('today-appointments').setAttribute('class','tab-pane fade show active')
		document.getElementById('upcoming-appointments').setAttribute('class','tab-pane fade show')
		document.getElementById('completed-appointments').setAttribute('class','tab-pane fade show')
	}
	const toggleTableFunction3 = () =>{
		document.getElementById('nav-toggle1').setAttribute('class','nav-link ')
		document.getElementById('nav-toggle2').setAttribute('class','nav-link ')
		document.getElementById('nav-toggle3').setAttribute('class','nav-link active')
		document.getElementById('today-appointments').setAttribute('class','tab-pane fade show ')
		document.getElementById('upcoming-appointments').setAttribute('class','tab-pane fade show')
		document.getElementById('completed-appointments').setAttribute('class','tab-pane fade show active')
	}

	const loadAppointment = async(token) =>{
		const uri = 'http://localhost:5000/appointment/getDoctorAppointment'
		const response = await axios.get(uri,{headers:{
			'x-auth-token':token
		}})
		console.log(response.data.data)
		setallAppointments(response.data.data)

		const uri1 = `http://localhost:5000/doctor/getPatients/${localStorage.getItem('userid')}`
        const response1 = await axios.get(uri1)
        setids(response1.data.id)
		setpatients(response1.data.patients)
	}
	const updateStatus = async(id) =>{
		const body = {
			user_id:id
		}
		
		const uri = `http://localhost:5000/appointment/updateStatus`
		const res = await axios.post(uri,body)
		console.log(res)
		window.location.reload()
	}


	useEffect(() => {
		const token = localStorage.getItem('token')
		loadData(token)
		loadAppointment(token)
        
		
	}, [])
	
	
  return (
    <div class="main-wrapper">
		
			<Header />	
			<div class="breadcrumb-bar">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-12 col-12">							
							<h2 class="breadcrumb-title">Doctor Dashboard</h2>
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
											<img src={`http://localhost:5000/${UserDetails.imageUrl}`} alt={UserDetails.imageUrl}/>
										</a>
										<div class="profile-det-info">
											<h3>{UserDetails.fname} {UserDetails.lname}</h3>
											
											<div class="patient-details">
												<h5 class="mb-0">{d_edu} - {spec}</h5>
											</div>
										</div>
									</div>
								</div>
								<div class="dashboard-widget">
									<nav class="dashboard-menu">
										<ul>
											<li class="active">
												<a href="#" onClick={() => toggleNavigation(1)} >
													<i class="fas fa-columns"></i>
													<span>Dashboard</span>
												</a>
											</li>
											<li>
												<a href="#" onClick={() => toggleNavigation(2)}>
													<i class="fas fa-calendar-check"></i>
													<span>Appointments</span>
												</a>
											</li>
											<li>
												<a href="#" onClick={() => toggleNavigation(3)}>
													<i class="fas fa-user-injured"></i>
													<span>My Patients</span>
												</a>
											</li>
											<li>
												<a href="#" onClick={() => toggleNavigation(4)}>
													<i class="fas fa-hourglass-start"></i>
													<span>Prescription</span>
												</a>
											</li>										
											<li>
												<a href="#" onClick={() => toggleNavigation(5)}>
													<i class="fas fa-comments"></i>
													<span>Message</span>
													
												</a>
											</li>
											<li>
												<a href="#" onClick={() => toggleNavigation(6)}>
													<i class="fas fa-user-cog"></i>
													<span>Profile Settings</span>
												</a>
											</li>										
											<li>
												<a href="#" onClick={() => toggleNavigation(7)}>
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

						{/*--------------------------------------- */}
						
						<div class='col-md-7 col-lg-8 col-xl-9' id="dashboard">

							
							
							<div class="row">
								<div class="col-md-12">
									<h4 class="mb-4">Patient Appoinments</h4>
									<div class="appointment-tab">
									
										{/*<!-- Appointment Tab -->*/}
										<ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
											<li class="nav-item" onClick={toggleTableFunction1}>
												<a class="nav-link active" id="nav-toggle1" href="#upcoming-appointments" onClick={toggleTableFunction1} data-toggle="tab">Upcoming</a>
											</li>
											<li class="nav-item" onClick={toggleTableFunction2}>
												<a class="nav-link " id="nav-toggle2" href="#today-appointments" onClick={toggleTableFunction2} data-toggle="tab">Today</a>
											</li> 
											<li class="nav-item" onClick={toggleTableFunction3}>
												<a class="nav-link " id="nav-toggle3" href="#today-appointments" onClick={toggleTableFunction3} data-toggle="tab">Completed</a>
											</li>
										</ul>
										
										
										<div class="tab-content">
										
											{/*<!-- Upcoming Appointment Tab -->*/}
											<div class="tab-pane show active" id="upcoming-appointments">
												<div class="card card-table mb-0">
													<div class="card-body">
														<div class="table-responsive">
															<table class="table table-hover table-center mb-0">
																<thead>
																	<tr>
																		<th>Patient Name</th>
																		<th>Appt Date</th>
																		<th>Purpose</th>
																		<th>Type</th>
																		<th class="text-center">Paid Amount</th>
																		<th></th>
																	</tr>
																</thead>
																<tbody>
																	{allAppointments.map(ele=>{
																		console.log(ele)
																		if(ele.status !== "true"){
																		const {_id,p_image,amount,appointment_date,time,p_name,p_id} = ele
																		
																		return(
																			<tr>
																		<td>
																			<h2 class="table-avatar">
																				<a href="#" class="avatar avatar-sm m-2"><img class="avatar-img rounded-circle" src={`http://localhost:5000/${p_image}`} alt="User Image"/></a>
																				<a href="#" className='text-decoration-none'>{p_name} <span>#PT0016</span></a>
																			</h2>
																		</td>
																		<td>{appointment_date}<span class="d-block text-info">{time}</span></td>
																		<td>General</td>
																		<td>New Patient</td>
																		<td class="text-center">{amount}</td>
																		<td class="text-right">
																			<div class="table-action">
																				<a href={`/chat/${p_id}`} class="btn btn-sm bg-info-light">
																					<i class="far fa-eye"></i> Chat
																				</a>
																				
																				<a href="#" onClick={() => updateStatus(_id)} class="btn btn-sm bg-success-light">
																					<i class="fas fa-check"></i> Completed
																				</a>
																				{/*<a href="javascript:void(0);" class="btn btn-sm bg-danger-light">
																					<i class="fas fa-times"></i> Cancel
																		</a>*/}
																			</div>
																		</td>
																	</tr>
																		)}
																	})}
																	
																</tbody>
															</table>		
														</div>
													</div>
												</div>
											</div>
                                            {/*
											<!-- /Upcoming Appointment Tab -->
					                         <!-- Today Appointment Tab -->*/}
											<div class="tab-pane" id="today-appointments">
												<div class="card card-table mb-0">
													<div class="card-body">
														<div class="table-responsive">
															<table class="table table-hover table-center mb-0">
																<thead>
																	<tr>
																		<th>Patient Name</th>
																		<th>Appt Date</th>
																		<th>Purpose</th>
																		<th>Type</th>
																		<th class="text-center">Paid Amount</th>
																		<th></th>
																	</tr>
																</thead>
																<tbody>
																	{allAppointments.map(ele=>{
													
																		if(ele.appointment_date === today_date){
																			const {p_image,amount,appointment_date,time,p_name,p_id} = ele
																			return(
																				<tr>
																			<td>
																				<h2 class="table-avatar">
																					<a href="#" class="avatar avatar-sm m-2"><img class="avatar-img rounded-circle" src={`http://localhost:5000/${p_image}`} alt="User Image"/></a>
																					<a href="#" className='text-decoration-none'>{p_name} <span>#PT0016</span></a>
																				</h2>
																			</td>
																			<td>{appointment_date}<span class="d-block text-info">{time}</span></td>
																			<td>General</td>
																			<td>New Patient</td>
																			<td class="text-center">{amount}</td>
																			<td class="text-right">
																				<div class="table-action">
																					<a href={`/chat/${p_id}`} class="btn btn-sm bg-info-light">
																						<i class="far fa-eye"></i> Chat
																					</a>
																					
																					<a href="javascript:void(0);" class="btn btn-sm bg-success-light">
																						<i class="fas fa-check"></i> Accept
																					</a>
																					<a href="javascript:void(0);" class="btn btn-sm bg-danger-light">
																						<i class="fas fa-times"></i> Cancel
																			</a>
																				</div>
																			</td>
																		</tr>
																			)
																		}
																	
																		})
																	}
																	
																</tbody>
															</table>		
														</div>	
													</div>	
												</div>	
											</div>
											{/*completed  */}
											<div class="tab-pane show" id="completed-appointments">
												<div class="card card-table mb-0">
													<div class="card-body">
														<div class="table-responsive">
															<table class="table table-hover table-center mb-0">
																<thead>
																	<tr>
																		<th>Patient Name</th>
																		<th>Appt Date</th>
																		<th>Purpose</th>
																		<th>Type</th>
																		<th class="text-center">Paid Amount</th>
																		<th></th>
																	</tr>
																</thead>
																<tbody>
																	{allAppointments.map(ele=>{
																		console.log(ele)
																		if(ele.status === "true"){
																		const {_id,p_image,amount,appointment_date,time,p_name,p_id} = ele
																		
																		return(
																			<tr>
																		<td>
																			<h2 class="table-avatar">
																				<a href="#" class="avatar avatar-sm m-2"><img class="avatar-img rounded-circle" src={`http://localhost:5000/${p_image}`} alt="User Image"/></a>
																				<a href="#" className='text-decoration-none'>{p_name} <span>#PT0016</span></a>
																			</h2>
																		</td>
																		<td>{appointment_date}<span class="d-block text-info">{time}</span></td>
																		<td>General</td>
																		<td>New Patient</td>
																		<td class="text-center">{amount}</td>
																		<td class="text-right">
																			
																		</td>
																	</tr>
																		)}
																	})}
																	
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

						</div>
						{/*--------------------------------------- */}
						<div className='d-none' id="appointment" >
							<div class="appointments">
								{allAppointments.map(ele=>{
									if(ele.status === "false"){const {p_name,p_image,time,appointment_date,p_email,p_city,p_state,p_contact,p_id} = ele
									return(
										<Appointment id={p_id} name={p_name} image={p_image} time={time}  date={appointment_date} city={p_city} state={p_state} email={p_email} contact={p_contact}/>
									)}
								})}
							</div>
						</div>
						{/*--------------------------------------- */}
						<div id="patients" className='col-md-7 col-lg-8 col-xl-9 d-none'>
						<h1>My Patients</h1><hr></hr>
							<MyPatients />
						</div>
						{/*--------------------------------------- */}
						<div id="timing" className='col-md-7 col-lg-8 col-xl-9 d-none'>
							<Prescription />

						</div>
						{/*--------------------------------------- */}
						<div id="message" className='col-md-7 col-lg-8 col-xl-9 d-none'>
							<h1>Message</h1>
							<div class="appointments">
							{patients.map(ele=>{
								    if(ids.includes(ele._id)){


									return(
										<div class="appointment-list">
											<div class="profile-info-widget">
												<a href={`chat/${ele._id}`} class="booking-doc-img">
													<img src={`http://localhost:5000/${ele.details.imageUrl}`} alt="User Image"/>
												</a>
												<div class="profile-det-info">
													<h3><a href={`chat/${ele._id}`} className='text-decoration-none text-dark'>{ele.details.fname} {ele.details.lname}</a></h3>
													<div class="patient-details">
														<h5><i class="fas fa-envelope"></i> {ele.details.email}</h5>
														<h5 class="mb-0"><i class="fas fa-phone"></i> {ele.details.contact}</h5>
													</div>
												</div>
											</div>
											<div class="appointment-action">
												<a href={`video/${ele._id}`} class="btn btn-sm bg-info-light" data-toggle="modal" data-target="#appt_details">
													<i class="far fa-eye"></i> Video Call
												</a>
												<a href={`chat/${ele._id}`} class="btn btn-sm bg-success-light">
													<i class="fas fa-envelope"></i> Chat
												</a>
												
											</div>
										</div>
										)
									}
								})}
								</div>
						</div>
						{/*--------------------------------------- */}
						<div id="profile" className='col-md-7 col-lg-8 col-xl-9 d-none'>
							
							<Profile_setting details={UserDetails} clinic={UserClinic} contact_details={UserContact} service={services} specialization={specialist} experience={experience} medical={Medical} education={education}/>
						</div>
						{/*--------------------------------------- */}
						<div id="change_pass" className='col-md-7 col-lg-8 col-xl-9 d-none'>
							
							<ChangePassword />
						</div>
						{/*--------------------------------------- */}
					</div>

				</div>

			</div>		
			  
		</div>
  )
}
