import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

const ChatSection = () => {
    const [doctors, setdoctors] = useState([])
    const [ids, setids] = useState([])
    
    const loadData = async() =>{
        const uri1 = `http://localhost:5000/patients/getDoctor/${localStorage.getItem('userid')}`
        const response1 = await axios.get(uri1)
        setids(response1.data.id)
		//console.log(response1)
		setdoctors(response1.data.doctors)
    }
    useEffect(() => {
      loadData()
    }, [])
    
  return (
    <div class="appointments">
		
		{console.log(doctors)}
							{doctors.map(ele=>{
                                console.log(doctors)
                                console.log(ids)
								    if(ids.includes(ele._id)){

									return(
										<div class="appointment-list">
											<div class="profile-info-widget">
												<a href={`chat/${ele._id}`} class="booking-doc-img">
													<img src={`http://localhost:5000/${ele.details.imageUrl}`} alt="User Image"/>
												</a>
												<div class="profile-det-info">
													<h3><a href={`chat/${ele._id}`} className='text-decoration-none text-dark'>{ele.details.fname} {ele.details.lname}</a></h3>
													<div class="patient-details">
														<h5><i class="fas fa-envelope"></i> {ele.details.email}</h5>
														<h5 class="mb-0"><i class="fas fa-phone"></i> {ele.details.contact}</h5>
													</div>
												</div>
											</div>
											<div class="appointment-action">
												<a href={`video/${ele._id}`} class="btn btn-sm bg-info-light" ><i class="far fa-eye"></i> Video Call</a>
				
												<a href={`chat/${ele._id}`} class="btn btn-sm bg-success-light">
													<i class="fas fa-envelope"></i> Chat
												</a>
												
											</div>
										</div>
										)
									}
								})}
								</div>
  )
}

export default ChatSection