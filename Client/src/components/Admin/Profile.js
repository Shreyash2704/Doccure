import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './assets/css/style.css'
import avatar from './assets/img/profiles/avatar-01.jpg'
import Header from './Header'
const Profile = () => {
   
    const params = useParams()
    const id = params.id
    const [doctor, setdoctor] = useState({})
    const [details, setdetails] = useState({})
    const [medical_reg, setmedical_reg] = useState({})
    const [contact_details, setcontact_details] = useState({})
    const [clinic, setclinic] = useState({})

    const loadData = async(id) =>{
        const uri = `http://localhost:5000/doctor/getDoctor/${id}`
        const res = await axios.get(uri)
        console.log(res.data.data)
		setdoctor(res.data.data)
		if(res.data.data.contact_details !== undefined){
			setcontact_details(res.data.data.contact_details)
        setdetails(res.data.data.details)
        
        setmedical_reg(res.data.data.medical_reg)
        setclinic(res.data.data.clinic_info)
		}
        
    }
    const changeStatus = async() =>{
        const uri = "http://localhost:5000/doctor/updateStatus"
        const body = {
            user_id:doctor._id
        }
        const res = await axios.post(uri,body)
        console.log(res)
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }
    useEffect(() => {
      loadData(id)
    }, [id])
    
  return (
    <div>
        <Header />
        <div class="bg-light">
                <div class="content container bg-light">
					
					
					<div class="page-header  px-5 py-2">
						<div class="row">
							<div class="col">
								<h3 class="page-title">Profile</h3>
								<ul class="breadcrumb">
									<li class="breadcrumb-item"><a href="/admin">Dashboard</a></li>
									<li class="breadcrumb-item active">Profile</li>
								</ul>
							</div>
						</div>
					</div>
					
					{details.email !== undefined ? <div class="row">
						<div class="col-md-12">
							<div class="profile-header">
								<div class="row align-items-center">
									<div class="col-auto profile-image">
										<a href="#">
											<img class="rounded-circle" alt="User Image" src={`http://localhost:5000/${details.imageUrl}`}/>
										</a>
									</div>
									<div class="col ml-md-n2 profile-user-info">
										<h4 class="user-name mb-0">Dr. {`${details.fname} ${details.lname}`}</h4>
										<h6 class="text-muted">{details.email}</h6>
                                        <h6 class="text-muted">{doctor.verified === false ? "Not Verified Yet" : "Verified"}</h6>
										<div class="user-Location"><i class="fa fa-map-marker"></i> {contact_details.city},{contact_details.country}</div>
										<div class="about-text">{details.aboutme}</div>
									</div>
									
								</div>
							</div>
							<div class="profile-menu">
								<ul class="nav nav-tabs nav-tabs-solid">
									<li class="nav-item">
										<a class="nav-link active" data-toggle="tab" href="#per_details_tab">About</a>
									</li>
									
								</ul>
							</div>	
							<div class="tab-content profile-tab-cont">
								
							
								<div class="tab-pane fade show active" id="per_details_tab">
								
								
									<div class="row">
										<div class="col-lg-12">
											<div class="card">
												<div class="card-body">
													<h5 class="card-title d-flex justify-content-between">
														<span>Personal Details</span> 
													</h5>
													<div class="row">
														<p class="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">Name</p>
														<p class="col-sm-10">{`${details.fname} ${details.lname}`}</p>
													</div>
													<div class="row">
														<p class="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">Date of Birth</p>
														<p class="col-sm-10">{details.dob}</p>
													</div>
													<div class="row">
														<p class="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">Email ID</p>
														<p class="col-sm-10">{details.email}</p>
													</div>
													<div class="row">
														<p class="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">Mobile</p>
														<p class="col-sm-10">{details.contact}</p>
													</div>
													<div class="row">
														<p class="col-sm-2 text-muted text-sm-right mb-0">Address</p>
														<p class="col-sm-10 mb-0">{contact_details.address}<br/>
														{contact_details.city},<br/>
														{contact_details.state} - {contact_details.pincode},<br/>
														{contact_details.country}</p>
													</div>
												</div>
											</div>
											
										</div>

                                        <div class="col-lg-12">
											<div class="card">
												<div class="card-body">
													<h5 class="card-title d-flex justify-content-between">
														<span>Medical Registration</span> 
													</h5>
													<div class="row">
														<p class="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">Registration Council</p>
														<p class="col-sm-10">{medical_reg.reg_council}</p>
													</div>
													<div class="row">
														<p class="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">Registration Number</p>
														<p class="col-sm-10">{medical_reg.reg_number}</p>
													</div>
													<div class="row">
														<p class="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">Registration Year</p>
														<p class="col-sm-10">{medical_reg.reg_year}</p>
													</div>
                                                    {doctor.verified === false && <div class="">
														<button className='btn btn-success' onClick={changeStatus} >Change Status to Verified</button>
													</div>}
													
												</div>
											</div>
											
										</div>

                                        <div class="col-lg-12">
											<div class="card">
												<div class="card-body">
													<h5 class="card-title d-flex justify-content-between">
														<span>Clinic Info</span> 
													</h5>
													<div class="row">
														<p class="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">Clinic Name</p>
														<p class="col-sm-10">{clinic.clinic_name}</p>
													</div>
													<div class="row">
														<p class="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">Clinic Address</p>
														<p class="col-sm-10">{clinic.clinic_address}</p>
													</div>
													
													
												</div>
											</div>
											
										</div>
									
									</div>
								

								</div>
								
								
								
							</div>
						</div>
					</div> : 
					<>
					<div class="row">
										<div class="col-lg-12">
											<div class="card">
												<div class="card-body">
													<h5 class="card-title d-flex justify-content-between">
														<span>Personal Details -       (Haven't filled data)</span> 
													</h5>
													<div class="row">
														<p class="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">Name</p>
														<p class="col-sm-10"></p>
													</div>
													<div class="row">
														<p class="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">Date of Birth</p>
														<p class="col-sm-10"></p>
													</div>
													<div class="row">
														<p class="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">Email ID</p>
														<p class="col-sm-10"></p>
													</div>
													<div class="row">
														<p class="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">Mobile</p>
														<p class="col-sm-10"></p>
													</div>
													
												</div>
											</div>
											
										</div>
										</div>

					</>}
				
				</div>			
			</div>
    </div>
  )
}

export default Profile