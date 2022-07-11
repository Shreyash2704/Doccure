import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Footer from '../../footers/Footer'
import Header from '../../headers/Header'
import DoctorWidget from './DoctorWidget'

export default function SearchDoctor() {

	const initialState = {
		gender : "none",
		specialist:"none"
	}
	
    const [doctors, setdoctors] = useState([])
	const [doctors__, setdoctors__] = useState([])
    const [education, seteducation] = useState("")
    const [city, setcity] = useState("")
    const [state, setstate] = useState("")
    const [services, setservices] = useState([])
    const [specialist, setspecialist] = useState([])
    const [filters, setfilters] = useState(initialState)

    const loadDoctors = async() =>{
        const uri = 'http://localhost:5000/doctor/all_doctor'
        const response = await axios.get(uri)
        console.log(response.data.data)
	
        setdoctors(response.data.data)
		setdoctors__(response.data.data)
		var array = []
		response.data.data.map(ele=>{
			if (ele.specialization !== undefined){
				ele.specialization.map(e=>{
					if(!array.includes(e)){
						array.push(e)
					}
				})
			}
		})
		
		setspecialist(array)

    }
	const handlefilter = (e) =>{
		const {name,value} = e.target
		setfilters({...filters,[name]:value})
	}
	const findGender = (value,arr) =>{
		var array = []
		
		if(arr !== undefined){
			arr.map(e=>{
				if(e.verified === true){
					if(e.details.gender === value){
						array.push(e)
					}
				}
				
			})
			return array
		}
		

		return array
	}
	const findSpecialist = (arr,arr2) =>{
		var array = []

		arr2.map(e=>{
			if(e.verified === true){
				e.specialization.map(ele=>{
					if(!array.includes(e)){
						if(arr === ele){
							array.push(e)
						}
					}
				})
			}
		})
		
		
		return array
	}
	const clear = () =>{
		console.log(filters.gender ,filters.specialist)
		if(filters.gender !== "none" && filters.specialist === "none"){
			var array =  findGender(filters.gender,doctors__)
			console.log(array)
			setdoctors(array)

		}
		else if(filters.gender === "none" && filters.specialist !== "none"){
			var array =  findSpecialist(filters.specialist,doctors__)
			console.log(array)
			setdoctors(array)
		}
		else if(filters.gender !== "none" && filters.specialist !== "none"){
			var array =  findGender(filters.gender,doctors__)
			var array2 =  findSpecialist(filters.specialist,array)
			console.log(array)
			console.log(array2)
			setdoctors(array2)
			
		}
		else{
			
			setdoctors(doctors__)
		}
		
	}

    useEffect(() => {
      loadDoctors()
    }, [])
    
  return (
    <div>
      <Header/>
      {/*-------Breadcrumb------- */}
      <div class="breadcrumb-bar">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-8 col-12">							
							<h2 class="breadcrumb-title">Search Doctors</h2>
						</div>						
					</div>
				</div>
        </div>
            {/*-------Breadcrumb------- */}

            <div class="content bg-light">
				<div class="container-fluid">

					<div class="row">
						<div class="col-md-12 col-lg-4 col-xl-3 px-3  theiaStickySidebar">
						
						
							<div class="card search-filter p-3">
								<div class="card-header">
									<h4 class="card-title mb-0">Search Filter</h4>
								</div>
								<div class="card-body">
								
								<div class="filter-widget">
									<h4>Gender</h4>
									<select name="gender" class="form-control select" onChange={handlefilter}  value={filters.gender}>
										<option value="none">Select Gender</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
													
									</select>
								</div>
								<div class="filter-widget">
									<h4>Select Specialist</h4>
									<select name="specialist" class="form-control select" onChange={handlefilter}  value={filters.specialist}>
													<option value="none">Select Specialization</option>
													{specialist.map(e=>{
														return(
															<option value={e}>{e}</option>
														)
													})}
												</select>
									{/*<div>
										<label class="custom_check">
											<input type="checkbox" name="select_specialist" checked/>
											<span class="checkmark"></span> Urology
										</label>
									</div>
									<div>
										<label class="custom_check">
											<input type="checkbox" name="select_specialist" checked/>
											<span class="checkmark"></span> Neurology
										</label>
									</div>
									<div>
										<label class="custom_check">
											<input type="checkbox" name="select_specialist"/>
											<span class="checkmark"></span> Dentist
										</label>
									</div>
									<div>
										<label class="custom_check">
											<input type="checkbox" name="select_specialist"/>
											<span class="checkmark"></span> Orthopedic
										</label>
									</div>
									<div>
										<label class="custom_check">
											<input type="checkbox" name="select_specialist"/>
											<span class="checkmark"></span> Cardiologist
										</label>
									</div>
									<div>
										<label class="custom_check">
											<input type="checkbox" name="select_specialist"/>
											<span class="checkmark"></span> Cardiologist
										</label>
									</div>*/}
								</div>
									<div class="btn-search">
										<button type="button" onClick={clear} class="btn btn-block">Search</button>
									</div>	
								</div>
							</div>
							{/*<!-- /Search Filter -->*/}
							
						</div>
						
						<div class="col-md-12 col-lg-8 col-xl-9">
							
                            {doctors !== [] ? (
                                <>
                                {doctors.map((ele)=>{
									if(ele.verified === true){
									
                                    const {fname,lname,imageUrl,fees} = ele.details
                                    const {_id,service,specialization} = ele
                                    const {city,state} = ele.contact_details
                                    var edu = ""
                                    ele.education.map((e)=>{
                                        edu = `${e.degree} `
                                    })
                                    return(
                                        <>
                                       <DoctorWidget id={_id} name={`${fname} ${lname}`} image={imageUrl} services={service} education={edu} fees={fees} specialist={specialization} city={city} state={state}/>
                                        </>
                                    )
                                }}
								)
							
							}
                                </>
                            ):("")}

							

								
						</div>
					</div>

				</div>

			</div>
      <Footer/>  
    </div>
  )
}
