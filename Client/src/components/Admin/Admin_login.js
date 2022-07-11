import axios from 'axios'
import React,{useState} from 'react'
import { Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './assets/css/style.css'
import logo from './assets/img/logo-white.png'
const Admin_login = () => {
    const istate = {
        password:"",
        email:""
    }
    const navigate = useNavigate()
    const [user, setuser] = useState(istate)
    const [error, seterror] = useState("")
    const handleInput = (e) =>{
        const {name,value} = e.target
        setuser({...user,[name]:value})
    }
    const loginAdmin = async() =>{
        if(user.email !== "" && user.password !== ""){
            const uri = 'http://localhost:5000/admin_route/login'
            const res = await axios.post(uri,user)
            if(res.data.auth){
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('userGroup',"4")
                navigate('/admin')
            }else{
                seterror(res.data.message)
            }
        }else{
            seterror("Fill all details.")
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
								<h1>Login</h1>
								<p class="account-subtitle">Access to our dashboard</p>
								{error && <Alert variant='danger'>{error}</Alert>}
								
								<form action="" onSubmit={(e) => e.preventDefault()}>
									<div class="form-group">
										<input class="form-control" type="text" name="email"  onChange={handleInput} value={user.email} placeholder="Email"/>
									</div>
									<div class="form-group">
										<input class="form-control" type="text" name="password"  onChange={handleInput} value={user.password}  placeholder="Password"/>
									</div>
									<div class="form-group">
										<button class="btn btn-primary btn-block" onClick={loginAdmin} type="submit">Login</button>
									</div>
								</form>
							
								
								
								<div class="login-or">
									<span class="or-line"></span>
									<span class="span-or">or</span>
								</div>
								
								<div class="text-center dont-have">Don’t have an account? <a href="/admin/signup">Register</a></div>
							</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Admin_login