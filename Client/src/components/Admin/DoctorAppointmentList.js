import React,{useState,useEffect} from 'react'
import Header from './Header'
import axios from 'axios'
const DoctorAppointmentList = () => {
    const [appointment, setappointment] = useState([])
    const loadDoctors = async() =>{
        const uri = 'http://localhost:5000/admin_route'
        const response = await axios.get(uri,{
            headers:{
                'x-auth-token':localStorage.getItem('token')
            }
        })
        console.log(response.data.appointment)
        setappointment(response.data.appointment)

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
                            <h3 class="page-title">List of Appointments</h3>
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
                                                <th>Doctor</th>
                                                <th>Speciality</th>
                                                <th>Patient</th>
                                                <th>appointment_date</th>
                                                <th>amount</th>
                                                <th>Status</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointment.length > 0 &&
                                               appointment.map(ele=>{
                                                   const {d_name,d_id,p_id,p_name,d_image,p_image,d_specialist,status,_id,time,appointment_date,amount } = ele
                                                   return(
                                                    <tr>
                                                    <td>
                                                        <h2 class="table-avatar">
                                                            <a href={`/admin/profile/${d_id}`} class="avatar avatar-sm m-2"><img class="avatar-img rounded-circle" src={`http://localhost:5000/${d_image}`} alt="User Image"/></a>
                                                            <a href={`/admin/profile/${d_id}`} className='text-decoration-none'>Dr. {d_name}</a>
                                                        </h2>
                                                    </td>
                                                    <td>{d_specialist}</td>
                                                    <td>
                                                        <h2 class="table-avatar">
                                                            <a href={`/admin/patient/${p_id}`} class="avatar avatar-sm m-2"><img class="avatar-img rounded-circle" src={`http://localhost:5000/${p_image}`} alt="User Image"/></a>
                                                            <a href={`/admin/patient/${p_id}`} className='text-decoration-none'>{p_name}</a>
                                                        </h2>
                                                    </td>
                                                    
                                                    <td>{appointment_date}<span class="d-block text-info">{time}</span></td>
                                                    
                                                    <td> {amount}</td>
                                                    
                                                    <td>
                                                        {status === "true" ? <input type="button" id="status_1"  value="Completed" class="btn btn-success" />
                                                            : <div class="status-toggle">
                                                            <input type="button" id="status_1"  value="Pending" class="btn btn-danger" />
                                                            
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

export default DoctorAppointmentList