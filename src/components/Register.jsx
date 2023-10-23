import '../css/Login.css'
import TopComponent from './TopComponent'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useState } from 'react'
import Spinner from './Spinner'

export default function Register() {
	const navigate=useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [country, setCountry] = useState('');
	const [loading, setLoading] = useState(false);
	const [error,setError]=useState(false);
	
	const handleSubmit=async(e)=>{
		setLoading(true)
		e.preventDefault()
		const userData = {
			name,
			email,
			password,
			phone,
			address,
			country
		};
		axios
			.post("https://studentnest-eb6a68a9526b.herokuapp.com/account/register/",userData)
			.then(()=>{
				setLoading(false)
				// console.log(response.data);
				setName('');
				setEmail('');
				setPassword('');
				setPhone('');
				setAddress('');
				setCountry('');
				navigate('/properties');
			})
			.catch((error)=>{
				console.log(error.response.data.error)
				setError(true)
				setLoading(false)
			})
	}
  return (
	<div>
	<TopComponent/>
		<div className="login">
		{loading?<Spinner color={"#FFFFFF"}/>:
		<motion.div initial={{opacity:0,y:200}} animate={{opacity:1,y:0}} transition={{type: "spring",stiffness: 70}} className="login-main">
			<img src={logo} alt="" />
			<h1>REGISTER</h1>
			<form onSubmit={handleSubmit}>
			<input type="text" name='name' placeholder='Name' onChange={(e)=>setName(e.target.value)} value={name}/>
				<input type="email" name='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
				<input type="password"  name='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
				<input type="number" name='phone' placeholder='Phone' onChange={(e)=>setPhone(e.target.value)} value={phone}/>
				<input type="text" name='address' placeholder='Address' onChange={(e)=>setAddress(e.target.value)} value={address}/>
				<input type="text" name='country' placeholder='Country' onChange={(e)=>setCountry(e.target.value)} value={country}/>
				<button type='submit'>REGISTER</button>
				{error && <p className='post_error'>Fill all fields or there was a server Error. Try again later.</p>}
			</form>
			<p>Already have an Account? <span onClick={()=>navigate('/login')}>Login</span></p>
		</motion.div>
		}
	</div>
		
	</div>
  )
}
