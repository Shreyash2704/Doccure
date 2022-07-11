import React,{useState,useEffect} from 'react'
import Header from '../headers/Header'
import '../../index.css'
import ChatPage from './ChatPage'
import axios from 'axios'

const MainChatSection = () => {

    const [user, setuser] = useState([])
    const [patients, setpatients] = useState([])
    const [ids, setids] = useState([])

    const loadData = async() =>{
        const uri1 = `http://localhost:5000/patients/getDoctor/${localStorage.getItem('userid')}`
        const response1 = await axios.get(uri1)
        setids(response1.data.id)
		setuser(response1.data.doctors)
    }
    const loadPatData = async() =>{
        const uri1 = `http://localhost:5000/doctor/getPatients/${localStorage.getItem('userid')}`
        const response1 = await axios.get(uri1)
        setids(response1.data.id)
		setuser(response1.data.patients)
    }
    useEffect(() => {
      
    if(localStorage.getItem("userGroup") === "1"){
        loadData()
    }else{
        loadPatData()
    }
      
    }, [])
    
  return (
    <div>
    <Header />
    <div class="content">
        <div class="container-fluid">
            <div class="row bg-light">
                <div class="col-lg-12">
                    <div class="chat-window">
                        {/*<!-- Chat Left --> */}
                        <div class="chat-cont-left">
                            <div class="chat-header text-white">
                                <span>Chats</span>
                                <a href="javascript:void(0)" class="chat-compose">
                                    <i class="material-icons">control_point</i>
                                </a>
                            </div>
                            <form class="chat-search">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <i class="fas fa-search"></i>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Search"/>
                                </div>
                            </form>

                            <div class="chat-users-list">
                                <div class="chat-scroll">
                                    {
                                        user.map(ele =>{
                                            return(
                                            <>
                                            <a href="javascript:void(0);" class="media">
                                        <div class="media-img-wrap">
                                            <div class="avatar avatar-away">
                                                <img src={`http://localhost:5000/${ele.details.imageUrl}`} alt="User Image" class="avatar-img rounded-circle"/>
                                            </div>
                                        </div>
                                        <div class="media-body">
                                            <div>
                                                <div class="user-name">{ele.details.fname} {ele.details.lname}</div>
                                            </div>
                                            <div>
                                                <div class="last-chat-time block">2 min</div>
                                                <div class="badge badge-success badge-pill">15</div>
                                            </div>
                                        </div>
                                    </a>
                                            </>)
                                        })
                                    }
                                    <a href="javascript:void(0);" class="media">
                                        <div class="media-img-wrap">
                                            <div class="avatar avatar-away">
                                                <img src="assets/img/patients/patient.jpg" alt="User Image" class="avatar-img rounded-circle"/>
                                            </div>
                                        </div>
                                        <div class="media-body">
                                            <div>
                                                <div class="user-name">Richard Wilson</div>
                                            </div>
                                            <div>
                                                <div class="last-chat-time block">2 min</div>
                                                <div class="badge badge-success badge-pill">15</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default MainChatSection