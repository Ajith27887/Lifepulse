import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const BikeOilMonitor = () => {
  const [reminders, setReminders] = useState([]),
  	[startDates, setStartDates] = useState(''),
	[expireMonth, setExpireMonth] = useState(''),
	handleEngine = (value,  type) => {
		if (type === 'Date') {
			setStartDates(value)
		}else if(type === 'interval'){
			setExpireMonth(value)
		}
		console.log("HI", startDates,expireMonth);

	},
	handleSumbmit = (e) => {
		console.log("HI", startDates,expireMonth);
		
		try {
			fetch("http://localhost:8080/bike", {
				method : 'POST',
				headers : {
				'Content-type' : "applications/json"
				},
				body : JSON.stringify({
					startDate : startDates,
					expireMonth : expireMonth
				}),
			}).then((res) => res.json())
			.then(data =>{
				console.log("success",data );
				setStartDates("");
				setExpireMonth("");
				alert("🎉 Your data has been added successfully!")
			})

		} catch (error) {
			console.log("❌ Error Sending bike data to API:",error);
		}
	} 

  useEffect(() => {
    const fetchBikeReminders = async () => {
		console.log("clicked");
		
      try {
        const res = await fetch("http://localhost:8080/bike");
        const json = await res.json();
        setReminders(json);
		console.log(json,"json");
		
      } catch (err) {
        console.error("❌ Error fetching bike data:", err);
      }
    };

    fetchBikeReminders();
  }, []);

  console.log(reminders,"reminders");
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {reminders &&
        reminders.map((data, i) => (
          <div
            key={i || Math.random()}
            className="bg-gray-800 shadow-xl text-white p-4 rounded "
          >
            <h3 className="font-bold text-center">{data || "No Title"}</h3>
			<div className='pt-7'>
				<LocalizationProvider  dateAdapter={AdapterDayjs}>
	              <DatePicker
	                value={startDates[i]}
	                onChange={(newValue) => handleEngine(newValue,"Date")}
	                slotProps={{
	                  textField: {
	                    sx: {
						width : "100%",			
	                      backgroundColor: 'white',
	                      borderRadius: 1,
	                      '& .MuiOutlinedInput-root': {
	                        '& fieldset': {
	                          borderColor: 'white',
	                        },
	                        '&:hover fieldset': {
	                          borderColor: 'white',
	                        },
	                       '&.Mui-focused fieldset': {
	                       borderColor: 'white',
	                        },
	                      },
	                      '& .MuiInputBase-input': {
	                        color: 'black',
	                      },
	                      '& .MuiSvgIcon-root': {
	                        color: 'black',
	                      },
	                    },
	                  },
	                }}
	              />
	            </LocalizationProvider>
				<input type='number' onChange={(e) => handleEngine(e.target.value,"interval" )} className=' p-2 w-full border-2 mt-5 text-white'  step={30} />
			</div>

			<button type='submit' className='p-3 w-full mt-3 bg-red-500 text-white text-center' onClick={(e) => handleSumbmit(e)}>Submit</button>

          </div>
        ))}
    </div>
  );
};

export default BikeOilMonitor;
