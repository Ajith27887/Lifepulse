import React from 'react';
import Bike from './Bike';
import "../components/Home.scss"

const Home = () => {
  return (
	<div className='Dashboard'>
	  <h1 className='text-white'>Bike</h1>
	  <Bike/>
	</div>
  )
}

export default Home
