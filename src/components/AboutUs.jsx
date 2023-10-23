import { motion } from 'framer-motion'
import '../css/AboutUs.css'
import TopComponent from './TopComponent'

export default function AboutUs() {
  return (
	<div>
		<TopComponent head={"STUDENT NEST"} body={"PROPERTIES FOR STUDENTS."}/>
	<div className="aboutUs container">
		<section className='aboutUs-1'>
			<motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="aboutUs-1-image">
				<img src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
			</motion.div>
			<div className="aboutUs-1-info">
				<h1>About Us - Your College Housing Solution</h1>
				<span></span>
				<p>Welcome to StudentNest, your go-to platform for simplified student accommodation searches. We&#39;re dedicated to making college life easier by streamlining the housing hunt for students. Our mission is to empower you with affordable, convenient housing options near your university.</p>
				{/* <button>Read More</button> */}
			</div>
		</section>
		<section className='aboutUs-1'>
			<motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="aboutUs-1-image">
				<img src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
			</motion.div>
			<div className="aboutUs-1-info">
				<h1>Why Choose Us</h1>
				<span></span>
				<ul>
					<li><p><b>Comprehensive Listings</b> : We offer a diverse range of housing options to fit every budget and preference.<br /><br /></p></li>
					<li><p><b>Location Matters</b> : Find housing close to your university for a shorter commute.<br /><br /></p></li>
					<li><p><b>Budget-Friendly</b> : Explore a variety of price ranges to meet your financial needs.<br /><br /></p></li>
					<li><p><b>User-Friendly</b> : Our website is easy to navigate, simplifying the housing search.<br /><br /></p></li>
					<li><p><b>Expert Resources</b> : Access expert advice, tips, and guides to make informed housing decisions.</p></li>
				</ul>
				{/* <button>Read More</button> */}
			</div>
		</section>
		<section className='aboutUs-1'>
			<motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="aboutUs-1-image">
				<img src="https://images.pexels.com/photos/3288103/pexels-photo-3288103.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
			</motion.div>
			<div className="aboutUs-1-info">
				<h1>Our Vision</h1>
				<span></span>
				<p>We envision a stress-free housing search for every college student, providing a comfortable and convenient home as you focus on academics. <br /><br />
StudentNest is your partner in achieving a secure and inspiring college experience. We&#39;re here to simplify your housing search, so you can excel during your academic journey. <br /><br />
Thank you for choosing StudentNest. We look forward to being a part of your college adventure and helping you find the perfect place to call home.</p>
				{/* <button>Read More</button> */}
			</div>
		</section>
	</div>
	</div>
  )
}
