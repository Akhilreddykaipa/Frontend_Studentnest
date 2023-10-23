import { motion } from "framer-motion"
import '../css/TopComponent.css'

export default function TopComponent({head,body}) {
  return (
	<div>
		<div className="topComponent">
			<section className='topComponent-main'>
			<motion.h1 initial={{opacity:0,y:200}} animate={{opacity:1,y:0}} transition={{type: "spring",stiffness: 70}}>{head}</motion.h1>
			<motion.p initial={{opacity:0,y:200}} animate={{opacity:1,y:0}} transition={{type: "spring",stiffness: 70}}>{body}</motion.p>
			</section>
		</div>
	</div>
  )
}
