import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../Homepage/Hero'
import SearchOffences from '../Homepage/SearchOffences'


const Homepage = () => {
  return (
    <div className=''>
      <Navbar />
      <Hero />
      <SearchOffences />
    </div>
  )
}

export default Homepage
