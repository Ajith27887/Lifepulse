import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = () => {

	const category = ['Bike','Dog', 'Parents']
  return (
	<div style={{backgroundColor : "#F4F6F8"}} className='text-black text-center p-5 h-[100vh] sticky'>
		<div className=''>
			{category?.map(data => {
					return (
						<Link to={data} className='block mt-6 font-bold bg-gray-50 p-5 hover:bg-amber-100 text-gray-500'>
							<Link to={data} > {data} </Link>
						</Link>
					)
				})
			}
		</div>
	</div>
  )
}

export default SideNav
