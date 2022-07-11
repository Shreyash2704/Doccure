import React from 'react'
import '../../index.css'

const Cards = ({id,type,charges,image,address}) => {
  return (
    <div className="profile-widget mx-2">
    <div className="doc-img">
        <a href={`/lab/appointment/${id}`} >
            <img className="img-fluid" alt="User Image" src={image}/>
        </a>
        <a href="javascript:void(0)" class="fav-btn">
            <i className="far fa-bookmark"></i>
        </a>
    </div>
    <div className="pro-content">
        <h3 className="title">
            <a href={`/lab/appointment/${id}`} className='text-decoration-none text-dark'>{type}</a> 
        
        </h3>
        
        <div className="rating">
            <i className="fas fa-star filled"></i>
            <i className="fas fa-star filled"></i>
            <i className="fas fa-star filled"></i>
            <i className="fas fa-star filled"></i>
            <i className="fas fa-star"></i>

        </div>
        <ul className="available-info">
            <li>
                <i className="fas fa-map-marker-alt"></i> {address}
            </li>
            <li>
                <i className="far fa-clock"></i> Available on Fri, 22 Mar
            </li>
            <li>
                <i className="far fa-money-bill-alt"></i>{charges}
                <i className="fas fa-info-circle" data-toggle="tooltip" title="Lorem Ipsum"></i>
            </li>
        </ul>
        
    </div>
</div>
  )
}

export default Cards