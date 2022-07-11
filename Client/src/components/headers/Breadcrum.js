import React from 'react'
import '../../index.css'
const Breadcrum = (props) => {
  return (
    <div class="breadcrumb-bar">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-12 col-12">							
							<h2 class="breadcrumb-title">{props.name}</h2>
						</div>
					</div>
				</div>
			</div>
  )
}

export default Breadcrum