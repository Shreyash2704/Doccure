import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Header from './Header'

const LabList = () => {
    const [labs, setlabs] = useState([])
    const loadLabs = async() =>{
        const uri = 'http://localhost:5000/lab_appointment/allLabs'
        const response = await axios.get(uri)
        console.log(response.data.data)
        setlabs(response.data.data)

    }
    useEffect(() => {
        loadLabs()
    }, [])
  return (
    <div>
        <Header />

        <div class="">
                <div class="content container-fluid">
				
				
					<div class="page-header">
						<div class="row">
							<div class="col-sm-12">
								<h3 class="page-title">List of Labs</h3>
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
													<th>Lab Name</th>
													<th>Address</th>
													<th>Email</th>
													<th>Contact</th>
													<th>Services</th>
													
												</tr>
											</thead>
                                            <tbody>
                                                {labs.length > 0 &&
                                                   labs.map(ele=>{
                                                       if(ele.details !== null){
                                                       const {name,imageUrl,_id,email,contact,city,state,services } = ele.details
                                                       return(
                                                        <tr>
                                                        <td>
                                                            <h2 class="table-avatar">
                                                                <a href="#" class="avatar avatar-sm m-2"><img class="avatar-img rounded-circle" src={`http://localhost:5000/${imageUrl}`} alt="User Image"/></a>
                                                                <a href="#" className='text-decoration-none'> {name}</a>
                                                            </h2>
                                                        </td>
                                                        <td>{city},{state}</td>
                                                        
                                                        <td>{email}</td>
                                                        
                                                        <td> {contact}</td>
                                                        
                                                        <td>
                                                            {services.map(ele =>{
                                                                return(<>{ele.test},</>)
                                                            })}
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
					</div>
					
				</div>			
			</div>
    </div>
  )
}

export default LabList