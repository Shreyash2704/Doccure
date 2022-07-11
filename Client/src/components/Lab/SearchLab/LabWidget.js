import React from 'react'

export default function LabWidget(props) {
  return (
    <div class="card" key={props.id}>
        <div class="card-body">
            <div class="doctor-widget">
                <div class="doc-info-left">
                    <div class="doctor-img">
                        <a href="#">
                            <img src={`http://localhost:5000/${props.image}`} class="img-fluid" alt="User Image"/>
                        </a>
                    </div>
                    <div class="doc-info-cont">
                        <h4 class="doc-name"><a className='text-decoration-none text-dark' href={`/lab/${props.id}`}>Dr. {props.name}</a></h4>
                        <p class="doc-speciality">{props.contact}</p>
                        <h5 class="doc-department">{props.email}</h5>
                        
                        <div class="clinic-details">
                            <p class="doc-location"><i class="fas fa-map-marker-alt"></i> {props.city}, {props.state}</p>
                            {/*<ul class="clinic-gallery">
                                <li>
                                    <a href="assets/img/features/feature-01.jpg" data-fancybox="gallery">
                                        <img src="assets/img/features/feature-01.jpg" alt="Feature"/>
                                    </a>
                                </li>
                                <li>
                                    <a href="assets/img/features/feature-02.jpg" data-fancybox="gallery">
                                        <img  src="assets/img/features/feature-02.jpg" alt="Feature"/>
                                    </a>
                                </li>
                                <li>
                                    <a href="assets/img/features/feature-03.jpg" data-fancybox="gallery">
                                        <img src="assets/img/features/feature-03.jpg" alt="Feature"/>
                                    </a>
                                </li>
                                <li>
                                    <a href="assets/img/features/feature-04.jpg" data-fancybox="gallery">
                                        <img src="assets/img/features/feature-04.jpg" alt="Feature"/>
                                    </a>
                                </li>
  </ul>*/}
                        </div>
                        <div class="clinic-services">
                            {
                                props.services.map((ele)=>{
                                    return(
                                        <span>{ele.test}</span>
                                    )
                                })
                            }
                            
                            
                        </div>
                    </div>
                </div>
                <div class="doc-info-right">
                    <div class="clini-infos">
                        <ul>													
                            <li><i class="fas fa-map-marker-alt"></i> {props.city}, {props.state}</li>
                
                        </ul>
                    </div>
                   <div class="clinic-booking">
                        <a class="apt-btn" href={`/lab/${props.id}`}>Book Appointment</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
