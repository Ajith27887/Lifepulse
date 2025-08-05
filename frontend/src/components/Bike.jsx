import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import usePostdata from "../components/lib.js"

const BikeOilMonitor = () => {
  const [startDate, setStartDate] = useState(null),
   [expireMonth, setExpireMonth] = useState(''),
   [alert, setAlert] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !expireMonth) {
      setAlert('Please fill in all fields.');
      return;
    }

	setAlert('')

    try {

	const value =	{
          startDate: startDate.toISOString(),
          expireMonth: Number(expireMonth),
    }

	const response = await usePostdata("bike",value)	

      const data = await response.json();

	  console.log(data,"response");
	  

      if (response.ok) {
		setAlert("✅ Data Saved")
        setStartDate(null);
        setExpireMonth('');
      } else {
        console.error("Error from server:", data);
      }
    } catch (error) {
      console.error("❌ Error Sending bike data to API:", error);
    }
  };

  return (
    <div className="bg-gray-800 shadow-xl text-white p-4 rounded max-w-md mx-auto">
      <h3 className="font-bold text-center text-xl mb-4">Engine Oil Monitor</h3>
      <form onSubmit={handleSubmit}>
        <div className='pt-7 space-y-5'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Service Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{
                textField: {
                  sx: {
                    width: "100%",
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
          <input
            type='number'
            placeholder='Expire Month (e.g., 3)'
            value={expireMonth}
            onChange={(e) => setExpireMonth(e.target.value)}
            className='p-3 w-full mt-5 border-2 bg-gray-800 border-white rounded text-white'
            step={1}
          />
        </div>
        <button type='submit' className='p-3 w-full mt-5 bg-red-500 text-white text-center rounded hover:bg-red-600 transition-colors'>
          Submit
        </button>
		<p className='mt-5'>{alert}</p>
      </form>
    </div>
  );
};

export default BikeOilMonitor;
