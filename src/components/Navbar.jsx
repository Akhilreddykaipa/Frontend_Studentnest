import '../css/Navbar.css'
import logo from "../assets/logo.png"
import ham from '../assets/ham.svg'
import x from '../assets/x.svg'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'



export default function Navbar() {
	const navigate=useNavigate();
	const [mobileView,setMobileView]=useState(false);
	const user=localStorage.getItem("access_token")

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	
  return (
	<div>
		<div className="navbar container">
			<div className="navbar-logo">
				<img src={logo} alt="" />
			</div>
			<div className="navbar-menu">
				<motion.ul animate={{y:mobileView?"-30%":"-10%"}}>
					<Link to={'/'} style={{textDecoration:"none",color:"white"}}><li>About</li></Link>
					<Link to={'/properties'} style={{textDecoration:"none",color:"white"}}><li>Properties</li></Link>
					<Link to={'/contactus'} style={{textDecoration:"none",color:"white"}}><li>Contact Us</li></Link>
					{user?<button onClick={()=>navigate('/profile')
					}>Profile</button>:<button onClick={()=>navigate('/login')}>Login/Register</button>}
				</motion.ul>
			</div>
			<div className="ham" onClick={()=>setMobileView(!mobileView)}>
				<img src={mobileView?x:ham} alt="" />
		</div>
		</div>
		
	</div>
  )
}
