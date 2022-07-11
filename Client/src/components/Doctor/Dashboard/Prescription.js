import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { Accordion } from 'react-bootstrap'

const Prescription = () => {
    const [allPrescriptions, setallPrescriptions] = useState([])
    const array = [1,2,3,4,5,6]
    const loadPrescriptions = async() =>{
        const uri = 'http://localhost:5000/prescription/doctor'
        const token = localStorage.getItem('token')
        const response = await axios.get(uri,{
            headers:{
                'x-auth-token':token
            }
        })
        console.log(response.data.data)
        setallPrescriptions(response.data.data)
    }

    useEffect(() => {
      loadPrescriptions()
      
    }, [])
    
   var count = 0
  return (
    <div>
        <p className='display-5'>Prescriptions</p><hr></hr>
        <Accordion>
            
            { 
                allPrescriptions.map((ele)=>{
                    count = count+1
                   return(
                    <Accordion.Item eventKey={count} className='mb-3'>
                <Accordion.Header>
                <div class="">
                    <div class="d-flex ">
                        
                        <img src={`http://localhost:5000/${ele.p_image}`} width="50" height="50" style={{borderRadius:"50px 50px"}} class="img-fluid " alt="..."/>
                        <div>
                        <h5 class="card-title px-4 mt-2">{ele.p_name}</h5>
                        </div> 
                    </div>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                <table class="table">
                        <thead>
                            <tr>
                            <th>{ele.date}</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Days</th>
                            <th scope="col">Times</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {ele.prescription_list.map(pres=>{
                                const {name,quantity,days,time} = pres
                                return(
                                    <tr>
                                        <tr></tr>
                                    <th scope="row">{name}</th>
                                    <td>{quantity}</td>
                                    <td>{days}</td>
                                    <td>{time}</td>
                                    </tr>
                                )
                            })
                            }
                            
                        </tbody>
                        </table>
                </Accordion.Body>
            </Accordion.Item>)
            
            
                })
            }
            
            
            
            </Accordion>







        
   </div>
  )
}

export default Prescription