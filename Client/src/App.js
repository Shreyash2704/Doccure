import Signup from './components/Auth/signup';
import Login from './components/Auth/login';
import Homepage from './components/home/Homepage';
import Dashboard from './components/Patient/Dashboard/Dashboard';
import {BrowserRouter as Router,Route,Link, Routes,Navigate, useNavigate} from 'react-router-dom'
import Logout from './components/Auth/Logout';
import Doctors_Dashboard from './components/Doctor/Dashboard/Doctors_Dashboard';
import SearchDoctor from './components/Patient/Search_Doctor/SearchDoctor';
import DoctorProfile from './components/Patient/Search_Doctor/DoctorProfile';
import Booking from './components/Patient/Search_Doctor/Booking';
import VideoPage from './components/VideoCalling/VideoPage';
import { ContextProvider } from './Context';
import ChatPage from './components/ChatPage/ChatPage';
import MainChatSection from './components/ChatPage/MainChatSection';
import PrescriptionPage from './components/PrescriptionPage/PrescriptionPage';
import ShowPrescription from './components/PrescriptionPage/ShowPrescription';
import Pathology from './components/PathalogyLab/Pathology';
import LabAppointment from './components/PathalogyLab/LabAppointment';
import Header from './components/Admin/Header';
import AdminHomepage from './components/Admin/AdminHomepage';
import Admin_login from './components/Admin/Admin_login';
import Admin_register from './components/Admin/Admin_register';
import DoctorList from './components/Admin/DoctorList';
import Profile from './components/Admin/Profile';
import PatientProfile from './components/Admin/PatientProfile';
import PatientList from './components/Admin/PatientList';
import LabDashboard from './components/Lab/Dashboard/LabDashboard';
import SearchLab from './components/Lab/SearchLab/SearchLab';
import Details from './components/Lab/Dashboard/Details';
import LabList from './components/Admin/LabList';
import AppointmentList from './components/Admin/AppointmentList'
import DoctorAppointmentList from './components/Admin/DoctorAppointmentList';
function App() {

  return (
    <div className="App">
     
      <>

      <Router>
        <Routes>
          
          <Route exact path="/" element={<Homepage />}/>
          <Route exact path="/login" element={localStorage.getItem("token") === null ? <Login />:<Homepage/>}/>
          <Route exact path="/signup" element={localStorage.getItem("token") === null ?<Signup user="patient" />:<Homepage/>}/>
          <Route exact path="/signup/doctor" element={localStorage.getItem("token") === null ? <Signup user="doctor" />:<Homepage />}/>
          <Route exact path="/signup/lab" element={localStorage.getItem("token") === null ? <Signup user="lab" />:<Homepage />}/>
          <Route exact path="/dashboard" element={localStorage.getItem("token") === null ? <Login/>:
          localStorage.getItem("userGroup") !=="2" ? <Homepage />:
          <Dashboard />}/>
         
          <Route exact path="/logout" element={<Logout />}/>
           
          <Route exact path="/search_doctor" element={<SearchDoctor/>}/>
          <Route exact path="/doctor_dashboard" element={localStorage.getItem("token") === null ? <Login/>: localStorage.getItem("userGroup") ==="1" ? <Doctors_Dashboard />:<Dashboard />}/>
          <Route exact path="/profile/:id" element={<DoctorProfile />}/>
          <Route exact path="/booking/:id" element={localStorage.getItem("token") !== null ? <Booking /> : <Login />}/>
          <Route exact path="/video/:id" element={<ContextProvider><VideoPage /></ContextProvider>}/>
          <Route exact path="/chat/:id" element={localStorage.getItem("token") !== null ? <ChatPage/> : <Login/>} />
          <Route exact path="/prescription/:id" element={<PrescriptionPage/>} />
          <Route exact path="/ShowPrescription/:id" element={<ShowPrescription/>} />

          <Route exact path="/labDashboard" element={localStorage.getItem("userGroup") === "3" ? <LabDashboard /> : <Login />} />
          <Route exact path="/Lab" element={<SearchLab />} />
          <Route exact path="/Lab/:id" element={<Pathology />} />
          <Route exact path="/Lab/appointment/:id" element={localStorage.getItem("token") !== null ? <LabAppointment />:<Login />} />
          <Route exact path="/Lab/appointmentDetails/:id" element={<Details />} />

          {localStorage.getItem("userGroup") !== "1" && localStorage.getItem("userGroup") !== "2" && localStorage.getItem("userGroup") !== "3" && <><Route exact path="/admin/login" element={<Admin_login />} />
          <Route exact path="/admin/signup" element={<Admin_register />} /></> }

          {localStorage.getItem("userGroup") === "4" &&
           <> <Route exact path="/admin" element={<AdminHomepage />} />
         
          <Route exact path="/admin/doctor" element={<DoctorList />} />
          <Route exact path="/admin/patient" element={<PatientList />} />
          <Route exact path="/admin/patient/:id" element={<PatientProfile />} />
          <Route exact path="/admin/profile/:id" element={<Profile />} />
          <Route exact path="/admin/labs" element={<LabList/>} />
          <Route exacet path='/admin/labappointment' element={<AppointmentList />} />
          <Route exact path="/admin/appointment" element={<DoctorAppointmentList />} />
           </>

        }
        </Routes>
      </Router>

      </>
    </div>
  );
}

export default App;
