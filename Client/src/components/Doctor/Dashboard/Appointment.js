import React from 'react'

const Appointment = (props) => {
  return (
    <div class="appointment-list">
        <div class="profile-info-widget">
            <a href="#" class="booking-doc-img">
                <img src={`http://localhost:5000/${props.image}`} alt="User Image"/>
            </a>
            <div class="profile-det-info">
                <h3><a href="#" className='text-decoration-none text-dark'>{props.name}</a></h3>
                <div class="patient-details">
                    <h5><i class="far fa-clock"></i>{props.date}, {props.time}</h5>
                    <h5><i class="fas fa-map-marker-alt"></i> {props.city}, {props.state}</h5>
                    <h5><i class="fas fa-envelope"></i> {props.email}</h5>
                    <h5 class="mb-0"><i class="fas fa-phone"></i> {props.contact}</h5>
                </div>
            </div>
        </div>
        <div class="appointment-action">
            <a href={`video/${props.id}`} class="btn btn-sm bg-info-light" data-toggle="modal" data-target="#appt_details">
                <i class="far fa-eye"></i> Video Call
            </a>
            <a href={`chat/${props.id}`} class="btn btn-sm bg-success-light">
                <i class="fas fa-envelope"></i> Chat
            </a>
           
            <a href={`prescription/${props.id}`} class="btn btn-sm bg-success-light">
                <i class="fas fa-check"></i> Give Prescription
            </a>
            
        </div>
    </div>
  )
}

export default Appointment