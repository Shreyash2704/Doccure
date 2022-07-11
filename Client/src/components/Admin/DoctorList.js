import axios from 'axios'
import React,{useState,useEffect} from 'react'
import './assets/css/style.css'
import Header from './Header'
const DoctorList = () => {
    const [doctors, setdoctors] = useState([])
    const loadDoctors = async() =>{
        const uri = 'http://localhost:5000/admin_route'
        const response = await axios.get(uri,{
            headers:{
                'x-auth-token':localStorage.getItem('token')
            }
        })
        console.log(response.data.doctor)
        setdoctors(response.data.doctor)

    }
    useEffect(() => {
      loadDoctors()
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
													<th>Doctor Name</th>
													<th>Speciality</th>
													<th>Email</th>
													<th>Earned</th>
													<th>Account Status</th>
													
												</tr>
											</thead>
                                            <tbody>
                                                {doctors.length > 0 &&
                                                   doctors.map(ele=>{
                                                       const {name,speciality,earned,_id,image,email,verified } = ele
                                                       return(
                                                        <tr>
                                                        <td>
                                                            <h2 class="table-avatar">
                                                                <a href="profile.html" class="avatar avatar-sm m-2"><img class="avatar-img rounded-circle" src={`http://localhost:5000/${image}`} alt="User Image"/></a>
                                                                <a href={`/admin/profile/${_id}`} className='text-decoration-none'>Dr. {name}</a>
                                                            </h2>
                                                        </td>
                                                        <td>{speciality}</td>
                                                        
                                                        <td>{email}</td>
                                                        
                                                        <td>Rs. {earned}</td>
                                                        
                                                        <td>
                                                            {verified === true ? <input type="button" id="status_1"  value="Verified" class="btn btn-success" />
                                                                : <div class="status-toggle">
                                                                <input type="button" id="status_1"  value="Not Verified" class="btn btn-danger" />
                                                                
                                                            </div>}
                                                        </td>
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

export default DoctorList