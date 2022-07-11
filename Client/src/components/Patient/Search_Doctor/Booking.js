import React,{useState,useEffect} from 'react'
import Header from '../../headers/Header'
import Footer from '../../footers/Footer'
import { Alert, Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'
export default function Booking(props) {
    const istate={
        date:"",
        time:""
    }
    const initialState = {
        p_id:"",
        d_id:"",
        p_image:"",
        d_image:"",
        booking_date:"",
        time:"",
        appointment_date:"",
        amount:"",
        d_name:"",
        d_specialist:"",
        p_name:""
    }
    const [appointment, setappointment] = useState(istate)
    const [bookAppoinment, setbookAppoinment] = useState(initialState)
   const param = useParams()
   const id = param.id
   const [doctor, setdoctor] = useState({})
   const [contact_details, setcontact_details] = useState({})
   const [duration, setduration] = useState([])
   const [pageState, setpageState] = useState("Book Appointment")
   const [error, seterror] = useState("")
   const [success, setsuccess] = useState("")
   const [specialist, setspecialist] = useState([])
   const [d_email, setd_email] = useState("")
   const handleInputChange = (e) =>{
       const {name,value} = e.target
       setappointment({...appointment,[name]:value})
   }

   const submitData = () =>{
       console.log(appointment)
       document.getElementById('booking-section').setAttribute('class','content d-none')
       document.getElementById('payment-section').setAttribute('class','content')
       setpageState("Checkout")
      
   }
   const changeState = () =>{
    document.getElementById('booking-section').setAttribute('class','content ')
    document.getElementById('payment-section').setAttribute('class','content d-none')
    setpageState("Book Appointment")
    setappointment(istate)
   }
   const loadDoctor = async() =>{
    const uri = `http://localhost:5000/doctor/getDoctor/${id}`
    const token = localStorage.getItem('token')
    const getDoc = await axios.get(uri)
    console.log(getDoc.data.data)
	setd_email(getDoc.data.data.email)
    setdoctor(getDoc.data.data.details)
    setcontact_details(getDoc.data.data.contact_details)
    setspecialist(getDoc.data.data.specialization)
    var time = getDoc.data.data.details.duration
    var a = []
    if(time.split('-')[0].includes('a')){
        a.push(parseInt(time.split('-')[0].split('a')[0]))
        
    }else{
        a.push(parseInt(time.split('-')[0].split('a')[0])+12)
        
    }

    if(time.split('-')[1].includes('a')){
        a.push(parseInt(time.split('-')[1].split('a')[0]))
        
    }else{
        a.push(parseInt(time.split('-')[1].split('a')[0])+12)
    }

    setduration(a)
   
    
}



const Book_Appointment = async() =>{
        seterror("")
        const today_date = Date.now()
        const date = Date(today_date)
        const date1 = new Date()
        const time = date.split(' ')[4]
        var sp = ""
        if(specialist !== []){
            specialist.map(ele=>{
                if(sp === ""){
                    sp = `${ele}`
                }
                else{
                    sp = `${sp}, ${ele}`
                }
            })
        }
        
        const body = {
            p_id:localStorage.getItem('userid'),
            d_id:param.id,
            p_image:localStorage.getItem('image'),
            d_image:doctor.imageUrl,
            booking_date:`${date1.getDate()}-${date1.getMonth()+1}-${date1.getFullYear()} ${time}`,
            time:appointment.time,
            appointment_date:appointment.date,
            amount:doctor.fees,
            d_name:`${doctor.fname} ${doctor.lname}`,
            d_specialist:sp,
            p_name:`${localStorage.getItem('fname')} ${localStorage.getItem('lname')}`
        }

        for(var key in body){
            if(body[key] === ""){
                seterror("Please schedule the time and date for appointment.")
                break
            }
            else{
                const schedule_appointment = await axios.post('http://localhost:5000/appointment',body)
                const response = schedule_appointment.date
                console.log(schedule_appointment)
                if(schedule_appointment.data.signal){
					const mailData = {
						patient:`${localStorage.getItem("fname")} ${localStorage.getItem("lname")}`,
						sender :`${doctor.fname} ${doctor.lname}` ,
						location:`${contact_details.address}, ${contact_details.city}`,
						time:appointment.time,
						date:appointment.date,
						to:localStorage.getItem('email'),
						d_email:d_email
					}
					console.log(mailData)
					const mailuri = 'http://localhost:5000/sendmail/aptBooked'
					const response_mail = await axios.post(mailuri,mailData)
					console.log(response_mail)
					seterror("")
                    setsuccess(schedule_appointment.data.message)
                    setTimeout( 1000, window.location.reload())
                    
                }else{
                    seterror(schedule_appointment.data.message)
                }
                
            }
        }

       
}



useEffect(() => {
  loadDoctor()
}, [])
  return (
    <div>
        <Header />
        <div class="breadcrumb-bar">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-12 col-12">							
							<h2 class="breadcrumb-title">{pageState}</h2>
						</div>
					</div>
				</div>
		</div>

        <div class="content" id="booking-section">
           
				<div class="container">
				
					<div class="row">
						<div class="col-12">
						
							<div class="card">
								<div class="card-body">
									<div class="booking-doc-info">
										<a href="#" class="booking-doc-img">
											<img src={`http://localhost:5000/${doctor.imageUrl}`} alt="User Image"/>
										</a>
										<div class="booking-info">
											<h4><a href="#">Dr. {doctor.fname} {doctor.lname}</a></h4>
											
											<p class="text-muted mb-0"><i class="fas fa-map-marker-alt"></i> {contact_details.city}, {contact_details.state}</p>
										</div>
									</div>
								</div>
							</div>
                            <div>
                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Group controlId="dob">
                                        <Form.Label>Select Date</Form.Label>
                                        <Form.Control type="date" name="date" onChange={handleInputChange} placeholder="Date of Birth" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group controlId="dob">
                                        <Form.Label>Select Time between {doctor.duration}</Form.Label>
                                        <Form.Control type="time" name="time" onChange={handleInputChange} max={`${duration[1]}:00`} min={`${duration[0]}:00`} placeholder="Date of Birth" />
                                    </Form.Group>
                                </div>

                                {/*<div className="col-md-4 ">
                                    <Form.Group className="" controlId="dob">
                                        <Form.Label>Select Time</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                        <option>Select Time between {doctor.duration}</option>
                                        <option value="1">5 pm</option>
                                        <option value="2">5.30 pm</option>
                                        <option value="3">6 pm</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>*/}
                                <div class="col-md-4 p-4 submit-section proceed-btn text-right">
								<a href="#"onClick={submitData} class="btn btn-primary submit-btn">Proceed to Pay</a>
							</div>
                            </div>
                            </div>
							
					
							
							
						
							
						</div>
					</div>
				</div>

			</div>		
            {/*------------------------------------------- */}
            <div class="content d-none" id="payment-section">
           
				<div class="container">
                    
                <a href="#" class="btn btn-outline-success mb-3" onClick={changeState}>go back to Schedule Appointment</a>
					<div class="row">
						<div class="col-md-7 col-lg-8">
							<div class="card">
								<div class="card-body">
								
							
									<form action="" onSubmit={(e)=>e.preventDefault()}>
									
										<div class="info-widget">
											<h4 class="card-title">Personal Information</h4>
											<div class="row">
												<div class="col-md-6 col-sm-12">
													<div class="form-group card-label">
														<label>First Name</label>
														<input class="form-control" type="text" value={localStorage.getItem('fname')}/>
													</div>
												</div>
												<div class="col-md-6 col-sm-12">
													<div class="form-group card-label">
														<label>Last Name</label>
														<input class="form-control" type="text" value={localStorage.getItem('lname')}/>
													</div>
												</div>
												<div class="col-md-6 col-sm-12">
													<div class="form-group card-label">
														<label>Email</label>
														<input class="form-control" type="email" value={localStorage.getItem('email')}/>
													</div>
												</div>
												<div class="col-md-6 col-sm-12">
													<div class="form-group card-label">
														<label>Phone</label>
														<input class="form-control" type="text" value={localStorage.getItem('contact')}/>
													</div>
												</div>
											</div>
											<div class="exist-customer">Existing Customer? <a href="#">Click here to login</a></div>
										</div>
										
										<div class="payment-widget">
											<h4 class="card-title">Payment Method</h4>
											
											
											<div class="payment-list">
												<label class="payment-radio credit-card-option">
													<input type="radio" name="radio" checked/>
													<span class="checkmark"></span>
													Credit card
												</label>
												<div class="row">
													<div class="col-md-6">
														<div class="form-group card-label">
															<label for="card_name">Name on Card</label>
															<input class="form-control" id="card_name" type="text" placeholder="VIVEK KALAMBE"/>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group card-label">
															<label for="card_number">Card Number</label>
															<input class="form-control" id="card_number" placeholder="xxxx  xxxx  xxxx  xxxx" type="text"/>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group card-label">
															<label for="expiry_month">Expiry Month</label>
															<input class="form-control" id="expiry_month" placeholder="MM" type="text"/>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group card-label">
															<label for="expiry_year">Expiry Year</label>
															<input class="form-control" id="expiry_year" placeholder="YY" type="text"/>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group card-label">
															<label for="cvv">CVV</label>
															<input class="form-control" id="cvv" type="text" placeholder="xxx"/>
														</div>
													</div>
												</div>
											</div>
										
											<div class="payment-list">
												<label class="payment-radio paypal-option">
													<input type="radio" name="radio"/>
													<span class="checkmark"></span>
													Paypal
												</label>
											</div>
											
											<div class="terms-accept mb-2">
												<div class="custom-checkbox">
												   <input type="checkbox" id="terms_accept"/>
												   <label for="terms_accept">I have read and accept <a href="#">Terms &amp; Conditions</a></label>
												</div>
											</div>
											{error !=="" ? <Alert variant="danger">{error}</Alert>:""}
                                           {success !=="" ? <Alert variant="success">{success}</Alert>:""}
											<div class="submit-section mt-4">
												<button type="submit" class="btn btn-primary submit-btn" onClick={Book_Appointment}>Confirm and Pay</button>
											</div>
											
											
										</div>
									</form>
																
								</div>
							</div>							
						</div>						
						<div class="col-md-5 col-lg-4 theiaStickySidebar">						
							
							<div class="card booking-card">
								<div class="card-header">
									<h4 class="card-title">Booking Summary</h4>
								</div>
								<div class="card-body">
								
									<div class="booking-doc-info">
										<a href="doctor-profile.html" class="booking-doc-img">
											<img src={`http://localhost:5000/${doctor.imageUrl}`} alt="User Image"/>
										</a>
										<div class="booking-info">
											<h4><a href="#" className='text-decoration-none text-dark'>Dr. {doctor.fname} {doctor.lname}</a></h4>
											
											<div class="clinic-details">
												<p class="doc-location"><i class="fas fa-map-marker-alt"></i> {contact_details.city}, {contact_details.state}</p>
											</div>
										</div>
									</div>
									
									<div class="booking-summary">
										<div class="booking-item-wrap">
											<ul class="booking-date">
												<li>Date <span>{appointment.date}</span></li>
												<li>Time <span>{appointment.time}</span></li>
											</ul>
											<ul class="booking-fee">												
												<li>Booking Fee <span>{doctor.fees}</span></li>												
											</ul>
											<div class="booking-total">
												<ul class="booking-total-list">
													<li>
														<span>Total</span>
														<span class="total-cost">{doctor.fees}</span>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
							
						</div>
					</div>

				</div>

			</div>

        <Footer />
    </div>
  )
}
