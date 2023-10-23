import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AboutUs from './components/AboutUs'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Properties from './components/Properties'
import Login from './components/Login'
import Register from './components/Register'
import SingleProperty from './components/SingleProperty'
// import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from './app/User'
import ContactUs from './components/ContactUs'
import Profile from './components/Profile'
import Booking from './components/Booking'
import Payment from './components/Payment'
// import UpdateBooking from './components/UpdateBooking'
import Transportation from './components/Transportation'
import Lenis from '@studio-freight/lenis'

function App() {
  const lenis = new Lenis()

lenis.on('scroll', () => {
  // console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
  const dispatch=useDispatch();
  dispatch(userLogin())
  

  const user =useSelector((state)=>state.user.user)
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<AboutUs/>}/>
        <Route path='/properties' element={user?<Properties/>:<Navigate to={'/login'} />}/>
        <Route path='/login' element={!user?<Login/>:<Navigate to={'/'}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/property' element={<SingleProperty/>}/>
        <Route path='/contactus' element={user?<ContactUs/>:<Navigate to={'/login'} />}/>
        <Route path='/profile' element={user?<Profile/>:<Navigate to={'/login'}/>}/>
        <Route path='/booking' element={user?<Booking/>:<Navigate to={'/login'} />}/>
        <Route path='/payment/:id' element={user?<Payment/>:<Navigate to={'/login'} />}/>
        {/* <Route path='/updatebooking' element={user?<UpdateBooking/>:<Navigate to={'/login'} />}/> */}
        <Route path='/transportation' element={user?<Transportation/>:<Navigate to={'/login'} />}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
