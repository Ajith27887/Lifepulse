import React from 'react';
import { useEffect } from 'react';

const BikeOilMonitor = () => {


	useEffect(() => {
		const fetchBikeReminders = async () => {
			try {
				const res = await fetch("http://localhost:8000/bike", {
				method: "POST",
				headers: {
		          "Content-Type": "application/json"
		        },
			});
				const json = await res.json();
				console.log(json, "bike");
			} catch (err) {
    			  console.error("❌ Error fetching bike data:", err);
			}
		};

		fetchBikeReminders();
	}, []);


  return (
    <div className="grid grid-cols-4 gap-4  w-full">
		<p> hi</p>
		{/* {
			category.map((data, i) => {	
				return(
					<div key={i} className='bg-gray-800 shadow-xl text-white p-4 rounded'> { data } </div>
				)
			})
		} */}
    </div>
  );
};

export default BikeOilMonitor;