import './App.css'
import Login from  './pages/authentication/Login.jsx'
import Signup from './pages/authentication/Signup.jsx'
import ForgotPassword from './pages/authentication/ForgotPassword.jsx'
import HomePage from './pages/main/HomePage.jsx'
import Features from './pages/main/Features.jsx'
import Pricing from './pages/main/Pricing.jsx'
import Purchase from './pages/main/Purchase.jsx'
import ContactUs from './pages/main/ContactUs.jsx'
import AboutUs from './pages/main/AboutUs.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/signup' element={<Signup />}/>
      
        <Route path='/home-page' element={<HomePage />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/features' element={<Features />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/purchase' element={<Purchase />} />
      </Routes>
    </>
  )
}

export default App