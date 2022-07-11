import React,{useState,useEffect} from 'react'
import patient1 from '../../../assets/img/patients/patient1.jpg'
import axios from 'axios'
import { Alert } from 'react-bootstrap'
export default function ProfileSetting(props) {

    const initialState = {
        name:props.details.name,
        email:props.details.email,
        contact:props.details.contact,
        address:props.details.address,
        city:props.details.city,
        state:props.details.state,
        zipcode:props.details.zipcode,
        country:props.details.country,
       
        services:props.services
    }
    
    //const initialState = {}
    const service = {
        test:"",
        cost:""
    }
    const [user, setuser] = useState(initialState)
    const [Image, setImage] = useState(null)
    const [error, seterror] = useState("")
    const [test, settest] = useState(service)
    const [services, setservices] = useState([])
    const [imageForm, setimageForm] = useState(null)
    console.log(user)
    const handleInputChange = (e) =>{
        const {name,value} = e.target
        setuser({...user,[name]:value})
        seterror("")
    }
    const handleServiceInput = (e) =>{
        const {name,value} = e.target
        settest({...test,[name]:value})
        seterror("")
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
    }
    if(Image !== null){
        console.log(Image)
    }

    const uploadImage = (e) =>{

        let imageFormObj = new FormData()
        imageFormObj.append("imageName","image-"+Date.now())
        imageFormObj.append('imageData',e.target.files[0])
        setimageForm(imageFormObj)
        const imgUrl = URL.createObjectURL(e.target.files[0])
        setImage(imgUrl)
        console.log(imgUrl)
       

    }
    const updateData = async() =>{
        console.log(user)
        var allow = true
        for(let key in user){
           
            if(user[key] === "" && key !== "imageUrl"){
                allow = false
                break
            }
        }
        console.log(allow)
        if(allow){
            if(services.length > 0){
                console.log(imageForm)
                console.log(user.imageUrl)
                try{
                    if(imageForm !== null && user.imageUrl === ""){
                        console.log(imageForm)
                        const res = await axios.post("http://localhost:5000/imageUpload/uploadmulter",imageForm)
                    console.log(res)
                    if(res.data.sucess){
                        const image = res.data.document.imageData
                        
                        const body = {
                            name:user.name,
                            email:user.email,
                            contact:user.contact,
                            address:user.address,
                            city:user.city,
                            state:user.state,
                            zipcode:user.zipcode,
                            country:user.country,
                            imageUrl:image,
                            services:services
                        }
                        console.log(body)
                        
                        const uri = 'http://localhost:5000/lab_appointment/update'

                        const updateResponse = await axios.post(uri,body,{
                            headers:{
                                'x-auth-token':localStorage.getItem('token')
                            }
                        })
                        console.log(updateResponse)
                        console.log(updateResponse.data)
                        window.location.reload();
                    }else{
                       console.log("Something Wrong happend")
                    }
                }
                    else if(imageForm === null && user.imageUrl !== ""){
                        console.log(user.imageUrl)
                        const body = {
                            name:user.name,
                            email:user.email,
                            contact:user.contact,
                            address:user.address,
                            city:user.city,
                            state:user.state,
                            zipcode:user.zipcode,
                            country:user.country,
                            imageUrl:user.imageUrl,
                            services:services
                        }
                        console.log(body)
                        
                        const uri = 'http://localhost:5000/lab_appointment/update'

                        const updateResponse = await axios.post(uri,body,{
                            headers:{
                                'x-auth-token':localStorage.getItem('token')
                            }
                        })
                        console.log(updateResponse)
                        console.log(updateResponse.data)
                        window.location.reload();
                    }
                    else{
                        console.log("Nothing")
                        seterror("Please Upload image also.")
                    }
                    
                    

                }catch(err){
                    seterror(`Error Occured ${err}`)
                console.log(`${err}`)
                }
            

            
        }else{
            seterror("Please Select Atleast one services.")
        }
    }
        else{
            seterror("Please Fill all the data.")
        }
    }

    const addData = () =>{
        if(test.test !== "" && test.cost !== ""){
            var ser = services
            ser.push(test)
            setservices(ser)
            settest(service)
        }
        console.log(user)
        console.log(services)
    }
    useEffect(() => {
      //setImage(props.image)
      setuser(props.details)
      console.log(props.services)
     
      setservices(props.services)
    }, [props])
    
  return (
    <>
    <div class="card">
								<div class="card-body">
									{error !== "" ? <Alert variant="danger">
                                            {error}
                                        </Alert> : ""}
									
									<form onSubmit={handleSubmit}>
										<div class="row form-row">
											<div class="col-12 col-md-12">
												<div class="form-group">
													<div class="change-avatar">
														<div class="profile-img">
															<img src={`http://localhost:5000/${user.imageUrl}`} alt="User Image"/>
														</div>
														<div class="upload-img">
															<div class="change-photo-btn">
																<span><i class="fa fa-upload"></i> Upload Photo</span>
																<input type="file" class="upload" onChange={(e)=> uploadImage(e)}/>
															</div>
															<small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
														</div>
													</div>
												</div>
											</div>
											<div class="col-12 col-md-6">
												<div class="form-group">
													<label>Name<span>*</span></label>
													<input type="text" class="form-control" name="name" onChange={handleInputChange} value={user.name} placeholder="Enter your first name here" required />
												</div>
											</div>
											
											
											<div class="col-12 col-md-6">
												<div class="form-group">
													<label>Email Id<span>*</span></label>
													<input type="email" class="form-control" name="email" onChange={handleInputChange} value={user.email} placeholder="Enter your email id" required />
												</div>
											</div>
											<div class="col-12 col-md-6">
												<div class="form-group">
													<label>Mobile No.<span>*</span></label>
													<input type="text" placeholder="Enter valid mobile number"  onChange={handleInputChange} name="contact" value={user.contact} class="form-control" required />
												</div>
											</div>
											<div class="col-12">
												<div class="form-group">
												<label>Address<span>*</span></label>
													<input type="text" class="form-control" name="address" onChange={handleInputChange} value={user.address} placeholder="Enter address" required />
												</div>
											</div>
											<div class="col-12 col-md-6">
												<div class="form-group">
													<label>City<span>*</span></label>
													<input type="text" class="form-control" name="city" onChange={handleInputChange} value={user.city} placeholder="Enter city"/>
												</div>
											</div>
											<div class="col-12 col-md-6">
												<div class="form-group">
													<label>State<span>*</span></label>
													<input type="text" class="form-control" name="state" onChange={handleInputChange} value={user.state} placeholder="Enter state"/>
												</div>
											</div>
											<div class="col-12 col-md-6">
												<div class="form-group">
													<label>Zip Code<span>*</span></label>
													<input type="text" class="form-control" name="zipcode" onChange={handleInputChange}value={user.zipcode} placeholder="Enter zip code"/>
												</div>
											</div>
											<div class="col-12 col-md-6">
												<div class="form-group">
													<label>Country</label>
													<input type="text" class="form-control" onChange={handleInputChange} name="country" value={user.country} placeholder="Enter Country name"/>
												</div>
											</div>
                                            
										</div>
                                        <div class="card">
							<div class="card-body">
								<h4 class="card-title">Test Services</h4>
								<div class="education-info">
									<div class="row form-row education-cont">
										<div class="col-12 col-md-10 col-lg-11">
                                        <div class="row form-row">
                                            
                                            {services !== undefined &&
                                                services.map((ele)=>{
                                                   return(
                                                    <>
                                                    <div class="col-12 col-md-6 ">
                                                    {ele.test}
                                                        </div>
                                                        <div class="col-12 col-md-6 ">
                                                            {ele.cost}
                                                        </div>
                                                        
                                                        </>
                                                   )
                                                })
                                                
                                                }
												
                                        </div>
                                        <hr></hr>
											<div class="row form-row">
												<div class="col-12 col-md-6 ">
													<div class="form-group">
														<label>Test</label>
                                                    
                                                        <select class="form-control select" onChange={handleServiceInput} value={test.test} name="test">
                                                            <option>Select Test Services</option>
                                                            <option value="Blood Test">Blood Test</option>
                                                            <option value="Covid Test">Covid Test</option>
                                                            <option value="Malaria Test">Malaria Test</option>
                                                            <option value="Dengue Test">Dengue Test</option>
                                                            <option value="Diabetes Test">Diabetes Test</option>
                                                            <option value="Kidney Test">Kidney Test</option>
                                                            <option value="Xrays">Xrays</option>
                                                            <option value="Other">Other</option>
                                                        </select>
												
													</div> 
												</div>
												<div class="col-12 col-md-6 ">
													<div class="form-group">
														<label>Cost</label>
														<input type="text" name="cost" placeholder='Please Enter Cost in form of India Currency eg. "1000" '  onChange={handleServiceInput} value={test.cost} class="form-control"/>
													</div> 
												</div>
												
											</div>
										</div>
									</div>
								</div>
								<div class="add-more">
									<a href="javascript:void(0);" onClick={addData} class="add-education"><i class="fa fa-plus-circle"></i> Add More</a>
								</div>
							</div>
						</div>
										<div class="submit-section">
											<button type="submit" onClick={updateData} class="btn btn-primary submit-btn" >Save Changes</button>
										</div>
									</form>
									
									
								
							</div>
						</div>
    </>
  )
}
