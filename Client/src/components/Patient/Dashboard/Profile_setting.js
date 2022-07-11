import React,{useState,useEffect} from 'react'
import patient1 from '../../../assets/img/patients/patient1.jpg'
import axios from 'axios'
import { Alert } from 'react-bootstrap'
export default function Profile_setting(props) {

    const initialState = {
        fname:props.details.fname,
        lname:props.details.lname,
        dob:props.details.dob,
        email:props.details.email,
        blood_group:props.details.blood_group,
        contact:props.details.contact,
        address:props.details.address,
        city:props.details.city,
        state:props.details.state,
        zipcode:props.details.zipcode,
        country:props.details.country,
        imageUrl:props.image
    }
    
    
    const [user, setuser] = useState(initialState)
    const [Image, setImage] = useState(null)
    const [error, seterror] = useState("")
    const [image, setimage] = useState(props.image)
    console.log(initialState)
    const handleInputChange = (e) =>{
        const {name,value} = e.target
        setuser({...user,[name]:value})
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

        const imgUrl = URL.createObjectURL(e.target.files[0])
        setImage(imgUrl)
        console.log(imgUrl)
        axios.post("http://localhost:5000/imageUpload/uploadmulter",imageFormObj)
        .then((data)=>{
            
            console.log(data.data.document.imageData)
            user.imageUrl = data.data.document.imageData
            
            if(data.data.sucess){
                console.log("image uploaded")
            }
        })
        .catch((err)=>{
            console.log(`error occurered ${err}`)
        })

    }
    const updateData = async() =>{
        var allow = true
        for(let key in user){
            console.log(key)
            console.log(user[key])
            if(user[key] === ""){
                allow = false
                break
            }
        }
        console.log(allow)
        if(allow){
            const uri = 'http://localhost:5000/patients/update'
            try{
                const updateResponse = await axios.post(uri,user,{
                    headers:{
                        'x-auth-token':localStorage.getItem('token')
                    }
                })
                console.log(updateResponse)
                console.log(updateResponse.data)
                window.location.reload();
            }catch(err){
                seterror(`Error Occured ${err}`)
                console.log(`${err}`)
            }
            
            
        }
        else{
            seterror("Please Fill all the data.")
        }
    }
    useEffect(() => {
      setImage(props.image)
      setuser(props.details)
    }, [props.image])
    
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
													<label>First Name<span>*</span></label>
													<input type="text" class="form-control" name="fname" onChange={handleInputChange} value={user.fname} placeholder="Enter your first name here" required />
												</div>
											</div>
											<div class="col-12 col-md-6">
												<div class="form-group">
													<label>Last Name<span>*</span></label>
													<input type="text" class="form-control" name="lname" onChange={handleInputChange} value={user.lname} placeholder="Enter your last name here" required />
												</div>
											</div>
											<div class="col-12 col-md-6">
												<div class="form-group">
													<label>Date of Birth<span >*</span></label>
													<div class="cal-icon">
														<input type="text" class="form-control datetimepicker" onChange={handleInputChange} name="dob" value={user.dob} placeholder="DD/MM/YYYY" required />
													</div>
												</div>
											</div>
											<div class="col-12 col-md-6">
												<div class="form-group">
													<label>Blood Group</label>
													<select class="form-control select" onChange={handleInputChange} name="blood_group">
														<option>Select Blood Group</option>
														<option value="A-">A-</option>
														<option value="A+">A+</option>
														<option value="B-">B-</option>
														<option value="B+">B+</option>
														<option value="AB-">AB-</option>
														<option value="AB+">AB+</option>
														<option value="O-">O-</option>
														<option value="O+">O+</option>
													</select>
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
										<div class="submit-section">
											<button type="submit" class="btn btn-primary submit-btn" onClick={updateData}>Save Changes</button>
										</div>
									</form>
									
									
								
							</div>
						</div>
    </>
  )
}
