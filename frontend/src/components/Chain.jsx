import { useState, useEffect } from 'react';
import usePostdata from "../components/lib.js"; 
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import InsertLinkIcon from '@mui/icons-material/InsertLink'; // <-- 1. Import Chain Icon

import "../components/Chain.scss"; // <-- 2. Import new SCSS file

// (Your useGetData and useDeleteData helper functions would be here)
// (Copy them from Bike.jsx if they aren't in a shared file)
const useGetData = async (api) => { /* ... */ };
const useDeleteData = async (api) => { /* ... */ };


const Chain = ({ user }) => { // <-- 3. Rename component
    const [startDue, setStartDue] = useState(false);
    const [alert, setAlert] = useState('');
    const [lastServicedDate, setLastServicedDate] = useState(null); 
    const [dueDate, setDueDate] = useState(null); 
    const [oilHealthPercentage, setOilHealthPercentage] = useState(100); 
    
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // --- 4. Change interval logic ---
    const serviceIntervalDays = 14; // Chain lube every 14 days

    useEffect(() => {
        if (alert) { 
            const timer = setTimeout(() => { setAlert(''); }, 3000); 
            return () => clearTimeout(timer);
        }
    }, [alert]); 

    // Calculate progress (no changes needed)
    const calculateProgress = (lastService, nextDue) => {
        if (!lastService || !nextDue) return 100; 
        const lastServiceTime = new Date(lastService).getTime();
        const nextDueTime = new Date(nextDue).getTime();
        const nowTime = new Date().getTime();
        const totalDuration = nextDueTime - lastServiceTime;
        const elapsedTime = nowTime - lastServiceTime;
        if (totalDuration <= 0 || nowTime >= nextDueTime) return 0; 
        if (nowTime <= lastServiceTime) return 100; 
        const remainingPercentage = Math.max(0, 100 - (elapsedTime / totalDuration) * 100);
        return Math.round(remainingPercentage);
    };

     // Fetch data
    useEffect(() => {
        const fetchLatestChainData = async () => { // <-- 5. Rename function
            if (user && user.uid) { 
                // --- 6. Change API endpoint ---
                const data = await useGetData(`chain/latest/${user.uid}`); 
                
                if (data && data.startDue && data.endDue) {
                    const fetchedLastServiced = new Date(data.startDue); 
                    const fetchedDueDate = new Date(data.endDue); 
                    setLastServicedDate(fetchedLastServiced);
                    setDueDate(fetchedDueDate);
                    setOilHealthPercentage(calculateProgress(fetchedLastServiced, fetchedDueDate));
                    setStartDue(true);
                } else {
                    setLastServicedDate(null);
                    setDueDate(null);
                    setOilHealthPercentage(100); 
                    setStartDue(false); 
                    console.log("No previous chain data found for this user.");
                }
            } else {
                setLastServicedDate(null);
                setDueDate(null);
                setOilHealthPercentage(100);
                setStartDue(false);
            }
        };
        fetchLatestChainData(); // <-- 5. Rename function
    }, [user]); 

    useEffect(() => {
        setOilHealthPercentage(calculateProgress(lastServicedDate, dueDate));
    }, [lastServicedDate, dueDate]);


    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.uid) {
            setAlert("❌ You must be logged in to save data.");
            return;
        }
        setIsLoading(true);
        let response; 
        try {
            const currentServiceDate = new Date(); 
            const newDueDate = new Date(currentServiceDate);
            // --- 7. Change date logic ---
            newDueDate.setDate(currentServiceDate.getDate() + serviceIntervalDays);

            const datePayload = {
                startDue: currentServiceDate.toISOString(), 
                endDue: newDueDate.toISOString(),       
                userId: user.uid                        
            };
            // --- 8. Change API endpoint ---
            response = await usePostdata("chain", datePayload); 
            
            if (response.ok) {
                const data = await response.json(); 
                setAlert("✅ Lube Data Saved"); 
                setLastServicedDate(currentServiceDate); 
                setDueDate(newDueDate); 
                setOilHealthPercentage(100); 
                setStartDue(true);
            } else {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (parseError) {
                    errorData = { error: `Server responded with status: ${response.status}` };
                }
                setAlert(`❌ Error: ${errorData.error || 'Failed to save'}`); 
            }
        } catch (error) {
            setAlert("❌ Error connecting to server."); 
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Clear Data
    const handleClearData = async () => {
        if (!window.confirm("Are you sure you want to clear all chain lube data?")) {
            return;
        }
        if (!user || !user.uid) {
            setAlert("❌ You must be logged in.");
            return;
        }
        setIsDeleting(true);
        try {
            // --- 9. Change API endpoint ---
            const response = await useDeleteData(`chain/clear/${user.uid}`);

            if (response && response.ok) {
                setAlert("✅ Lube data cleared.");
                setLastServicedDate(null);
                setDueDate(null);
                setOilHealthPercentage(100);
                setStartDue(false);
            } else {
                setAlert(`❌ Error: Failed to clear data.`);
            }
        } catch (error) {
            setAlert("❌ Error connecting to server.");
        } finally {
            setIsDeleting(false);
        }
    };

    // Button disabling logic (no changes)
    const today = new Date();
    const isServicedToday = lastServicedDate && 
                           (lastServicedDate.toDateString() === today.toDateString());
    const isButtonDisabled = isLoading || isServicedToday || isDeleting;

    // Progress bar styles (no changes)
    const progressBarStyle = { /* ... */ };
    const progressBarInnerStyle = { /* ... */ };

    return (
        // --- 10. Change text & icons ---
        <div className=' mt-5'>
            <div className="card AddCard chain-card"> {/* <-- Add new class */}
                <div className='grid grid-cols-2 justify-center items-center'>
                    {/* --- Add chain-icon class for animation --- */}
                    <InsertLinkIcon className="chain-icon" style={{ fontSize: "100px" }} />
                    <div>
                        <h3 className="font-bold float-start text-start text-xl">Chain Lube Status</h3>
                        <p className='text-gray-400 text-sm'>
                            Last lubed: {lastServicedDate ? lastServicedDate.toLocaleString() : 'N/A'}
                        </p>
                        <p className='text-gray-400 text-sm'>
                            Next lube due: {dueDate ? dueDate.toLocaleString() : 'N/A'}
                        </p>
                    </div>
                </div>

                {(startDue || (user && !lastServicedDate)) && (
                    <div style={progressBarStyle}>
                        <div style={progressBarInnerStyle}>
                           {oilHealthPercentage > 10 && `${oilHealthPercentage}%`}
                        </div>
                    </div>
                )}

                <div className='space-y-3 mt-1'> 
                    <button 
                        onClick={handleSubmit} 
                        disabled={isButtonDisabled}
                        className={`p-3 w-full rounded ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Saving...' : (isServicedToday ? 'Lubed Today' : 'Mark as Lubed Today')}
                    </button>

                    {lastServicedDate && (
                        <button
                            onClick={handleClearData}
                            disabled={isLoading || isDeleting}
                            className={`p-3 w-full mt-2 rounded clear-button ${ (isLoading || isDeleting) ? 'opacity-50 cursor-not-allowed' : '' }`}
                        >
                            {isDeleting ? 'Clearing...' : 'Clear Lube Data'}
                        </button>
                    )}
                </div>
                
                <p className='mt-3'>{alert}</p> 
            </div>
            {/* This is the + card, leave it */}
            {/* <div className='card AddCard flex justify-center items-center rounded-lg'>
                <ControlPointIcon className='text-lg' />
            </div> */}
        </div>
    );
};

export default Chain;