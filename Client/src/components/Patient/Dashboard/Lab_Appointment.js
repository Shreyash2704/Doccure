import axios from 'axios'
import React,{useState,useEffect} from 'react'

const Lab_Appointment = () => {
    const [allApp, setallApp] = useState([])
    const loadAppointments = async() =>{
        const token = localStorage.getItem('token')
        const uri = 'http://localhost:5000/lab_appointment/patient'
        const res = await axios.get(uri,{
            headers:{
                'x-auth-token':token
            }
        })
        console.log(res.data.data)
        setallApp(res.data.data)
    }
    useEffect(() => {
        loadAppointments()
    }, [])
    
  return (
    <div class="card card-table mb-0">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover table-center mb-0">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Lab Name</th>
                            <th>Test</th>
                            <th>Amount</th>
                            <th>Appt Type</th>
                            <th>Status</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allApp.length > 0 && allApp.map(ele=>{
                                return(
                                    <tr>
                                    <td>{ele.date} <span class="d-block text-info">{ele.time}</span></td>
                                    <td>
                                    <h2 class="table-avatar">
                                    <a href="doctor-profile.html" class="avatar avatar-sm m-2">
                                        <img class="avatar-img rounded-circle" src={`http://localhost:5000/${ele.lab_image}`} alt="User Image"/>
                                    </a>
                                    <a href="doctor-profile.html" className='text-decoration-none'>{ele.lab_name} </a>
                                </h2>
                                    </td>
                                    <td>{ele.test}</td>
                                    <td>{ele.cost}</td>
                                    <td>{ele.app_type === "0" ? "Lab":"Home"}</td>
                                    {ele.status !== false ? <td><span class="badge badge-pill bg-success-light">confirmed</span></td>:
																	<td><span class="badge badge-pill bg-danger-light">Pending</span></td>
																	}
                                    <td>{ele.reportFile !== null ? <a href={`http://localhost:5000/${ele.reportFile}`}>view</a> : "NA"}</td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Lab_Appointment