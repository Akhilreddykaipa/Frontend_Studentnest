import { useEffect, useState } from 'react';
import '../css/Payment.css'
import TopComponent from './TopComponent'
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Spinner from './Spinner';
import cvv from "../assets/cvv.svg"

export default function Payment() {
	const limit_2=2;
	const limit_10=10;

	const {id} =useParams()
	const location=useLocation();
	const navigate=useNavigate()
	const [card_no,setCardNo]=useState('');
	const [month,setMonth]=useState('');
	const [year,setYear]=useState('');
	const [name_on_card,setCardName]=useState('');
	const [price,setPrice]=useState('');
	const [loading,setLoading]=useState(true);
	const [accessToken,setAccessToken]=useState('');
	const [user,setUser]=useState();
	const [listing,setListing]=useState();
	const [error,setError]=useState(false);
	const [image,setImage]=useState("");
	const [title,setTitle]=useState("");
	useEffect(()=>{
		window.scrollTo(0, 0);
		// setListing(location.state.id)
		// setPrice(location.state.price)
		setAccessToken(localStorage.getItem("access_token"))
		axios
			.get("https://studentnest-eb6a68a9526b.herokuapp.com/account/profile/",{
				headers: {
					'Authorization':`Bearer ${accessToken}`
				}
			})
			.then((response)=>{
				setUser(response.data.id)
				setLoading(false);
			})
			.catch((error)=>{
				console.log(error.response.data)
				setLoading(false)
			})
		
		axios
			.get(`https://studentnest-eb6a68a9526b.herokuapp.com/listing/get-listing/${id}/`,{
				headers: {
					'Authorization':`Bearer ${accessToken}`
				}
			})
			.then((response)=>{
				console.log(response.data)
				setListing(response.data.id)
				setPrice(response.data.price)
				setImage(response.data.photo_main)
				setTitle(response.data.title)
				setLoading(false);
			})
			.catch((error)=>{
				console.log(error.response.data)
				setLoading(false)
			})	
	},[accessToken])

	const handleSubmit=(e)=>{
		e.preventDefault()
		const userData={
			listing,
			user,
			price,
			card_no,
			month,
			year,
			name_on_card
		};

		axios
			.post("https://studentnest-eb6a68a9526b.herokuapp.com/booking/payment/",userData,{
				headers: {
					'Authorization':`Bearer ${accessToken}`
				}
			})
			.then((response)=>{
				alert(response.data.message)
				navigate("/profile")
				setLoading(false)
			})
			.catch((error)=>{
				console.log(error.response.data)
				setError(true)
				setLoading(false)
			})
	}
  return (
	<div>
		<TopComponent head={"PAYMENT"} />
		<div className="payment conatiner">
			{loading?<Spinner color={"#000000"}/>:<div className="payment-main">
						<div className="payment-main-info">
							<div className="payment-main-info-left">
								<img src={image} alt="" />
							</div>
							<div className="payment-main-info-right">
								<h2>{title}</h2>
								<p>${price}</p>
							</div>
						</div>
						<form onSubmit={handleSubmit}>
							<h3>Card Details</h3>
								<input type="number" name="card_number" placeholder='CARD NUMBER'  onChange={(e)=>setCardNo(e.target.value.slice(0,limit_10))} value={card_no}/>
								<div className="payment-form-year">
									<input type="number" name="card_month" placeholder='MM' onChange={(e)=>setMonth(e.target.value.slice(0,limit_2))} value={month}  required/>
									<input type="number" name='card_year' placeholder='YY' onChange={(e)=>setYear(e.target.value.slice(0,limit_2))} value={year} required/>
									<img src={cvv} alt="" />
									<input type="password" name='card_cvv' placeholder='CVV' maxLength="3"  required/>
								</div>
								<input type="text" name='card_name' placeholder='NAME ON CARD' onChange={(e)=>setCardName(e.target.value)} value={name_on_card} required/>
							<button type='submit'>MAKE PAYMENT</button>
						</form>
						{error && <p className='post_error'>Fill all fields or there was a server Error. Try again later.</p>}
					</div>
					}
		</div>
		</div>
  )
}
