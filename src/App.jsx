import { useState } from 'react'
import Homepage from './pages/Homepage'
import { Routes, Route } from 'react-router-dom'
import OfficerLogin from './pages/OfficersLogin'
import OfficerDashboard from './pages/OfficerDashboard'
import AddOffence from './components/Dashboard/AddOffence'
import DriversLogin from './pages/DriversLogin'
import DriverDashboard from './components/Dashboard/DriverDashboard'



function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/officer-login' element={<OfficerLogin />} />
        <Route path='/officer-dashboard' element={<OfficerDashboard />} />
        <Route path="/add-offence" element={<AddOffence />} />
        <Route path="/driver-login" element={<DriversLogin />} />
        <Route path='/driver-dashboard' element={<DriverDashboard />} />
      </Routes>
     
    </div>
  )
}


export default App
