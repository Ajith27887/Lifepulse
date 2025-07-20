import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';




const BikeOilMonitor = () => {
  const [reminders, setReminders] = useState([]);
  const [startDates, setStartDates] = useState({});

  const handleStartDate = (data, index, title) => {
    setStartDates((prev) => ({
      ...prev,
      [index]: data,
    }));
  };

  useEffect(() => {
    const fetchBikeReminders = async () => {
		console.log("clicked");
		
      try {
        const res = await fetch("http://localhost:8080/bike");
        const json = await res.json();
        setReminders(json);
        const initialDates = {};
        json.forEach((_, i) => {
          initialDates[i] = null;
        });
        setStartDates(initialDates);
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
	                onChange={(newValue) => handleStartDate(newValue,i)}
	                slotProps={{
	                  textField: {
	                    sx: {
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
			</div>

          </div>
        ))}
    </div>
  );
};

export default BikeOilMonitor;
