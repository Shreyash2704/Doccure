import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Header from './Header'
import {User,CreditCard,Monitor,DollarSign,Star} from 'react-feather'

const AdminHomepage = () => {
    const [d_count, setd_count] = useState(0)
    const [p_count, setp_count] = useState(0)
    const [a_count, seta_count] = useState(0)

    const [doctors, setdoctors] = useState([])
    const [patients, setpatients] = useState([])
    const [appointments, setappointments] = useState([])

    const loadData = async() =>{
        const uri = 'http://localhost:5000/admin_route'
        const response = await axios.get(uri,{
            headers:{
                'x-auth-token':localStorage.getItem('token')
            }
        })
        console.log(response.data)
        setd_count(response.data.doctor_count)
        setp_count(response.data.patient_count)
        seta_count(response.data.appointment_count)
        setdoctors(response.data.doctor)
        setpatients(response.data.patient)
        setappointments(response.data.appointment)
    }

    useEffect(() => {
      loadData()
    }, [])
    
  return (
    <div>
        <Header />
        
        <div class="bg-light">
			
            <div class="content container-fluid ">
                <div class="page-header">
                            <div class="row">
                                <div class="col-sm-12">
                                    <h3 class="page-title">Welcome Admin!</h3>
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item active">Dashboard</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="row">
						<div class="col-xl-4 col-sm-6 col-12">
							<div class="card">
								<div class="card-body">
									<div class="dash-widget-header">
										<span class="dash-widget-icon text-primary border-primary">
                                        <i class="fe fe-users"><User /></i>
										</span>
										<div class="dash-count">
											<h3>{d_count}</h3>
										</div>
									</div>
									<div class="dash-widget-info">
										<h6 class="text-muted">Doctors</h6>
                                        
										<div class="progress progress-sm">
											<div class="progress-bar bg-primary w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-4 col-sm-6 col-12">
							<div class="card">
								<div class="card-body">
									<div class="dash-widget-header">
										<span class="dash-widget-icon text-success">
											<i class="fe fe-credit-card"><CreditCard /></i>
										</span>
										<div class="dash-count">
											<h3> {p_count}</h3>
										</div>
									</div>
									<div class="dash-widget-info">
										<h6 class="text-muted">Patients</h6>
										<div class="progress progress-sm">
											<div class="progress-bar bg-success w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-4 col-sm-6 col-12">
							<div class="card">
								<div class="card-body">
									<div class="dash-widget-header">
										<span class="dash-widget-icon text-danger border-danger">
											<i class="fe fe-money"><DollarSign /></i>
										</span>
										<div class="dash-count">
											<h3>{a_count}</h3>
										</div>
									</div>
									<div class="dash-widget-info">
										
										<h6 class="text-muted">Appointment</h6>
										<div class="progress progress-sm">
											<div class="progress-bar bg-danger w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</div>

                    <div class="row">
						<div class="col-md-6 d-flex">
                        <div class="card card-table flex-fill">
								<div class="card-header">
									<h4 class="card-title">Doctors List</h4>
								</div>
								<div class="card-body">
									<div class="table-responsive">
										<table class="table table-hover table-center mb-0">
											<thead>
												<tr>
													<th>Doctor Name</th>
													<th>Speciality</th>
													<th>Earned</th>
													<th>Reviews</th>
												</tr>
											</thead>
											<tbody>
                                                {doctors.map((ele)=>{
                                                    const {_id,name,speciality,earned,image} = ele
                                                    return(
                                                        <tr>
                                                            
                                                            <td>
                                                            <h2 class="table-avatar">
															<a href="profile.html" class="avatar avatar-sm m-2"><img class="avatar-img rounded-circle" src={`http://localhost:5000/${image}`} alt="User Image"/></a>
															<a href="profile.html" className='text-decoration-none'>Dr. {name}</a>
														    </h2>
                                                            </td>
                                                            <td>{speciality}</td>
                                                            <td>{earned}</td>
                                                            <td>
                                                                <Star color='orange'/>
                                                                <Star color='orange'/>
                                                                <Star color='orange'/>
                                                                <Star color='orange'/>
                                                           
                                                            </td>

                                                        </tr>
                                                    )
                                                })}
												
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        </div>
                                        
                        </div>

                        <div class="col-md-6 d-flex">
                        <div class="card card-table flex-fill">
								<div class="card-header">
									<h4 class="card-title">Patients List</h4>
								</div>
								<div class="card-body">
									<div class="table-responsive">
										<table class="table table-hover table-center mb-0">
											<thead>
												<tr>
                                                    <th>Patient Name</th>
													<th>Phone</th>
													<th>Email</th>
													<th>Paid</th>
												</tr>
											</thead>
											<tbody>
                                                {patients.map((ele)=>{
                                                    const {_id,name,email,paid,contact,image} = ele
                                                    return(
                                                        <tr>
                                                            <td>
                                                            <h2 class="table-avatar">
															<a href="profile.html" class="avatar avatar-sm m-2"><img class="avatar-img rounded-circle" src={`http://localhost:5000/${image}`} alt="User Image"/></a>
															<a href="profile.html" className='text-decoration-none'> {name}</a>
														    </h2>
                                                            </td>
                                                            <td>{contact}</td>
                                                            <td>{email}</td>
                                                            <td>{paid}</td>

                                                        </tr>
                                                    )
                                                })}
												
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        </div>
                                        
                        </div>
                    </div>

                    {/*------------------------- */}

                    <div class="row">
						<div class="col-md-12">
						
							
							<div class="card card-table">
								<div class="card-header">
									<h4 class="card-title">Appointment List</h4>
								</div>
								<div class="card-body">
									<div class="table-responsive">
										<table class="table table-hover table-center mb-0">
											<thead>
												<tr>
													<th>Doctor Name</th>
													<th>Speciality</th>
													<th>Patient Name</th>
													<th>Apointment Time</th>
													<th>Status</th>
													<th class="text-right">Amount</th>
												</tr>
											</thead>
											<tbody>
                                                {appointments.map(ele =>{
                                                    const {p_name,d_name,amount,time,status,d_specialist,p_image,d_image} = ele
                                                    return(
                                                        <tr>
                                                            
                                                            <td>
                                                            <h2 class="table-avatar">
															<a href="profile.html" class="avatar avatar-sm m-1"><img class="avatar-img rounded-circle" src={`http://localhost:5000/${d_image}`} alt="User Image"/></a>
															<a href="profile.html" className='text-decoration-none '>Dr. {d_name}</a>
														    </h2>
                                                            </td>
                                                            <td>{d_specialist}</td>
                                                            <td>
                                                            <h2 class="table-avatar">
															<a href="profile.html" class="avatar avatar-sm m-1"><img class="avatar-img rounded-circle" src={`http://localhost:5000/${p_image}`} alt="User Image"/></a>
															<a href="profile.html" className='text-decoration-none'> {p_name}</a>
														    </h2>
                                                            </td>
                                                            <td>{time}</td>
                                                            <td>{status === "true" ? "Completed":"Pending" }</td>
                                                            <td>{amount}</td>

                                                        </tr>
                                                    )
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
  )
}

export default AdminHomepage