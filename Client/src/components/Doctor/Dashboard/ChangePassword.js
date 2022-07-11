import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Alert } from 'react-bootstrap'



export default function ChangePassword() {
    const [password, setpassword] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [renewPass, setrenewPass] = useState("")
    const [error, seterror] = useState("")
    const [success, setsuccess] = useState("")

    const CheckPass = async(password) =>{
        const uri = "http://localhost:5000/doctor/CheckPassword"
        const data = {
            pass:password
        }
        const res = await axios.post(uri,data,{
            headers:{
                'x-auth-token':localStorage.getItem('token')
            }
        })

        return res.data.auth
    }

    const changePass = async() =>{
        if(newPassword !== "" && renewPass !== ""){
            if( newPassword === renewPass){
                const res = await CheckPass(password)
               if(res){
     
     
                 const uri = "http://localhost:5000/doctor/ChangePassword"
                 const data = {
                     new_pass : newPassword
                 }
                 const response = await axios.post(uri,data,{
                     headers:{
                         'x-auth-token':localStorage.getItem('token')
                     }
                 })
      
                 seterror("")
                 setpassword("")
                 setrenewPass("")
                 setnewPassword("")
                 setsuccess(response.data.message)
                 setTimeout(() => {
                     seterror("")
                     setsuccess("")
                 }, 5000);
               }else{
                   seterror("Incorrect Password")
                 setTimeout(() => {
                     seterror("")
                     setsuccess("")
                 }, 3000);
               }
                
                
                 
             }else{
                 setsuccess("")
                 setrenewPass("")
                 setnewPassword("")
                 seterror("New Password and confirmed new password doesn't match!")
                 setTimeout(() => {
                     seterror("")
                     setsuccess("")
     
                 }, 4000);
             }
             
        }else{
            setsuccess("")
            seterror("Please Fill all the details")
            setTimeout(() => {
                seterror("")
                setsuccess("")

            }, 4000);
        }
        
       
    }
  return (
    
							<div class="card">
								<div class="card-body">
                                    {error && <Alert variant='danger'>{error}</Alert>}
                                   { success && <Alert variant='success'>{success}</Alert>}
                                   	<div class="row">
										<div class="col-md-12 col-lg-6">
										
											
											<form onSubmit={(e) =>e.preventDefault()} method="post">
												<div class="form-group">
													<label>Old Password</label>
													<input type="password" name="password" value={password} onChange={(e)=>setpassword(e.target.value) } class="form-control"/>
												</div>
												<div class="form-group">
													<label>New Password</label>
													<input type="password" name="newPassword" value={newPassword} onChange={(e)=>setnewPassword(e.target.value)} class="form-control"/>
												</div>
												<div class="form-group">
													<label>Confirm Password</label>
													<input type="password"name="RenewPassword" value={renewPass} onChange={(e)=>setrenewPass(e.target.value)}class="form-control"/>
												</div>
												<div class="submit-section">
													<button type="submit" onClick={changePass} class="btn btn-primary submit-btn">Save Changes</button>
												</div>
											</form>
											
											
										</div>
									</div>
								</div>
							</div>
						
  )
}
