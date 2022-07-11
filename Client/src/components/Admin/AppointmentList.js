import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Header from './Header'

const AppointmentList = () => {
    const [labs, setlabs] = useState([])
    const loadLabsApp = async() =>{
        const uri = 'http://localhost:5000/lab_appointment/'
        const response = await axios.get(uri)
        console.log(response.data.data)
        setlabs(response.data.data)

    }
    useEffect(() => {
        loadLabsApp()
    }, [])
  return (
    <div>
        <Header />

        <div class="">
                <div class="content container-fluid">
				
				
					<div class="page-header">
						<div class="row">
							<div class="col-sm-12">
								<h3 class="page-title">List of Lab Appointments</h3>
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
                                                    <th>Date</th>
													<th>Clinic Name</th>
													<th>Patient</th>
													<th>Test</th>
                                                    <th>Appt Type</th>
													<th>Amount</th>
                                                    <th>Status</th>
                                                    <th>Report</th>
													
												</tr>
											</thead>
                                            <tbody>
                                                {labs.length > 0 &&
                                                   labs.map(ele=>{
                                                       const {lab_name,lab_image,name,date,time,cost,_id,reportFile,status,test,app_type } = ele
                                                       return(
                                                        <tr>
                                                            <td>{date} <span class="d-block text-info">{time}</span></td>
                                                        <td>
                                                            <h2 class="table-avatar">
                                                                <a href="#" class="avatar avatar-sm m-2"><img class="avatar-img rounded-circle" src={`http://localhost:5000/${lab_image}`} alt="User Image"/></a>
                                                                <a href="#" className='text-decoration-none'>{lab_name}</a>
                                                            </h2>
                                                        </td>
                                                        <td>{name}</td>
                                                        
                                                        <td>{test}</td>

                                                        <td>{app_type === "0" ? "Lab":"Home"}</td>
                                                        
                                                        <td>Rs. {cost}</td>
                                                        
                                                        <td>
                                                            {status === true ? <input type="button" id="status_1"  value="Completed" class="btn btn-success" />
                                                                : <div class="status-toggle">
                                                                <input type="button" id="status_1"  value="Pending" class="btn btn-danger" />
                                                                
                                                            </div>}
                                                        </td>
                                                        <td>{reportFile === null ? "NA" : <a href={`http://localhost:5000/${reportFile}`}>View</a>}</td>
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

export default AppointmentList