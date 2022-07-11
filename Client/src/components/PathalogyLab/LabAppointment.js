import React,{useState,useEffect} from 'react'
import Header from '../headers/Header'
import Footer from '../footers/Footer'
import Breadcrum from '../headers/Breadcrum'
import '../../index.css'
import Cards from './Cards'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Alert } from 'react-bootstrap'



const LabAppointment = () => {
	const params = useParams()
    const id = params.id
	
	const initialState = {
		lab_name:"",
		lab_image:"",
		lab_id:id,
		user_id : localStorage.getItem("userid"),
		name:`${localStorage.getItem('fname')} ${localStorage.getItem('lname')}`,
		contact:localStorage.getItem('contact'),
		address:localStorage.getItem('address'),
		email:localStorage.getItem('email'),
		test:"",
		datetime:"",
		app_type:""
	}
	
	const [Appointment, setAppointment] = useState(initialState)
	const [error, seterror] = useState("")
	const [success, setsuccess] = useState("")

	const [lab, setlab] = useState({})
    const [services, setservices] = useState([])
    const [details, setdetails] = useState({})
    const loadData = async(id) =>{
        const uri = `http://localhost:5000/lab_appointment/lab/${id}`
        const res = await axios.get(uri)
        console.log(res.data.lab)
        setlab(res.data.lab)

        setservices(res.data.lab.services)
        setdetails(res.data.lab.details)
		console.log()
		setAppointment({...Appointment,["lab_name"]:res.data.lab.details.name})
		setAppointment({...Appointment,["lab_image"]:res.data.lab.details.imageUrl})
    }
    useEffect(() => {
        loadData(id)
		
    }, [id])

	const handleAppointmentInput = (e) =>{
		const {name,value} = e.target
		setAppointment({...Appointment,[name]:value})
		seterror("")
	}
	const handleAppointmentServiceInput = (e) =>{
		const {name,value} = e.target
		
		services.map(ele=>{
			if(ele.test === Appointment.test){
				
				Appointment.cost = ele.cost
				
			}
		})
		setAppointment({...Appointment,[name]:value})
		console.log(Appointment)
		
		
		seterror("")
	}
	const saveData = async() =>{
		
		Appointment.lab_name = details.name
		console.log(Appointment)
		var allow = true
		for(var key in Appointment){
			if(Appointment[key] === ""){
				allow = false
				break
			}
		}
		if(allow){

		
		const uri = 'http://localhost:5000/lab_appointment/'
		const res = await axios.post(uri,Appointment)
		console.log(res.data.message)
		const mail_body = {
			lab:details.name,
			patient:`${localStorage.getItem("fname")} ${localStorage.getItem("lname")}`,
			p_email:`${localStorage.getItem("email")}`,
			l_email:lab.email,
			date_time:Appointment.datetime,
			app_type:Appointment.app_type,
			location:Appointment.address
		}
		const mailRes = await axios.post("http://localhost:5000/sendmail/aptLabBooked",mail_body)
		console.log(mailRes)
		seterror("")
		setsuccess(res.data.message)
		setAppointment(initialState)
	}else{
		setsuccess("")
		seterror("Please Fill all details")
	}

	}

  return (
    <div>
        <Header />
        <Breadcrum name={`${details.name} Lab Appointment`}/>
		{error && <Alert variant="danger">{error}</Alert>}
		{success && <Alert variant='success'>{success}</Alert>}
		<div class="card contact-card">
								<div class="card-body">
									<h4 class="card-title">Book Lab Appointment</h4>
									<div class="row form-row">
									<div class="col-md-6">
											<div class="form-group">
												<label>Lab Name</label>
												
												<input type="text" name="lab_name" disabled onChange={handleAppointmentInput} value={details.name} class="form-control"/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label>Full Name</label>
												<input type="text" name="name" disabled onChange={handleAppointmentInput} value={Appointment.name} class="form-control"/>
											</div>
										</div>										
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">Email</label>
												<input type="text" name="email" disabled onChange={handleAppointmentInput} value={Appointment.email} class="form-control"/>
											</div>
										</div>

										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">Phone Number</label>
												<input type="text" name="contact"  disabled onChange={handleAppointmentInput} value={Appointment.contact} class="form-control"/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">Address</label>
												<input type="text" name="address" disabled onChange={handleAppointmentInput} value={Appointment.address} class="form-control"/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">Test</label>
												<select class="form-control select" onChange={handleAppointmentInput} value={Appointment.test} name="test">
														<option>Select Test Service</option>
														{
															services.length > 0 && 
															services.map(ele =>{
																return(
																	<option value={`${ele.test}-${ele.cost}`}>{ele.test}</option>
																)
															})
														}
														
														
													</select>
											</div>
										</div>
										
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">Date Time</label>
												<input type="datetime-local" name="datetime" onChange={handleAppointmentInput} value={Appointment.datetime} class="form-control"/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">Appointment Type</label>
												<select name="app_type" class="form-control select" onChange={handleAppointmentInput} value={Appointment.app_type} >
													<option>Select</option>
													<option value="0">Lab</option>
													<option value="1">Home</option>
												</select>
											</div>
										</div>
										<div class="submit-section">
											<button type="submit" class="btn btn-primary submit-btn" onClick={saveData}>Save Changes</button>
										</div>
									</div>
								</div>
							</div>
        <Footer />
    </div>
  )
}

export default LabAppointment