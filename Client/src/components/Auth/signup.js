import React,{useState,useEffect} from 'react'
import {Form,Button,Alert} from 'react-bootstrap'
import login_banner from '../../assets/img/login-banner.png'
import '../../index.css'
import Header from '../headers/Header'
import Footer from '../footers/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup(props) {
    const navigate = useNavigate()

    const user_group = props.user
    const initialState = {
        username:"",
        email:"",
        password:"",
        repassword:""
    }
    const [user, setuser] = useState(initialState)
    const [error, seterror] = useState("")
    const validatePassword = (pass,repass) =>{
        if(pass === repass){
            return true
        }
        else{
            return false
        }
    }
    const handleInputChange = (e) =>{
        const {name,value} = e.target
        setuser({...user,[name]:value})
        seterror("")
    }
    
   
    const register = async() =>{
        if(user.username !== "" && user.email !== "" && user.password !== "" && user.repassword !==""){
            if(validatePassword(user.password,user.repassword)){
                
                var uri = ""
                if(user_group === "doctor"){
                    uri = "http://localhost:5000/doctor/"
                }
                if(user_group === "patient"){
                    uri = "http://localhost:5000/patients/"
                }
                if(user_group === "lab"){
                    uri = "http://localhost:5000/lab_appointment/signup"
                }

               
                const newUser = {
                    username:user.username,
                    email:user.email,
                    password:user.password
                }
                console.log(newUser,user_group)
                try{
                    const savedUser = await axios.post(uri,newUser)
                    console.log(savedUser)
                    navigate('/login')

                }catch(err){
                    seterror(`error occured : ${err}`)
                    console.log(`error occured => ${err}`)
                }
                
            }
            else{
                seterror("Password Doesn't match.")
            }
        }else{
            seterror("Please fill all the details.")
        }
        
        
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
    }
  return (
      
    <div>
        <Header />
        <div class="content">
				<div class="container-fluid">
					
					<div class="row">
						<div class="col-md-8 offset-md-2">
								
							
							<div class="account-content">
								<div class="row align-items-center justify-content-center">
									<div class="col-md-7 col-lg-6 login-left">
										<img src={login_banner} class="img-fluid" alt="Doccure Register"/>	
									</div>
									<div class="col-md-12 col-lg-6 login-right">
										<div class="login-header">
											<h3>{user_group} Register <a href={user_group === "patient" ? "/signup/doctor":"/signup"}>Are you a {user_group === "patient" ? "Doctor":"Patient"}?</a></h3>
										</div>
										
										
										<Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicUserName">
                                            <Form.Control type="text" name="username" onChange={handleInputChange}  placeholder="Username" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" name="email" onChange={handleInputChange}  placeholder="Enter email" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control type="password" name="password" onChange={handleInputChange}   placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control type="password" name="repassword" onChange={handleInputChange}  placeholder="Re Password" />
                                        </Form.Group>
                                        {error===""? "":<Alert variant="danger">
                                            {error}
                                        </Alert>}
                                        <Button variant="primary" type="submit" onClick={register}>
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
            <Footer />	
    </div>
  )
}
