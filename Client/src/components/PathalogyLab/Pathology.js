import React,{useState,useEffect} from 'react'
import Header from '../headers/Header'
import Footer from '../footers/Footer'
import Breadcrum from '../headers/Breadcrum'
import Cards from './Cards'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Pathology = () => {
    const params = useParams()
    const id = params.id
    
    const testImages = {
        "Blood Test":"https://www.bing.com/th?id=OIP.6OzXHMKaxFgKx-aGcOAcHAHaFj&w=197&h=148&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2",
        "Covid Test":"https://th.bing.com/th/id/OIP.vJPcALAr_brAGy7bQ3fiSAHaEK?pid=ImgDet&rs=1",
        "Malaria Test":"https://th.bing.com/th/id/OIP.FysH5aumYNko5CaUba6MTwHaD2?pid=ImgDet&rs=1",
        "Dengue Test":"https://static.toiimg.com/photo/msid-71650395/71650395.jpg?910879",
        "Diabetes Test":"https://static.toiimg.com/photo/msid-69477385/69477385.jpg?725817",
        "Kidney Test":"https://th.bing.com/th/id/OIP.gI7yaWtTEOB2JU2UeXnXoQHaEC?pid=ImgDet&rs=1",
        "Xrays":"https://post.healthline.com/wp-content/uploads/2020/08/chest-x-ray_thumb-1.jpg",
        "Other":"https://th.bing.com/th/id/OIP.lmEH98ftZrzRyMxpaOrpkQHaE7?pid=ImgDet&rs=1"
    }
    const [lab, setlab] = useState({})
    const [services, setservices] = useState([])
    const [details, setdetails] = useState({})
    const loadData = async(id) =>{
        const uri = `http://localhost:5000/lab_appointment/lab/${id}`
        const res = await axios.get(uri)
        console.log(res.data.lab.services)
        setlab(res.data.lab)
        setservices(res.data.lab.services)
        setdetails(res.data.lab.details)
    }
    useEffect(() => {
        loadData(id)
    }, [id])
    

  return (
    <div>
        <Header />
        <Breadcrum name="Pathology Lab"/>
        
        <section class="section section-doctor">
				<div class="container-fluid">
				   <div class="row">
						<div class="col-sm-12 col-lg-4">
							<div class="section-header ">
                                <div className='d-flex'>
                                <a href="#">
                                    <img src={`http://localhost:5000/${details.imageUrl}`} class="img-fluid" width="200" height="200" alt="User Image"/>
                                </a>
								
                                </div>
								<p className='fs-5 fw-bold'> Book pathology lab appointment.<br></br>Also get home test services. </p>
							</div>
							<div class="about-content">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.</p>
								<a href={`/lab/appointment/${lab._id}`}>Book Appointment</a>
							</div>
						</div>
						<div class="col-sm-12 col-lg-8">
							
							<div class="doctor-slider doc_cards1 d-flex  flex-nowrap slider">

                                {services.length > 0 &&
                                   services.map(ele =>{
                                      const {test,cost} = ele
                                      return(<>
                                      <Cards id={lab._id} type={test} charges={`Rs.${cost}`} address={`${lab.details.address},${lab.details.city}`} image={testImages[test]}/>
                                      </>)
                                   })
                                }
							
								
								
								
								
								
							</div>
						</div>
				   </div>
				</div>
			</section>
        <Footer />
    </div>
  )
}

export default Pathology