import { useState } from 'react';
import usePostdata from "../components/lib.js"
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

import "../components/Bike.scss"

const Bike = () => {
  const [startDue, setStartDue] = useState(false),
   [alert, setAlert] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();	
    try {
		const expireMOnth = 3;

		const DueDate = new Date();
		DueDate.setMonth(DueDate.getMonth() + expireMOnth)

		const datePayload = {
            DueDate: DueDate.toISOString() // Properly format date for API
        };
		
		const response = await usePostdata("bike", datePayload)	

		const data = await response.json();

		  console.log(data,"response");
		if (response.ok) {
			setAlert("✅ Data Saved")
			setStartDue(true);
		} else {
			console.error("Error from server:", data);
		}
	} catch (error) {
	  console.error("❌ Error Sending bike data to API:", error);
	}
  };

  return (
	<div className='grid md:grid-cols-2 xl:grid-cols-5 gap-7 mt-5' >
		<div  className="card AddCard">
			<div className='grid grid-cols-2 justify-center'>
				<TwoWheelerIcon style={{ fontSize : "100px" }}/>
				<div>
	    		  	<h3 className="font-bold float-start text-start text-xl">Bike Oil Health</h3>
					<p className='text-gray-400'>Last changed : </p>
				</div>
			</div>
	        <div className='space-y-5 mt-3'>
				<button onClick={handleSubmit} className={`p-3 w-full ${startDue ? "bg-green" : ""}`}>Mark as Serviced</button>
	        </div>
			    <button type='submit' className='p-3 w-full mt-4  text-white text-center rounded hover:bg-red-600 transition-colors'>
	          Chat With Family
	        </button>
	        <button type='submit' className='p-3 w-full mt-4  text-white text-center rounded hover:bg-red-600 transition-colors'>
	          Submit
	        </button>
			<p className='mt-5'>{alert}</p>
   		</div>
		<div className='card AddCard flex justify-center items-center rounded-lg'>
			<ControlPointIcon className='text-lg'/>
		</div>
	</div>
  );
};

export default Bike;
