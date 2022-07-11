import axios from 'axios'
import React,{useState,useEffect} from 'react'

const MyPatients = () => {
    const [patients, setpatients] = useState([])
    const [ids, setids] = useState([])
    const loadPatients = async() =>{

        const uri = `http://localhost:5000/doctor/getPatients/${localStorage.getItem('userid')}`
        const response = await axios.get(uri)
        setids(response.data.id)
        setpatients(response.data.patients)
    }
    useEffect(() => {
      loadPatients()
    }, [])

    
  return (
      

    <div class="row row-grid">
        {patients.map(ele=>{
            console.log(ele._id)
            console.log(ids.includes(ele._id))
            
          if(ids.includes(ele._id)){
              return(
            <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="card widget-profile pat-widget-profile">
                <div class="card-body">
                    <div class="pro-widget-content">
                        <div class="profile-info-widget">
                            <a href="#" class="booking-doc-img">
                                <img src={`http://localhost:5000/${ele.details.imageUrl}`} alt="User Image"/>
                            </a>
                            <div class="profile-det-info">
                                <h3><a href="#" className='text-decoration-none text-dark'>{ele.details.fname} {ele.details.lname}</a></h3>
                                
                                <div class="patient-details">
                                    <h5><b>Patient ID :</b> {ele._id}</h5>
                                    <h5 class="mb-0"><i class="fas fa-map-marker-alt"></i> {ele.details.city}, {ele.details.state}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="patient-info">
                        <ul>
                            <li>Phone <span>{ele.details.contact}</span></li>
                            <li>Age <span>38 Years, Male</span></li>
                            <li>Blood Group <span>{ele.details.blood_group}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>)
              
          }
        })}
		</div>
  )
}

export default MyPatients