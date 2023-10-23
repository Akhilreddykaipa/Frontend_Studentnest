import axios from 'axios';
import '../css/Transportation.css'
import TopComponent from './TopComponent'
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Transportation() {
	const location=useLocation();
	const navigate=useNavigate()
	const [user,setUser]=useState();
	const [number_of_boxes,setBoxes]=useState();
	const [family_members,setMembers]=useState();
	const [truck_required,setTrucks]=useState();
	const [loading,setLoading]=useState(true);
	const [accessToken,setAccessToken]=useState('');
	const [error,setError]=useState(false);
	
	useEffect(()=>{
		setUser(location.state.user.id)
		setAccessToken(localStorage.getItem("access_token"))
		setLoading(false)
	},[accessToken,location.state.name,location.state.id])

	const handleSubmit=(e)=>{
		setLoading(true)
		e.preventDefault()
		const userData={
			user,
			number_of_boxes,
			family_members,
			truck_required,
		};

		axios
			.post(`https://studentnest-eb6a68a9526b.herokuapp.com/booking/transportation/`,userData,{
				headers: {
					'Authorization':`Bearer ${accessToken}`
				}
			})
			.then(()=>{
				setLoading(false)
				navigate("/profile")
			})
			.catch((error)=>{
				console.log(error.response.data)
				setError(true)
				setLoading(false)
			})
	}
  return (
	<div>
	<TopComponent head={"TRANSPORTATION"}/>
	<div className="transportation conatiner">
			{loading?<Spinner color={"#000000"}/>:<div className="transportation-main">
						<div className="transportation-main-info">
							<div className="transportation-main-info-left">
								<img src={location.state.listing.photo_main} alt="" />
							</div>
							<div className="transportation-main-info-right">
								<h2>{location.state.listing.title}</h2>
								<p>${location.state.listing.price}</p>
							</div>
						</div>
						<form onSubmit={handleSubmit}>
								<label htmlFor="box">Boxes</label>
								<input type="number" name="box" onChange={(e)=>setBoxes(e.target.value)} value={number_of_boxes}/>
								<label htmlFor="member">Family Members</label>
								<input type="number" name="member" onChange={(e)=>setMembers(e.target.value)} value={family_members}/>
								<label htmlFor="truck">Trucks</label>
								<input type="text" name="truck" onChange={(e)=>setTrucks(e.target.value)} value={truck_required}/>
								<button type='submit'>SUBMIT</button>
						</form>
						{error && <p className='post_error'>Fill all fields or there was a server Error. Try again later.</p>}
					</div>
					}
		</div>
	</div>
  )
}
