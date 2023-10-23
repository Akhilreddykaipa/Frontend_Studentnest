import '../css/Properties.css'
import TopComponent from './TopComponent'
import location from '../assets/location.svg'
import heart from '../assets/heart.svg'
import tub from '../assets/tub.svg'
import bed from '../assets/bed.svg'
import measure from '../assets/measure.svg'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'


export default function Properties() {
	const [bedrooms,setBedroom]=useState('');
	const [state,setState]=useState('');
	const [bathrooms,setBathroom]=useState('');
	const [houseSquareYard,sethousesqyd]=useState('');
	const [description,setDescription]=useState('');
	const [price,setPrice]=useState('');
	const [garage,setGarage]=useState('');
	const [garden,setGarden]=useState('');

	const navigate=useNavigate();

	const [data,setData]=useState();
	const [loading,setLoading]=useState(true);
	const [accessToken,setAccessToken]=useState("");
	
	useEffect(()=>{
		setAccessToken(localStorage.getItem("access_token"))
		axios
			.get("https://studentnest-eb6a68a9526b.herokuapp.com/listing/get-listing/",{
				headers: {
				'Authorization':`Bearer ${accessToken}`
				}
			})
			.then((response)=>{
				setData(response.data);
				setLoading(false)
			})
			.catch((error)=>{
				console.log(error.response.data)
				setLoading(false)
			})
	},[accessToken])

const handleSearch=()=>{
	setLoading(true)
	setData(null);
	const paramObject={
		garden,
		bedrooms,
		state,
		bathrooms,
		garage,
		houseSquareYard,
		description,
		price,
	}
	console.log(paramObject)
	const paramArray=[];

	for(const key in paramObject){
		if(paramObject[key]){
			paramArray.push(`${key}=${paramObject[key]}`)
		}
	}

	const queryString = paramArray.join("&");
	console.log(`https://studentnest-eb6a68a9526b.herokuapp.com/listing/search/?${queryString}`)
	axios
		.get(`https://studentnest-eb6a68a9526b.herokuapp.com/listing/search/?${queryString}`,{
			headers: {
			'Authorization':`Bearer ${accessToken}`
		}
			})
		.then((response)=>{
			setData(response.data);
			setBedroom('');
			setState('');
			setBathroom('');
			sethousesqyd('');
			setDescription('');
			setPrice('');
			setGarage('');
			setLoading(false)
		})
		.catch((error)=>{
			console.log(error.response.data)
			setLoading(false)
		})
		
}	
  return (
	<div>
	<TopComponent head={"ALL PROPERTIES"} body={"Properties for the Students"}/>
	<div className="properties-search container">
			<input type="number" name="search" placeholder='Bedrooms' autoComplete="off" onChange={(e)=>setBedroom(e.target.value)} value={bedrooms}/>
			<input type="text" name="search" placeholder='State' autoComplete="off" onChange={(e)=>setState(e.target.value)} value={state}/>
			<input type="number" name="search" placeholder='Bathroom' autoComplete="off" onChange={(e)=>setBathroom(e.target.value)} value={bathrooms}/>
			<input type="number" name="search" placeholder='House Square Yard' autoComplete="off" onChange={(e)=>sethousesqyd(e.target.value)} value={houseSquareYard}/>
			<input type="text" name="search" placeholder='Description' autoComplete="off" onChange={(e)=>setDescription(e.target.value)} value={description}/>
			<input type="number" name="search" placeholder='Price' autoComplete="off" onChange={(e)=>setPrice(e.target.value)} value={price}/>
			<select id="cars" name="Garrage" onChange={(e)=>setGarage(e.target.value)} value={garage}>
					<option value="">Want Garage?</option>
					<option value="true">Yes</option>
					<option value="false">No</option>
			</select>
			<select id="cars" name="Garrage" onChange={(e)=>setGarden(e.target.value)} value={garden}>
					<option value="">Want Garden?</option>
					<option value="true">Yes</option>
					<option value="false">No</option>
			</select>
			<button onClick={handleSearch}>Search</button>
		</div>
	<div className="properties container">
		{loading?<Spinner color={"#808080"}/>:data ? data.map((data)=>{
			return(
		<motion.div initial="hidden"
		whileInView="visible"
		viewport={{ once: true }}
		transition={{ duration: 0.3 }}
		variants={{
		visible: { opacity: 1, scale: 1 },
		hidden: { opacity: 0, scale: 0.7 }
		}} key={data.id} className="properties-main" onClick={()=>navigate('/property',{state:data})}>
			<div  className="properties-main-top">
				<img src={data.photo_main} alt="" />
				<div className="properties-main-top-info">
					<h3>${data.price}</h3>
					<p><img src={location} alt=""/>{data.address},{data.city}</p>
				</div>
			</div>
			<div className="properties-main-bottom">
				<div className="properties-main-bottom-fav">
					<img src={heart} alt="" />
				</div>
				<div className="properties-main-bottom-info">
					<p>{data.title},{data.state}</p>
					<span></span>
					<div className="properties-main-bottom-info-main">
						<div className="properties-main-bottom-info-main-left">
							<div className="properties-main-bottom-info-main-box">
								<img src={tub} alt="" />
								<p>{data.bathrooms}</p>
							</div>
							<div className="properties-main-bottom-info-main-box">
								<img src={bed} alt="" />
								<p>{data.bedrooms}</p>
							</div>
						</div>
						<div className="properties-main-bottom-info-main-right">
									<img src={measure} alt="" />
									<p>{data.houseSquareYard} sqyd</p>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
			)
		}):<h3>No Properties Found</h3>}
		
	</div>
	</div>
  )
}
