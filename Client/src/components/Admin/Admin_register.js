import axios from 'axios'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './assets/css/style.css'
import logo from './assets/img/logo-white.png'

const Admin_register = () => {
    const istate = {
        email:"",
        password:"",
        username:"",
        repassword:""
    }
    const navigate = useNavigate()
    const [Admin, setAdmin] = useState(istate)
    const [error, seterror] = useState("")
    const handleInput = (e) =>{
        const {name,value} = e.target
        setAdmin({...Admin,[name]:value})
    }
    const RegisterAdmin = async() =>{
        if(Admin.email !== "" && Admin.password !== "" && Admin.username !== ""){
           if(Admin.password === Admin.repassword){
            const body = {
                username:Admin.username,
                email:Admin.email,
                password:Admin.password
            }
            const uri = 'http://localhost:5000/admin_route/signup'
            const res = await axios.post(uri,body)
            navigate('/admin/login')
           }
           else{
               seterror("Confirmed Password doesn't match password.")
           }
        }else{
            seterror("Please Fill all details")
        }
    }
  return (
    <div class="main-wrapper login-body">
            <div class="login-wrapper">
            	<div class="container">
                	<div class="loginbox">
                    	<div class="login-left">
							<img class="img-fluid" src={logo} alt="Logo"/>
                        </div>
                        <div class="login-right">
							<div class="login-right-wrap">
								<h1>Register</h1>
								<p class="account-subtitle">Access to our dashboard</p>
								
								
								<form action="" onSubmit={(e)=>e.preventDefault()}>
									<div class="form-group">
										<input class="form-control" type="text" name="username" onChange={handleInput} value={Admin.username} placeholder="Name"/>
									</div>
									<div class="form-group">
										<input class="form-control" type="text" name="email" onChange={handleInput} value={Admin.email} placeholder="Email"/>
									</div>
									<div class="form-group">
										<input class="form-control" type="text" name="password" onChange={handleInput} value={Admin.password} placeholder="Password"/>
									</div>
									<div class="form-group">
										<input class="form-control" type="text" name="repassword" onChange={handleInput} value={Admin.repassword} placeholder="Confirm Password"/>
									</div>
									<div class="form-group mb-0">
										<button class="btn btn-primary btn-block" onClick={RegisterAdmin} type="submit">Register</button>
									</div>
								</form>
								
								
								<div class="login-or">
									<span class="or-line"></span>
									<span class="span-or">or</span>
								</div>
								
							
								
								
								<div class="text-center dont-have">Already have an account? <a href="/admin/login">Login</a></div>
							</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Admin_register