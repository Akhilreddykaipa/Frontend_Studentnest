import axios from 'axios';
import '../css/UpdateBooking.css'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopComponent from './TopComponent';
import Spinner from './Spinner';

export default function UpdateBooking() {
	const location=useLocation();
	const navigate=useNavigate()
	const [name,setName]=useState();
	const [loading,setLoading]=useState(true);
	const [accessToken,setAccessToken]=useState('');
	const [listing,setListing]=useState();

	useEffect(()=>{
		setName(location.state.name)
		setListing(location.state.listing.id)
		setAccessToken(localStorage.getItem("access_token"))
		setLoading(false)
	},[accessToken,location.state.name,location.state.id])

	const handleSubmit=(e)=>{
		setLoading(true)
		e.preventDefault()
		const userData={
			name,
		};

		axios
			.patch(`https://studentnest-eb6a68a9526b.herokuapp.com/booking/booking/${listing}/`,userData,{
				headers: {
					'Authorization':`Bearer ${accessToken}`
				}
			})
			.then(()=>{
				navigate("/profile")
				setLoading(false)
			})
			.catch((error)=>{
				console.log(error.response.data)
				setLoading(false)
			})
	}
  return (
	<div>
		<TopComponent head={"UPDATE BOOKING"} />
		<div className="updatebooking conatiner">
			{loading?<Spinner color={"#000000"}/>:<div className="updatebooking-main">
						<div className="updatebooking-main-info">
							<div className="updatebooking-main-info-left">
								<img src={location.state.listing.photo_main} alt="" />
							</div>
							<div className="updatebooking-main-info-right">
								<h2>{location.state.listing.title}</h2>
								<p>${location.state.listing.price}</p>
							</div>
						</div>
						<form onSubmit={handleSubmit}>
								<label htmlFor="name">Name</label>
								<input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name}/>
								<button type='submit'>UPDATE BOOKING</button>
						</form>
					</div>
					}
		</div>
	</div>
  )
}
