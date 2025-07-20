import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = () => {

	const category = [
		{ name: 'Home', path: '/' },
		{ name: 'Bike', path: '/bike' },
		{ name: 'Dog', path: '/dog' }
	]
	const handleClick = (path) => {
		console.log("path",path);
		
	}
  return (
	<div style={{backgroundColor : "#F4F6F8"}} className='text-black text-center p-5 h-[100vh] sticky'>
		<div className=''>
			{category?.map((data, i) => {
					return (
						<Link to={data.path} onClick={() => handleClick(data.path)} key={i} className='block mt-6 font-bold bg-gray-50 p-5 hover:bg-amber-100 text-gray-500'>
							{data.name}
						</Link>
					)
				})
			}
		</div>
	</div>
  )
}

export default SideNav
