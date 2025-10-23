import React from 'react';
import Bike from './Bike';
import Chain from './Chain'; // <-- 1. Import the new Chain component
import "../components/Home.scss"

// 1. Accept the 'user' prop here
const Home = ({ user }) => {
  return (
	<div className='Dashboard'>
	  <h1 className='text-white'>Bike</h1>
	  
	  {/* 2. Pass the 'user' prop down to Bike */}
	  <div className='grid md:grid-cols-2 xl:grid-cols-5 gap-7'>
			<Bike user={user} />
		  <Chain user={user} />

	  </div>

	</div>
  )
}

export default Home