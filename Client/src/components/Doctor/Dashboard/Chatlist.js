import React from 'react'

const Chatlist = () => {
  return (
    <div class="appointment-list">
		<div class="profile-info-widget">
			<a href="patient-profile.html" class="booking-doc-img">
				<img src={`http://localhost:5000/${p_image}`} alt="User Image"/>
			</a>
			<div class="profile-det-info">
				<h3><a href="#" className='text-decoration-none text-dark'>{p_name}</a></h3>
				<div class="patient-details">
					<h5><i class="fas fa-envelope"></i> {p_email}</h5>
					<h5 class="mb-0"><i class="fas fa-phone"></i> {p_contact}</h5>
				</div>
			</div>
		</div>
		<div class="appointment-action">
			<a href={`video/${props.id}`} class="btn btn-sm bg-info-light" data-toggle="modal" data-target="#appt_details">
				<i class="far fa-eye"></i> Video Call
			</a>
			<a href={`chat/${p_id}`} class="btn btn-sm bg-success-light">
				<i class="fas fa-envelope"></i> Chat
			</a>
			
		</div>
	</div>
  )
}

export default Chatlist