import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import avatar from './assets/img/profiles/avatar-01.jpg'
import Header from './Header'

const PatientProfile = () => {
    const params = useParams()
    const id = params.id

    const [patient, setpatient] = useState({})
    const [details, setdetails] = useState({})
    const loadPatient = async(id) =>{
       const uri = `http://localhost:5000/patients/getPatient/${id}`
       const res = await axios.get(uri)
       console.log(res.data.data)
       setpatient(res.data.data)
       if(res.data.data.details !== undefined){
        setdetails(res.data.data.details)
       }
     
       
    }
    useEffect(() => {
      
    loadPatient(id)
      
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
                                <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
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
                                        <img class="rounded-circle" alt={details.imageUrl} src={`http://localhost:5000/${details.imageUrl}`}/>
                                    </a>
                                </div>
                                <div class="col ml-md-n2 profile-user-info">
                                    <h4 class="user-name mb-0">{`${details.fname} ${details.lname}`}</h4>
                                    <h6 class="text-muted">{details.email}</h6>
                                    <div class="user-Location"><i class="fa fa-map-marker"></i> {details.city}, {details.country}</div>
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
                                                    <p class="col-sm-10 mb-0">{details.address},<br/>
                                                    {details.city},<br/>
                                                    {details.state} - {details.pincode},<br/>
                                                    {details.country}.</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>

                                
                                </div>
                            

                            </div>
                            
                            
                            
                        </div>
                    </div>
                </div> : "Empty Data"}
            
            </div>			
        </div>
</div>
  )
}

export default PatientProfile