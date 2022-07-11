import React,{useState,useEffect} from 'react'
import '../../index.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const PrescriptionPage = () => {
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id

    const initialState = {
        name:"",
        quantity:"",
        days:"",
        morning:"",
        afternone:"",
        evening:"",
        night:""
    }

    const [Prescription , setPrescription ] = useState(initialState) 
    const [presArray, setpresArray] = useState([])
    const [patientInfo, setpatientInfo] = useState({})
    const [error, seterror] = useState("")
    const [success, setsuccess] = useState("")
    const [details, setdetails] = useState({})

    var date = new Date(Date.now()).getDate()
    var month = new Date(Date.now()).getMonth()+1
    var year = new Date(Date.now()).getFullYear()
    var today_date1 = `${date} / ${month} / ${year}`
    var dict = {
        "1":"January",
        "2":"February",
        "3":"March",
        "4":"April",
        "5":"May",
        "6":"June",
        "7":"July",
        "8":"August",
        "9":"September",
        "10":"October",
        "11":"November",
        "12":"December"
    }
    var today_date = `${dict[month]} ${date}  ${year}`
    const handleInputChange = (e) =>{
        const {name,value} = e.target
        setPrescription({...Prescription,[name]:value})
        seterror("")
       
    }
    const addPresc = () =>{
        console.log(Prescription)
        const body = {}
        body.name = Prescription.name
        body.quantity = Prescription.quantity
        body.days = Prescription.days
        var list = []
        if(Prescription.morning === "1"){
            list.push("Morning")
        }
        if(Prescription.afternoon === "1"){
            list.push("Afternoon")
        }
        if(Prescription.evening === "1"){
            list.push("Evening")
        }
        if(Prescription.night === "1"){
            list.push("Night")
        }
        body.time = list

        var array = presArray 
        array.push(body)
       setpresArray(array)
       setPrescription(initialState)
       document.getElementById("checkbox1").checked = false
       document.getElementById("checkbox2").checked = false
       document.getElementById("checkbox3").checked = false
       document.getElementById("checkbox4").checked = false
    }
    const getPatient = async() =>{
        const uri =  `http://localhost:5000/patients/getPatient/${id}`
        const response = await axios.get(uri)
        console.log(response.data.data)
        setpatientInfo(response.data.data)
        setdetails(response.data.data.details)
    }
    const SavedPrescription = async() =>{
        if(presArray.length !== 0){
            const data = {
                d_id:localStorage.getItem("userid"),
                d_name:`${localStorage.getItem("fname")} ${localStorage.getItem("lname")}`,
                p_name:`${details.fname} ${details.lname}`,
                d_image:localStorage.getItem('image'),
                p_image:details.imageUrl,
                p_id:patientInfo._id,
                date:today_date1,
                prescription_list:presArray
            }
            const uri = 'http://localhost:5000/prescription/'
            const response = await axios.post(uri,data)
            console.log(response)
            seterror("")
            setsuccess("data Saved")
            setTimeout(() => {
               window.location.reload() 
            }, 1000);
            
        }else{
            seterror("Prescription are empty!!")
        }
        

    }
  useEffect(() => {
    getPatient()
  }, [])
  
  return (
    <div>
        <div class="breadcrumb-bar">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-12 col-12">
							<nav aria-label="breadcrumb" class="page-breadcrumb">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="/">Home</a></li>
									<li class="breadcrumb-item active" aria-current="page">Edit Prescription</li>
								</ol>
							</nav>
							<h2 class="breadcrumb-title">Add Prescription</h2>
						</div>
					</div>
				</div>
			</div>
            <div class="content">
				<div class="container-fluid">

					<div class="row">
						<div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
						
							
							<div class="card widget-profile pat-widget-profile">
								<div class="card-body">
									<div class="pro-widget-content">
										<div class="profile-info-widget">
											<a href="#" class="booking-doc-img">
												<img src={`http://localhost:5000/${details.imageUrl}`} alt="User Image"/>
											</a>
											<div class="profile-det-info">
												<h3><a href="patient-profile.html">{details.fname} {details.lname}</a></h3>
												<div class="patient-details">
													<h5><b>Patient ID :</b> {patientInfo._id}</h5>
													<h5 class="mb-0"><i class="fas fa-map-marker-alt"></i> {details.city}, {details.state}</h5>
												</div>
											</div>
										</div>
									</div>
									<div class="patient-info">
										<ul>
											<li>Phone <span>{details.contact}</span></li>
											<li>Age <span>38 Years, Male</span></li>
											<li>Blood Group <span>{details.blood_group}</span></li>
										</ul>
									</div>
								</div>
							</div>
					
							
						</div>
        <div class="col-md-7 col-lg-8 col-xl-9">
                <div class="card">
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
								<div class="card-header">
									<h4 class="card-title mb-0">Prescription</h4>
								</div>
								<div class="card-body">
									<div class="row">
										<div class="col-sm-6">
											<div class="biller-info">
												<h4 class="d-block">Dr. {localStorage.getItem("fname")} {localStorage.getItem("lname")}</h4>
						
												<span class="d-block text-sm text-muted">{localStorage.getItem('city')},{localStorage.getItem('state')}</span>
											</div>
										</div>
										<div class="col-sm-6 text-sm-right">
											<div class="billing-info">
												<h4 class="d-block">{today_date}</h4>
											</div>
										</div>
									</div>
                                    
                                    <div class="card card-table">
										<div class="card-body">
											<div class="table-responsive">
												<table class="table table-hover table-center">
												<thead>
													<tr>
														<th style={{width: "200px"}}>Name</th>
														<th style={{width: "100px"}}>Quantity</th>
														<th style={{width: "100px"}}>Days</th>
														<th style={{width: "100px;"}}>Time</th>
														<th style={{width: "80px;"}}></th>
													</tr>
												</thead>
												<tbody>
                                                {
                                            presArray !== [] ? (
                                                presArray.map(ele =>{
                                                    const {name,quantity,days,time} = ele
                                                    return(
                                                        <>
                                                        <tr>
                                                        <td >{name}</td>
                                                        <td>{quantity} </td>
                                                        <td >{days}</td>
                                                        <td >{time}</td>
                                                        </tr>
                                                        </>
                                                    )
                                                })
                                            ):""
                                        }
                                                </tbody>
                                                </table>
                                                </div>
                                                </div>
                                                </div>
								
									<div class="add-more-item text-right">
										<a href="#" onClick={addPresc}><i class="fa fa-plus-circle"></i> Add More</a>
									</div>
								
									<div class="card card-table">
										<div class="card-body">
											<div class="table-responsive">
												<table class="table table-hover table-center">
												<thead>
													<tr>
														<th style={{width: "200px"}}>Name</th>
														<th style={{width: "100px"}}>Quantity</th>
														<th style={{width: "100px"}}>Days</th>
														<th style={{width: "100px;"}}>Time</th>
														<th style={{width: "80px;"}}></th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															<input class="form-control" onChange={handleInputChange} name="name" value={Prescription.name} type="text"/>
														</td>
														<td>
															<input class="form-control" onChange={handleInputChange} name="quantity" type="text" value={Prescription.quantity}/>
														</td>
														<td>
															<input class="form-control" onChange={handleInputChange} name="days" value={Prescription.days} type="text"/>
														</td>
														<td>
															<div class="form-check form-check-inline">
																<label class="form-check-label">
																	<input class="form-check-input" onChange={handleInputChange}  name="morning" id="checkbox1" value="1" type="checkbox"/> Morning
																</label>
															</div>
															<div class="form-check form-check-inline">
																<label class="form-check-label">
																	<input class="form-check-input" onChange={handleInputChange} name="afternoon" id="checkbox2" value="1" type="checkbox"/> Afternoon
																</label>
															</div>
															<div class="form-check form-check-inline">
																<label class="form-check-label">
																	<input class="form-check-input" onChange={handleInputChange} name="evening" id="checkbox3" value="1" type="checkbox"/> Evening
																</label>
															</div>
															<div class="form-check form-check-inline">
																<label class="form-check-label">
																	<input class="form-check-input" onChange={handleInputChange} name="night" id="checkbox4"  value="1" type="checkbox"/> Night
																</label>
															</div>
														</td>
														<td>
															<a href="#" class="btn bg-danger-light trash"><i class="far fa-trash-alt"></i></a>
														</td>
													</tr>
													
												</tbody>
												</table>
											</div>
										</div>
									</div>
								
									
									
									<div class="row">
										<div class="col-md-12">
											<div class="submit-section">
												<button type="submit" onClick={SavedPrescription} class="btn btn-primary submit-btn">Save</button>
												<button type="reset" class="btn btn-secondary submit-btn">Clear</button>
											</div>
										</div>
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

export default PrescriptionPage