import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Alert } from 'react-bootstrap'

export default function Profile_setting(props) {
    
    const details = {
        username:"",
        fname:"",
        lname:"",
        email:"",
        contact:"",
        gender:"",
        dob:"",
        about_me:"",
        imageUrl:"",
		fees:"",
		duration:"",
		

    }
    const medical_registration = {
        reg_council : "",
        reg_number:0,
        reg_year:""

    }
    const education_obj = {
        degree:"",
        college:"",
        year:""
    }
    const experience_obj = {
        hospital_name:"",
        from:"",
        to:"",
        designation:""
    }
    const clinic_info = {
        clinic_name:"",
        clinic_address:"",
        
    }
    const service = []
    const specialization = []
    const contact_details = {
        address:"",
        city:"",
        state:"",
        country:"",
        pincode:""
    }

    const initialState = {
        details:details,
        contact_details:contact_details,
        experience:[],
        clinic_info:clinic_info,
        service:service,
        specialization:specialization,
        medical_registration:medical_registration,
        education:[]
    }

 
    const [user_info, setuser_info] = useState(initialState)
    const [UserDetails, setUserDetails] = useState(details)
    const [UserContact, setUserContact] = useState(contact_details)
    const [UserClinic, setUserClinic] = useState(clinic_info)
    const [Medical, setMedical] = useState(medical_registration)
    const [experience, setexperience] = useState(experience_obj)
    const [education, seteducation] = useState(education_obj)
    const [edu, setedu] = useState([])
    const [exp, setexp] = useState([])
    const [imageObj, setimageObj] = useState(null)
    const [imageUrl, setimageUrl] = useState("")
    const [error, seterror] = useState("")
    const [sucess, setsucess] = useState("")


    const [specialize, setspecialize] = useState("")
    const [services, setservices] = useState("")
    const handleDetailsInput = (e) =>{
        const {name,value} = e.target
        setUserDetails({...UserDetails,[name]:value})  
    }
    function refreshPage() {
        window.location.reload();
      }
    const handleContactInput = (e) =>{
        const {name,value} = e.target
        setUserContact({...UserContact,[name]:value})  
    }
    const handleClinicInput = (e) =>{
        const {name,value} = e.target
        setUserClinic({...UserClinic,[name]:value})  
    }
    const handleMedicalInput = (e) =>{
        const {name,value} = e.target
        setMedical({...Medical,[name]:value})  
    }
    const handleEducationInput = (e) =>{
        const {name,value} = e.target
        seteducation({...education,[name]:value})  
    }
    const handleExperienceInput = (e) =>{
        const {name,value} = e.target
        setexperience({...experience,[name]:value})  
    }
    const addEdu = () =>{
        if(education.college !== "" && education.year !=="" && education.degree!==""){
            var a = edu
            a.push(education)
            setedu(a)
            seteducation(education_obj)
            console.log(edu)
        }
        else{
            console.log("Please add complete details.")
        }
    }
    const addExp = () =>{
        if(experience.designation!=="" && experience.from !== "" && experience.to !=="" && experience.hospital_name !==""){
           var a = exp
           a.push(experience)
           setexp(a)
          setexperience(experience_obj)
          console.log(exp)
        }
        else{
            console.log("Please add complete details.")
        }
    }
    const uploadImage = (e) =>{

        let imageFormObj = new FormData()
        imageFormObj.append("imageName","image-"+Date.now())
        imageFormObj.append('imageData',e.target.files[0])

        const imgUrl = URL.createObjectURL(e.target.files[0])
        
        console.log(imgUrl)
        setimageObj(imageFormObj)
        

    }
	const ImageUpload = () =>{
		
    
	}
    const updateChanges = async() =>{
        
		var imageName = ""
        if(imageObj !== null){
         await axios.post("http://localhost:5000/imageUpload/uploadmulter",imageObj)
        .then((data)=>{
            
            console.log(data.data.document.imageData)
            setUserDetails({...UserDetails,["imageUrl"]:data.data.document.imageData})
            imageName =  data.data.document.imageData
			if(data.data.sucess){
                console.log("image uploaded")
				
            }
			  
            
        })
        .catch((err)=>{
            console.log(`error occurered ${err}`)
        })
		

	}else{
		if(UserDetails.imageUrl !== ""){
			imageName = UserDetails.imageUrl
		}
		else{
			seterror("Image Not Uploaded")
		}
	}
		
        const detail_user = {
            username:UserDetails.username,
            fname:UserDetails.fname,
            lname:UserDetails.lname,
            email:UserDetails.email,
            contact:UserDetails.contact,
            gender:UserDetails.gender,
            dob:UserDetails.dob,
            about_me:UserDetails.about_me,
            imageUrl:imageName,
			fees:UserDetails.fees,
			duration:UserDetails.duration,
			
        }
       
        
        console.log(detail_user)
        const body = {
            details:detail_user,
            contact_details:UserContact,
            experience:exp,
            clinic_info:UserClinic,
            service:typeof(services) === "string" ? services.split(','):services,
            specialization:typeof(specialize) === "string" ? specialize.split(','):specialize,
            medical_registration:Medical,
            education:edu
        }

       const uri = 'http://localhost:5000/doctor/update'
       const token = localStorage.getItem('token')
       try{
        const response = await axios.post(uri,body,{
            headers:{
                'x-auth-token':token
            }
        })
        console.log(response.data.message)
        setsucess(response.data.message)
        setTimeout(refreshPage, 2000);

       }catch(err){
           console.log(`Error ${err}`)
       }
      
    
    
    }
    useEffect(() => {
      setUserDetails(props.details)
      setimageUrl(`http://localhost:5000/${props.details.imageUrl}`)
      setMedical(props.medical)
      setUserClinic(props.clinic)
      setUserContact(props.contact_details)
      setedu(props.education)
      setexp(props.experience)
      setservices(props.service)
      setspecialize(props.specialization)
    }, [props])
    
    
  return (
    <div>
						{/* <!-- Basic Information -->*/}
							
							<div class="card">
                            {error===""? "":<Alert variant="danger">
                                            {error}
                                        </Alert>}
                                        {sucess===""? "":<Alert variant="success">
                                            {sucess}
                                        </Alert>}
								<div class="card-body">
									<h4 class="card-title">Basic Information</h4>
									<div class="row form-row">
										<div class="col-md-12">
											<div class="form-group">
												<div class="change-avatar">
													<div class="profile-img">
														<img src={imageUrl} alt={imageUrl}/>
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
										<div class="col-md-6">
											<div class="form-group">
												<label>Username <span class="text-danger">*</span></label>
												<input type="text" name="username" onChange={handleDetailsInput} value={UserDetails.username} class="form-control"/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label>Email <span class="text-danger">*</span></label>
												<input type="email" name="email" onChange={handleDetailsInput} value={UserDetails.email} class="form-control"/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label>First Name <span class="text-danger">*</span></label>
												<input type="text" name="fname"onChange={handleDetailsInput} value={UserDetails.fname} class="form-control"/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label>Last Name <span class="text-danger">*</span></label>
												<input type="text" name="lname" onChange={handleDetailsInput} value={UserDetails.lname} class="form-control"/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label>Phone Number</label>
												<input type="text" name="contact"onChange={handleDetailsInput} value={UserDetails.contact} class="form-control"/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label>Gender</label>
												<select class="form-control select" name="gender" onChange={handleDetailsInput} value={UserDetails.gender}>
													<option >Select</option>
													<option value="male">Male</option>
													<option value="female">Female</option>
												</select>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group mb-0">
												<label>Date of Birth</label>
												<input type="text" name="dob" onChange={handleDetailsInput} value={UserDetails.dob} class="form-control"/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group mb-0">
												<label>Fees</label>
												<input type="text" name="fees" onChange={handleDetailsInput} value={UserDetails.fees} class="form-control"/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group mb-0">
												<label>Available Duration </label>
												<input type="text" name="duration" onChange={handleDetailsInput} value={UserDetails.duration} class="form-control"/>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* <!-- About Me --> */}
							
							<div class="card">
								<div class="card-body">
									<h4 class="card-title">About Me</h4>
									<div class="form-group mb-0">
										<label>Biography</label>
										<textarea class="form-control" name="about_me" onChange={handleDetailsInput} value={UserDetails.about_me} rows="5"></textarea>
									</div>
								</div>
							</div>
							{/* <!-- Registrations --> */}
                            
							
						<div class="card">
							<div class="card-body">
								<h4 class="card-title">Medical Registration<span class="text-danger">*</span></h4>
								<div class="registrations-info">
									<div class="row form-row reg-cont">
										<div class="col-12 col-md-5">
											<div class="form-group">
												<label>Registration Council</label>
												<select name="reg_council" class="form-control select" onChange={handleMedicalInput}  value={Medical.reg_council}>
													<option>Select</option>
													<option value="Andhra Pradesh Medical Council">Andhra Pradesh Medical Council</option>
													<option value="Arunachal Pradesh Medical Council">Arunachal Pradesh Medical Council</option>
													<option value="Assam Medical Council">Assam Medical Council</option>
													<option value="Goa Medical Council"> Goa Medical Council</option>
													<option value="Karnataka Medical Council"> Karnataka Medical Council</option>
													<option value="Kerala Medical Council">Kerala Medical Council</option>
													<option value="Maharashtra Medical Council">Maharashtra Medical Council</option>
													<option value="Punjab Medical Council">Punjab Medical Council</option>
													<option value="Rajasthan Medical Council">Rajasthan Medical Council</option>
												</select>
											</div> 
										</div>

										<div class="col-12 col-md-5">
											<div class="form-group">
												<label>Registration Number</label>
												<input type="number" name="reg_number" onChange={handleMedicalInput}  value={Medical.reg_number}  class="form-control"/>
											</div> 
										</div>

										<div class="col-12 col-md-5">
											<div class="form-group">
												<label>Registration Year</label>
												<select name="reg_year" class="form-control select" onChange={handleMedicalInput}  value={Medical.reg_year}>
													<option>Select</option>
													<option value="2000">2000</option>
													<option value="2001">2001</option>
													<option value="2002">2002</option>
													<option value="2003">2003</option>
													<option value="2004">2004</option>
													<option value="2005">2005</option>
													<option value="2006">2006</option>
													<option value="2007">2007</option>
													<option value="2008">2008</option>
													<option value="2009">2009</option>
													<option value="2010">2010</option>
													<option value="2011">2011</option>
													<option value="2012">2012</option>
													<option value="2013">2013</option>
													<option value="2014">2014</option>
													<option value="2015">2015</option>
													<option value="2016">2016</option>
													<option value="2017">2017</option>
													<option value="2018">2018</option>
													<option value="2019">2019</option>
													<option value="2020">2020</option>
													<option value="2021">2021</option>
													<option value="2022">2022</option>														
												</select>
											</div> 
										</div>

									</div>
								</div>
								
							</div>
						</div>
						{/*<!-- Education Qaulification --> */}

						
						<div class="card">
							<div class="card-body">
								<h4 class="card-title">Education Qaulification</h4>
								<div class="education-info">
									<div class="row form-row education-cont">
										<div class="col-12 col-md-10 col-lg-11">
                                        <div class="row form-row">
                                            {edu !== [] ?
                                                edu.map((ele)=>{
                                                   return(
                                                    <>
                                                    <div class="col-12 col-md-6 col-lg-4">
                                                    {ele.degree}
                                                        </div>
                                                        <div class="col-12 col-md-6 col-lg-4">
                                                            {ele.college}
                                                        </div>
                                                        <div class="col-12 col-md-6 col-lg-4">
                                                            {ele.year}
                                                        </div>
                                                        </>
                                                   )
                                                })
                                                :""
                                            }
												
                                        </div>
                                        <hr></hr>
											<div class="row form-row">
												<div class="col-12 col-md-6 col-lg-4">
													<div class="form-group">
														<label>Degree</label>
														<input type="text" name="degree"   onChange={handleEducationInput} value={education.degree} class="form-control"/>
													</div> 
												</div>
												<div class="col-12 col-md-6 col-lg-4">
													<div class="form-group">
														<label>College/Institute</label>
														<input type="text" name="college"   onChange={handleEducationInput} value={education.college} class="form-control"/>
													</div> 
												</div>
												<div class="col-12 col-md-6 col-lg-4">
													<div class="form-group">
														<label>Year of Completion</label>
														<input type="number" name="year"   onChange={handleEducationInput} value={education.year} class="form-control"/>
													</div> 
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="add-more">
									<a href="javascript:void(0);" onClick={addEdu} class="add-education"><i class="fa fa-plus-circle"></i> Add More</a>
								</div>
							</div>
						</div>
						{/*<!-- <!-- Experience --> --> */}

						
						<div class="card">
							<div class="card-body">
								<h4 class="card-title">Experience</h4>
								<div class="experience-info">
									<div class="row form-row experience-cont">
										<div class="col-12 col-md-10 col-lg-11">
                                        <div class="row form-row">
												{exp !== [] ? 
                                                    exp.map((ele)=>{
                                                        return(
                                                            <>
                                                                <div class="col-12 col-md-6 col-lg-3">
                                                                    {ele.hospital_name}
                                                                </div>
                                                                <div class="col-12 col-md-6 col-lg-3">
                                                                    {ele.from}
                                                                </div>
                                                                <div class="col-12 col-md-6 col-lg-3">
                                                                    {ele.to}
                                                                </div>
                                                                <div class="col-12 col-md-6 col-lg-3">
                                                                    {ele.designation}
                                                                </div>
                                                            </>
                                                        )
                                                    }) 
                                                    :""   
                                            }
                                        </div>
                                        <hr></hr>
											<div class="row form-row">
												<div class="col-12 col-md-6 col-lg-4">
													<div class="form-group">
														<label>Hospital Name</label>
														<input type="text" name="hospital_name"   onChange={handleExperienceInput} value={experience.hospital_name} class="form-control"/>
													</div> 
												</div>
												<div class="col-12 col-md-6 col-lg-4">
													<div class="form-group">
														<label>From</label>
														<input type="number" name="from" onChange={handleExperienceInput} value={experience.from} class="form-control"/>
													</div> 
												</div>
												<div class="col-12 col-md-6 col-lg-4">
													<div class="form-group">
														<label>To</label>
														<input type="number" name="to" onChange={handleExperienceInput} value={experience.to} class="form-control"/>
													</div> 
												</div>
												<div class="col-12 col-md-6 col-lg-4">
													<div class="form-group">
														<label>Designation</label>
														<input type="text" name="designation"  onChange={handleExperienceInput} value={experience.designation} class="form-control"/>
													</div> 
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="add-more">
									<a href="javascript:void(0);" class="add-experience" onClick={addExp}><i class="fa fa-plus-circle"></i> Add More</a>
								</div>
							</div>
						</div>
						{/* <!-- Clinic Info --> */}
				
							
							
							<div class="card">
								<div class="card-body">
									<h4 class="card-title">Clinic Info</h4>
									<div class="row form-row">
										<div class="col-md-6">
											<div class="form-group">
												<label>Clinic Name</label>
												<input type="text" name="clinic_name" onChange={handleClinicInput} value={UserClinic.clinic_name} class="form-control"/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label>Clinic Address</label>
												<input type="text" name="clinic_address" onChange={handleClinicInput} value={UserClinic.clinic_address} class="form-control"/>
											</div>
										</div>

										{/*<div class="col-md-12">
											<div class="form-group">
												<label>Clinic Images</label>
												<form action="#" class="dropzone"></form>
											</div>
											<div class="upload-wrap">
												<div class="upload-images">
													<img src="assets/img/features/feature-01.jpg" alt="Upload Image"/>
													<a href="javascript:void(0);" class="btn btn-icon btn-danger btn-sm"><i class="far fa-trash-alt"></i></a>
												</div>
												<div class="upload-images">
													<img src="assets/img/features/feature-02.jpg" alt="Upload Image"/>
													<a href="javascript:void(0);" class="btn btn-icon btn-danger btn-sm"><i class="far fa-trash-alt"></i></a>
												</div>
											</div>
										</div>*/}
									</div>
								</div>
							</div>
							{/* <!-- Services and Specialization --> */}
				

							
						<div class="card services-card">
							<div class="card-body">
								<h4 class="card-title">Services and Specialization</h4>
								<div class="form-group">
									<label>Services</label>
									<input type="text" data-role="tagsinput" name="service" value={services} class="input-tags form-control" placeholder="Enter Services eg.Tooth cleaning " onChange={(e)=> setservices(e.target.value)}  id="services"/>
									<small class="form-text text-muted">Note : Please add comma between different services</small>
								</div> 
								<div class="form-group mb-0">
									<label>Specialization </label>
									<input class="input-tags form-control" type="text" name="specialist" value={specialize} data-role="tagsinput" placeholder="Enter Specialization eg.Children Care,Dental Care " onChange={(e)=> setspecialize(e.target.value)} id="specialist"/>
									<small class="form-text text-muted">Note : Please add comma between different services</small>
								</div> 
							</div>              
						</div>
						{/* <!-- Contact Details --> */}
				
							
							<div class="card contact-card">
								<div class="card-body">
									<h4 class="card-title">Contact Details</h4>
									<div class="row form-row">
										<div class="col-md-6">
											<div class="form-group">
												<label>Address</label>
												<input type="text" name="address" onChange={handleContactInput} value={UserContact.address}class="form-control"/>
											</div>
										</div>										
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">City</label>
												<input type="text" name="city" onChange={handleContactInput} value={UserContact.city} class="form-control"/>
											</div>
										</div>

										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">State</label>
												<input type="text" name="state" onChange={handleContactInput} value={UserContact.state} class="form-control"/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">Country</label>
												<input type="text" name="country" onChange={handleContactInput} value={UserContact.country} class="form-control"/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">Postal Code</label>
												<input type="text" name="pincode" onChange={handleContactInput} value={UserContact.pincode} class="form-control"/>
											</div>
										</div>
									</div>
								</div>
							</div>
																		
							
							<div class="submit-section submit-btn-bottom">
								<button type="submit" class="btn btn-primary submit-btn" onClick={updateChanges}>Save Changes</button>
							</div>
							
						</div>
  )
}
