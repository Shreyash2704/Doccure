import axios from 'axios'
import React,{useEffect,useState} from 'react'
import './assets/css/style.css'
import Header from './Header'
const PatientList = () => {
    const [patient, setpatient] = useState([])
    const loadPatient = async() =>{
        const uri = 'http://localhost:5000/admin_route'
        const response = await axios.get(uri,{
            headers:{
                'x-auth-token':localStorage.getItem('token')
            }
        })
        console.log(response.data.patient)
        setpatient(response.data.patient)

    }
    useEffect(() => {
        loadPatient()
    }, [])
  return (
    <div>
        <Header />

<div class="">
        <div class="content container-fluid">
        
        
            <div class="page-header">
                <div class="row">
                    <div class="col-sm-12">
                        <h3 class="page-title">List of Doctors</h3>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/admin">Dashboard</a></li>
                            <li class="breadcrumb-item active">Doctor</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="datatable table table-hover table-center mb-0">
                                <thead>
                                        <tr>
                                        <th>Patient ID</th>
													<th>Patient Name</th>
													<th>Age</th>
													<th>Address</th>
													<th>Phone</th>
													<th class="text-right">Paid</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            patient.map(ele =>{
                                                const {_id,name,age,address,contact,paid,image} = ele
                                                return(
                                                    <tr>
                                                        <th  className='text-dark'>{_id}</th>
													<th>
                                                    <h6 class="table-avatar">
															<a href={`/admin/patient/${_id}`} class="avatar avatar-sm m-2"><img class="avatar-img rounded-circle" src={`http://localhost:5000/${image}`} alt="No Image"/></a>
															<a href={`/admin/patient/${_id}`} className='text-decoration-none text-dark'>{name}</a>
														</h6>
                                                    </th>
													<th className='text-dark'>{age}</th>
													<th className='text-dark'>{address}</th>
													<th className='text-dark'>{contact}</th>
													<th class="text-right">{paid}</th>
                                                    </tr>
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
  )
}

export default PatientList