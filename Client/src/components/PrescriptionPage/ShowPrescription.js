import React,{useState,useEffect} from 'react'
import logo from '../../assets/img/logo.png'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Pdf from "react-to-pdf";

const ref = React.createRef();
const ShowPrescription = () => {
    const params = useParams()
    const id = params.id

    const [prescription, setprescription] = useState({})
    const [doctor, setdoctor] = useState({})
    const [patient, setpatient] = useState({})
    const [d_contact, setd_contact] = useState({})
    const [list, setlist] = useState([])
    const loadPrescData = async() =>{
        const uri = `http://localhost:5000/prescription/${id}`
        const res = await axios.get(uri)
        console.log(res.data.data)
        setprescription(res.data.data)
        setlist(res.data.data.prescription_list)
        getDoctor(res.data.data.d_id)
        getPatient(res.data.data.p_id)
    }
    const getDoctor = async(id) =>{
        const uri1 = `http://localhost:5000/doctor/getDoctor/${id}`
        const res = await axios.get(uri1)
        console.log(res.data.data)
        setdoctor(res.data.data.details)
        setd_contact(res.data.data.contact_details)
    }
	
    const getPatient = async(id) =>{
        const uri1 = `http://localhost:5000/patients/getPatient/${id}`
        const res = await axios.get(uri1)
        console.log(res)
        setpatient(res.data.data.details)
    }
    useEffect(() => {
        loadPrescData()
    }, [])
    
  return (
	<>
	

    <div >
		
        <div class="breadcrumb-bar" >
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-11 col-12">							
							<h2 class="breadcrumb-title">Prescription View</h2>
						</div>
						<div className='col-md-1'>
						<Pdf targetRef={ref} filename="prescription.pdf">
	            	{({ toPdf }) => <button onClick={toPdf}>Download</button>}
		             </Pdf>
						</div>
					</div>
				</div>
			</div>
			
            <div class="content">
				
				<div class="container-fluid">

					<div class="row">
						<div class="col-lg-8 offset-lg-2 " >
							<div id="invoice-content"  class="invoice-content" ref={ref} >
								<div className=''>
								<div class="invoice-item" >
									<div class="row">
										<div class="col-md-4">
											<div class="invoice-logo">
												<img src={logo} alt="logo"/>
											</div>
										</div>
										<div class="col-md-4">
											<p class="invoice-details">
												<strong>Order:</strong> {prescription._id} <br/>
												<strong>Issued:</strong> {prescription.date}
											</p>
										</div>
									</div>
								</div>
								
								
								<div class="invoice-item">
									<div class="row">
										<div class="col-md-12">
											<div class="invoice-info">
												<strong class="customer-text">Prescriptions From</strong>
												<p class=" invoice-details-two">
													Dr.{doctor.fname} {doctor.lname} <br/>
													{d_contact.address}, {d_contact.city},<br/>
													{d_contact.state}, {d_contact.country} <br/>
												</p>
											</div>
										</div>
										<div class="col-md-12">
											<div class="invoice-info ">
												<strong class="customer-text">Prescriptions To</strong>
												<p class="invoice-details-two">
													{patient.fname} {patient.lname} <br/>
													{patient.address}, {patient.city}<br/>
													{patient.state}, {patient.country} <br/>
												</p>
											</div>
										</div>
									</div>
								</div>
							
								
								
								<div class="invoice-item invoice-table-wrap">
									<div class="row">
										<div class="col-md-10">
											<div class="table-responsive">
												<table class="invoice-table table table-bordered">
													<thead>
														<tr>
															<th>Med Name</th>
															<th class="text-center">Quantity</th>
															<th class="text-center">Days</th>
															<th class="text-right">Time to take</th>
														</tr>
													</thead>
													<tbody>
                                                        {list.length > 0 &&
                                                            prescription.prescription_list.map((ele)=>{
                                                                const {name,quantity,days,time} = ele
                                                                return(
                                                                    <>
                                                                    <tr>
															<td>{name}</td>
															<td class="text-center">{quantity}</td>
															<td class="text-center">{days}</td>
															<td class="text-right">
                                                                {time.map(e=>{
                                                                    return(<>{e},</>)
                                                                })
                                                                 }</td>
														</tr>
                                                                    </>
                                                                )
                                                            })
                                                        }
														
									
													</tbody>
												</table>
											</div>
										</div>
										<div class="col-md-10 other-info">
									<h4>Other information</h4>
									<p class="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipiscNullam finibus pellentesque libero.</p>
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
	</>
  )
}

export default ShowPrescription