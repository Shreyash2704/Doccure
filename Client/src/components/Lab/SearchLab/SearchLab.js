import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Footer from '../../footers/Footer'
import Header from '../../headers/Header'
import LabWidget from './LabWidget'


export default function SearchLab() {

  const initialState = {
		location : "none",
		test:"none"
	}
	const [filters, setfilters] = useState(initialState)
    const [Labs, setLabs] = useState([])
    const [labs__, setlabs__] = useState([])
    const [test, settest] = useState([])
    const [location, setlocation] = useState([])

    const loadLabs = async() =>{
        const uri = 'http://localhost:5000/lab_appointment/allLabs'
        const response = await axios.get(uri)
        console.log(response.data.data)
        setLabs(response.data.data)
        setlabs__(response.data.data)
        var l_array = []
        var test_array = []
        response.data.data.map(e=>{
          if(e.details !== null){
            if(!l_array.includes(e.details.city)){
              l_array.push(e.details.city)
            }
          }

          if(e.services !== undefined){
            e.services.map(ele=>{
              if(!test_array.includes(ele["test"])){
                test_array.push(ele['test'])
              }
            })
          }
        })

        setlocation(l_array)
        settest(test_array)


    }
    const handlefilter = (e) =>{
      const {name,value} = e.target
      setfilters({...filters,[name]:value})
    }
    const findLocation = (value,arr) =>{
      var array = []
      
      if(arr !== undefined){
        arr.map(e=>{
          if(e.details !==  null){
            if(e.details.city === value){
              array.push(e)
            }
          }
        })
        return array
      }
      
  
      return array
    }
    const findTest = (test,arr2) =>{
      var array = []
      arr2.map(e=>{
        e.services.map(ele=>{
          if(!array.includes(e)){
            if(test === ele['test']){
              array.push(e)
            }
          }
        })
      })
      return array
    }
    const clear = () =>{
     console.log(filters.location,filters.test)
      if(filters.location !== "none" && filters.test === "none"){
        var array =  findLocation(filters.location,labs__)
        console.log(array)
        setLabs(array)
  
      }
      else if(filters.location === "none" && filters.test !== "none"){
        var array =  findTest(filters.test,labs__)
        console.log(array)
        setLabs(array)
      }
      else if(filters.location !== "none" && filters.test !== "none"){
        var array =  findLocation(filters.location,labs__)
        var array2 =  findTest(filters.test,array)
        console.log(array2)
        setLabs(array2)
        
      }
      else{
        
        setLabs(labs__)
      }
      
    }
  

    useEffect(() => {
      loadLabs()
    }, [])
    
  return (
    <div>
      <Header/>
      {/*-------Breadcrumb------- */}
      <div class="breadcrumb-bar">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-8 col-12">							
							<h2 class="breadcrumb-title">Search Pathology Labs</h2>
						</div>						
					</div>
				</div>
        </div>
            {/*-------Breadcrumb------- */}

            <div class="content bg-light">
				<div class="container-fluid">

					<div class="row">
          <div class="col-md-12 col-lg-4 col-xl-3   theiaStickySidebar">
						
						
            <div class="card search-filter p-3">
              <div class="card-header">
                <h4 class="card-title mb-0">Search Filter</h4>
              </div>
              <div class="card-body">
              
              <div class="filter-widget">
                <h4>Location</h4>
                <select name="location" class="form-control select" onChange={handlefilter}  value={filters.location}>
                  <option value="none">none</option>
                 
                  {
                    location.map(e=>{
                     return( <option value={e}>{e}</option>)
                    })
                  }
                  
                        
                </select>
              </div>
              <div class="filter-widget">
                <h4>Select Pathology Test</h4>
                <select name="test" class="form-control select" onChange={handlefilter}  value={filters.test}>
                        <option value="none">none</option>
                        {test.map(e=>{
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
						
						
						<div class="col-md-12 col-lg-8 col-xl-9 ">
                            { Labs.length > 0 ? 
                                <>
                                {Labs.map((ele)=>{
									console.log(ele.details)
									if(ele.details !== null){
                                    const id = ele._id
                                     const {name,imageUrl,city,state,country,services,contact} = ele.details
                                    return(
                                       
                                       <>
                                       <LabWidget id={id} image={imageUrl} name={name} city={city} state={state} country={country} services={services} contact={contact} />
                                       </>
                                    )
                                
								}})
                        }
                                </>
                                
                            :("")}

							

								
						</div>
					</div>

				</div>

			</div>
      <Footer/>  
    </div>
  )
}
