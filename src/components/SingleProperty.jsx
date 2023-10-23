import { useLocation, useNavigate } from 'react-router-dom'
import '../css/SingleProperty.css'
import TopComponent from './TopComponent'
import { useEffect } from 'react';
import tub from '../assets/tub.svg'
import bed from '../assets/bed.svg'
import measure from '../assets/measure.svg'

export default function SingleProperty() {
	const navigate=useNavigate()
	const location=useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
  return (
	<div>
		<TopComponent head={location.state.title}/>
		<div className="singleProperty container">
			<div className="singleProperty-media">
				<img src={location.state.photo_main} alt="" />
				<img src={location.state.photo_1} alt="" />
				<img src={location.state.photo_2} alt="" />
				<img src={location.state.photo_3} alt="" />
				<img src={location.state.photo_4} alt="" />
				<img src={location.state.photo_5} alt="" />
				<img src={location.state.photo_6} alt=''/>
				{/* <iframe src="" frameborder="0"></iframe> */}
			</div>
			<div className="singleProperty-info">
				<h1>{location.state.title}</h1>
				<h3>{location.state.address},{location.state.city},{location.state.state}</h3>
				<span></span>
				<h4><img src={bed} alt=""/> Bedroom: {location.state.bedrooms}</h4>
				<h4><img src={tub} alt=""/> Bathroom: {location.state.bathrooms}</h4>
				<h4><img src={measure} alt=""/> House Square Yard: {location.state.houseSquareYard} sqyd</h4>
				<h4>Garden: {location.state.gardern?"YES":"NO"} Garage: {location.state.garage?"YES":"NO"}</h4>
				<span></span>
				<p>{location.state.description}</p>
				<h1>Price : ${location.state.price}</h1>
				<h3>LOCATION</h3>
				<iframe id='iframeId' src={`https://maps.google.com/maps?q=${location.state.latitute},${location.state.longitute}&z=15&output=embed`} width="100%" frameBorder="0" height="500px"></iframe>
				<div className="singleProperty-info-book">
					<button onClick={()=>navigate("/booking",{state:location.state})}>BOOK NOW!</button>
				</div>
			</div>
		</div>
	</div>
  )
}
