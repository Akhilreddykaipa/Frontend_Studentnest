import '../css/Login.css'
import TopComponent from './TopComponent'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from "../app/User"
import Spinner from './Spinner'
export default function Login() {
	const dispatch=useDispatch()
	const navigate=useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error,setError]=useState(false);

	const handleSubmit=async(e)=>{
		setLoading(true)
		e.preventDefault()
		const userData = {
			email,
			password,
		};
		axios
			.post("https://studentnest-eb6a68a9526b.herokuapp.com/account/login/",userData)
			.then((response)=>{
				setLoading(false)
				// console.log(response.data.tokens.access);
				localStorage.setItem('access_token',response.data.tokens.access)
				dispatch(userLogin())
				setEmail('');
				setPassword('');
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
				<h1>LOGIN</h1>
				<form onSubmit={handleSubmit}>
					<input type="text" name='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email} />
					<input type="password"  name='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
					<button type='submit'>LOGIN</button>
					{error && <p className='post_error'>Fill all fields or there was a server Error. Try again later.</p>}
				</form>
				<p><span><a href="https://studentnest-eb6a68a9526b.herokuapp.com/account/password_reset/" target='_blank' rel="noreferrer">Forgot Password?</a></span></p>
				<p>Don&#39;t have an Account? <span onClick={()=>navigate('/register')}>Register Now</span></p>
			</motion.div>
}
		</div>
	</div>
  )
}
