import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import logo from '../../../assets/img/logo.png'
 

const Details = () => {
    const params = useParams()
    const id = params.id
    const [labapp, setlabapp] = useState({})
    const [pdfData, setpdfData] = useState(null)
    const loadData = async(id) =>{

        const uri = `http://localhost:5000/lab_appointment/getAppointment/${id}`
        const res = await axios.get(uri)
        console.log(res.data.data)
        setlabapp(res.data.data)
    }

    const uploadPdf = (e) =>{
        let pdfFormObj = new FormData()
        pdfFormObj.append("pdfName","image-"+Date.now())
        pdfFormObj.append('pdfData',e.target.files[0])
        console.log(e.target.files[0])
        setpdfData(pdfFormObj)
    }
    const savedata = async() =>{
        const uri = 'http://localhost:5000/pdfupload/pdf'
        if(pdfData !== null){
            console.log(pdfData)
            const response = await axios.post(uri,pdfData)
            console.log(response.data.document.pdfData)

            const uri2 = "http://localhost:5000/lab_appointment/updateStatus"
            const body = {
                lab_id:params.id,
                file:response.data.document.pdfData
            }
            const res = await axios.post(uri2,body)
            console.log(res)
            window.location.reload()
        }
    }
    
    
    useEffect(() => {
      loadData(id)
    }, [id])
    
  return (
    <div>
        <div class="breadcrumb-bar">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-12 col-12">							
							<h2 class="breadcrumb-title">Lab Appoinments Details</h2>
						</div>
					</div>
				</div>
			</div>

            <div class="content">
				<div class="container-fluid">

					<div class="row">
						<div class="col-lg-8 offset-lg-2">
							<div class="invoice-content">
								<div class="invoice-item">
									<div class="row">
										<div class="col-md-6">
											<div class="invoice-logo">
												<img src={logo} alt="logo"/>
											</div>
										</div>
										<div class="col-md-6">
											<p class="invoice-details">
												<strong>Order:  {labapp._id}</strong>  <br/>
												<strong>Issued: {labapp.date}</strong> 
											</p>
										</div>
									</div>
								</div>
								
								<div  class="invoice-item">
                                    <div class="row">
                                        <div className='col-lg-6'>
                                            <h6>Name : {labapp.name}</h6>
                                            <h6>Email: {labapp.email}</h6>
                                            <h6>Phone: {labapp.contact}</h6>
                                            <h6>Test : {labapp.test}</h6>
                                            <h6>Payment : {labapp.cost}</h6>
                                            <h6>Result : {labapp.reportFile === null ? "Not Uploaded":<a href={`http://localhost:5000/${labapp.reportFile}`}>View</a>}</h6>
                                        </div>
                                        {labapp.reportFile === null && <div className='col-lg-6'>
                                            <form onSubmit={(e) => e.preventDefault()}>
                                                <h5>Upload Report File</h5>
                                                <input type="file" accept='.pdf' onChange={(e) => uploadPdf(e)}></input>
                                                <button onClick={savedata}  className='btn btn-primary '>Upload</button>
                                            </form>
                                           
                                        </div>}
                                    </div>
                                </div>
								{/*<div class="invoice-item">
									<div class="row">
										<div class="col-md-6 ">
											<div class="invoice-info">
												<strong class="customer-text">Prescriptions From</strong>
												<p class=" invoice-details-two">
													Dr.fname lname <br/>
													address, city,<br/>
													state, country <br/>
												</p>
											</div>
										</div>
										<div class="col-md-6">
											<div class="invoice-info invoice-info2">
												<strong class="customer-text">Prescriptions To</strong>
												<p class=" invoice-details">
													Dr.fname lname <br/>
													address, city,<br/>
													state, country <br/>
												</p>
											</div>
										</div>
									</div>
								</div>
  */}
								
								
								
								
								
							</div>
						</div>
					</div>

				</div>

			</div>	
    </div>
  )
}

export default Details