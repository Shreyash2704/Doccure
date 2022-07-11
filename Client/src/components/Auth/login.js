import React,{useState,useEffect} from 'react'
import '../../../src/index.css'
import Header from '../headers/Header'
import login_banner from '../../assets/img/login-banner.png'
import Footer from '../footers/Footer'
import { Form,Button,Alert } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Login() {

    const navigate = useNavigate()
    const initialState = {
        email : "",
        password : "",
        usergroup:""
    }
    const [user, setuser] = useState(initialState)
    const [error, seterror] = useState("")

    const handleInputChange = (e) =>{
        const {name,value} = e.target
        setuser({...user,[name]:value})
        seterror("")
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
    }
    function onChangeSelect(event) {
        user.usergroup = event.target.value
    
      }
    const validate = async() =>{
        if(user.usergroup == ""){
            seterror("Please Select the user group")
        }
        else{
            var uri = ""
            if( user.usergroup === "1"){
                uri = "http://localhost:5000/doctor/login"
            }
            if(user.usergroup === "2"){
                uri = "http://localhost:5000/patients/login"
            }
            if(user.usergroup === "3"){
                uri = "http://localhost:5000/lab_appointment/login"
            }
            

            if(user.email !== "" && user.password !== ""){
            console.log(user)
                const loggedInUser = await axios.post(uri,user)
                console.log(loggedInUser.data)
                console.log(typeof(loggedInUser.data.auth))
                if(loggedInUser.data.auth){
                    localStorage.setItem("token",loggedInUser.data.token)
                    localStorage.setItem("userGroup",user.usergroup)
                    
                    navigate('/')
                }
                else{
                    seterror(loggedInUser.data.message)
                }
            }
            else{
                seterror("Fill in all the details.")
            }
        }
        
  }
  return (
    <div >
        <Header/>

        <div class="main-wrapper mt-5">
		
       
        
        <div class="content">
            <div class="container-fluid">
                
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        
                      
                        <div class="account-content">
                            <div class="row align-items-center justify-content-center">
                                <div class="col-md-7 col-lg-6 login-left  p-5">
                                    <img src={login_banner} class="img-fluid" alt="Doccure Login"/>	
                                </div>
                                <div class="col-md-12 col-lg-6 login-right ">
                                    <div className='p-3'>
                                    <div class="login-header">
                                        <h3>Login <span>Doccure</span></h3>
                                    </div>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" name="email" onChange={handleInputChange} placeholder="Enter email" />
                                            <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control type="password" name="password"  onChange={handleInputChange} placeholder="Password" />
                                        </Form.Group>
                                        
                                        <Form.Select aria-label="Select User Group" className='mb-3' onChange={onChangeSelect}>
                                            <option>Select User Group</option>
                                            <option value="1">Doctor</option>
                                            <option value="2">Patient</option>
                                            <option value="3">Lab</option>
                                        </Form.Select>
                                        {error===""? "":<Alert variant="danger">
                                            {error}
                                        </Alert>}
                                        <Button variant="primary" type="submit" onClick={validate}>
                                            Submit
                                        </Button>
                                        </Form>
                                        </div>
                                </div>
                            </div>
                        </div>
                     
                    </div>
                </div>

            </div>

        </div>		
     
        <Footer/>
       
    </div>
    </div>
  )
}
