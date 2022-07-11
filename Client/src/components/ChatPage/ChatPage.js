import "./Chat.css";
import io from "socket.io-client";
import { useState,useEffect } from "react";
import Chat from "./Chat";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../headers/Header";
import '../../index.css'
const socket = io.connect("http://localhost:5000");

function ChatPage() {

    

    const params = useParams()
    const id = params.id
    const [OtherUser, setOtherUser] = useState({})
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [prevMessage, setprevMessage] = useState([])

    const joinRoom = () => {
        if (username !== "" && room !== "") {
          socket.emit("join_room", room);
          setShowChat(true)
        }
        else{
            console.log(username,room)
        }
      };

  const loadChat = async(room_id) =>{
      const uri=`http://localhost:5000/chat/${room_id}`
      const response = await axios.get(uri)
      //console.log(response.data)
      setprevMessage(response.data)
      const  uri2 = localStorage.getItem('userGroup') === "1" ? `http://localhost:5000/patients/getPatient/${id}`:`http://localhost:5000/doctor/getDoctor/${id}`
      const otherUser = await axios.get(uri2)
     // console.log(otherUser.data.data)
      setOtherUser(otherUser.data.data.details)

  }

  useEffect(() => {
    setUsername(localStorage.getItem("fname"))
    if(localStorage.getItem("userGroup") === "1"){
        setRoom(`${localStorage.getItem("userid")}_${id}`)
       // console.log(localStorage.getItem("userid"))
        loadChat(`${localStorage.getItem("userid")}_${id}`)
        
    }
    else{
        setRoom(`${id}_${localStorage.getItem("userid")}`)
        loadChat(`${id}_${localStorage.getItem("userid")}`)
        joinRoom()
    }

    
  }, [])
  

  return (
      <>
      <Header />
      <div class="breadcrumb-bar">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-12 col-12">							
							<h2 class="breadcrumb-title">Chat</h2>
						</div>
					</div>
				</div>
			</div>
           
                
                    <div class="px-5">
                        <div class="user-name fs-3">{OtherUser.fname} {OtherUser.lname}</div>
                        <div class="user-status">online</div>
                    </div>
              
            <hr></hr>
    <div className="container-fluid cont1 px-5 bg-light">

      {!showChat ? (
          <>Loading...........
          <button onClick={joinRoom}>Proceed</button></>
      ) : (<>
      <></>
                {console.log(socket)}
          <div className="d-flex justify-content-center align-items-center">
              <Chat socket={socket} username={username} room={room} prevMessage={prevMessage}/>
            </div>
          
    
      
      
      </>
          
        
      )}
    </div></>
  );
}

export default ChatPage;