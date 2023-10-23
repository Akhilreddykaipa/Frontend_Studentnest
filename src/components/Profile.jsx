import { useEffect, useState } from 'react'
import '../css/Profile.css'
import TopComponent from './TopComponent'
import axios from 'axios';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../app/User';
// import edit from '../assets/edit.svg'
import del from '../assets/delete.svg'
import truck from '../assets/truck.svg'
import profile from '../assets/profile.png'
import correct from '../assets/correct.svg'
import wrong from '../assets/wrong.svg'


export default function Profile() {
	const dispatch=useDispatch();
	const navigate=useNavigate();

	const [name,setName]=useState('');
	const [email,setEmail]=useState('');
	const [phone_no,setPhone]=useState('');
	const [address,setAddress]=useState('');
	const [state,setState]=useState('');
	const [country,setCountry]=useState('');
	const [loading,setLoading]=useState(false);
	const [accessToken,setAccessToken]=useState('');
	const [data,setData]=useState("");
	const [paymentStatus,setPaymentStatus]=useState(false);
	const [error,setError]=useState(false);

	useEffect(()=>{
		window.scrollTo(0, 0);
		setAccessToken(localStorage.getItem("access_token"))
		setLoading(true)
		axios
			.get("https://studentnest-eb6a68a9526b.herokuapp.com/account/profile/",{
				headers: {
					'Authorization':`Bearer ${accessToken}`
				}
			})
			.then((response)=>{

				setName(response.data.name);
				setEmail(response.data.email);
				setPhone(response.data.phone_no);
				setAddress(response.data.address);
				setState(response.data.state);
				setCountry(response.data.country);
				setLoading(false);

			})
			.catch((error)=>{
				console.log(error.response.data)
				setLoading(false)
			})

		axios
			.get("https://studentnest-eb6a68a9526b.herokuapp.com/booking/booking/",{
				headers: {
					'Authorization':`Bearer ${accessToken}`
				}
			})
			.then((response)=>{
				setData(response.data)
				setPaymentStatus(response.data.payment_status)
				console.log(response.data)
				setLoading(false)
			})
			.catch((error)=>{
				console.log(error.response.data)
				setLoading(false)
			})

	// 		axios
	// 		.get("https://studentnest-eb6a68a9526b.herokuapp.com/booking/payment/",{
	// 			headers: {
	// 				'Authorization':`Bearer ${accessToken}`
	// 			}
	// 		})
	// 		.then((response)=>{
	// 			console.log(response.data)
	// 			// setData(response.data.status)
	// 			setLoading(false)
	// 		})
	// 		.catch((error)=>{
	// 			console.log(error.response.data)
	// 			setLoading(false)
	// 		})	

	},[accessToken])

	const handleSubmit=(e)=>{
		setLoading(true)
		e.preventDefault()
		const userData = {
			name,
			email,
			phone_no,
			address,
			state,
			country
		};
		axios
			.patch("https://studentnest-eb6a68a9526b.herokuapp.com/account/update-profile/",userData,{
				headers: {
					'Authorization':`Bearer ${accessToken}`
				}
			})
			.then(()=>{
				setLoading(false)
			})
			.catch((error)=>{
				console.log(error.response.data)
				setLoading(false)
			})
	}

	const handleDelete=(id)=>{
		setLoading(true)
		axios
			.delete(`https://studentnest-eb6a68a9526b.herokuapp.com/booking/booking/${id}/`,{
				headers: {
					'Authorization':`Bearer ${accessToken}`
				}
			})
			.then(()=>{
				location.reload();
				setLoading(false);
			})
			.catch((error)=>{
				console.log(error.response.data)
				setError(true)
				setLoading(false)
			})
	}
  return (
	<div>
		<TopComponent head={"PROFILE"}/>
		<div className="profile conatiner">
			{loading?<Spinner color={"#000000"}/>:
				<>
<div className="profile-top">
				<div className="profile-top-left">
					<div className="profile-top-image">
						<img src={profile} alt="" />
					</div>
					<h3>{name}</h3>
					<h3>{email}</h3>
					<p>{state},{country}</p>
				</div>
				<div className="profile-top-right">
					<form>
						<div className="profile-top-right-form-input">
							<label htmlFor="name">Name</label>
							<input type="text" name='name' onChange={(e)=>setName(e.target.value)} value={name}/>
						</div>
						<div className="profile-top-right-form-input">
							<label htmlFor="email">Email</label>
							<input type="text" name='email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
						</div>
						<div className="profile-top-right-form-input">
							<label htmlFor="phone">Phone Number</label>
							<input type="number" name='phone' onChange={(e)=>setPhone(e.target.value)} value={phone_no}/>
						</div>
						<div className="profile-top-right-form-input">
							<label htmlFor="address">Address</label>
							<input type="text" name='address' onChange={(e)=>setAddress(e.target.value)} value={address}/>
						</div>
						<div className="profile-top-right-form-input">
							<label htmlFor="state">State</label>
							<input type="text" name='state' onChange={(e)=>setState(e.target.value)} value={state}/>
						</div>
						<div className="profile-top-right-form-input">
							<label htmlFor="country">Country</label>
							<input type="text" name='country' onChange={(e)=>setCountry(e.target.value)} value={country}/>
						</div>
					</form>
					<button type='submit' onClick={handleSubmit}>Update Profile</button>
					{error && <p className='post_error'>Fill all fields or there was a server Error. Try again later.</p>}
				</div>
				<button onClick={()=>{
					dispatch(userLogout());
					navigate("/")
				}}>Logout</button>
			</div>
			<div className="profile-bottom">
				{data?
				<>
				<h1>My Bookings</h1>
					<div className="profile-bottom-main">
						{loading?<Spinner/>: data.map((data)=>{
							return (
						<div key={data.id} className="profile-bottom-main-main">
								<div className="profile-bottom-main-main-top">
									<img src={data.listing.photo_main} alt="" />
								</div>
								<div className="profile-bottom-main-main-bottom">
									<div className="profile-bottom-main-main-bottom-left">
											<p>{data.listing.title}</p>
											<p>Price : {data.listing.price}</p>
											<p>Name : {data.name}</p>
											<p>Ph No : {data.phone_no}</p>
											<p>ID Card : {data.id_card}</p>
									</div>
									<span></span>
									<div className="profile-bottom-main-main-bottom-right">
											{/* <button onClick={()=>navigate("/updatebooking",{state:data})}><img src={edit} alt="" />UPDATE</button> */}
											{paymentStatus?<button>PAYMENT STATUS : <img src={correct} alt="" /></button>:<button onClick={()=>navigate(`/payment/${data.listing.id}`)}>PAYMENT STATUS : <img src={wrong} alt="" /></button>}
											<button onClick={()=>handleDelete(data.id)}><img src={del} alt="" />DELETE</button>
											<button onClick={()=>navigate("/transportation",{state:data})}><img src={truck} alt="" />TRANSPORTATION</button>
									</div>
								</div>
						</div>
							)
						})
						}	
					</div>
					</>:<h1>No Bookings Done Yet</h1>}
			</div>
				</>
			}
		</div>
	</div>
  )
}
