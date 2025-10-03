import React from 'react';
import BikeOilMonitor from './Bike';
import "../components/Home.scss"

const Home = () => {
  return (
	<div className='Dashboard'>
	  <h1>Widgets</h1>
	  <BikeOilMonitor/>
	</div>
  )
}

export default Home
