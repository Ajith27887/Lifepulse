import 'bootstrap/dist/css/bootstrap.min.css'; 
import "../components/SideNav.scss"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useContext, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { SideMenuContext } from './Context/SideMenuContext';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
 

const SideNav = () => {

	const { toggle, isOpen} = useContext(SideMenuContext),
		navigate = useNavigate();

	const handleSideMenuOpen = () => {
		toggle()				
	}

	const handleBikeIcon = () => {
		navigate("/")
	}

  return (
	<div className={`SideNav text-white text-center h-[100vh] sticky`}>
		<div className={`flex ${isOpen ? "justify-end" : "justify-center"} `} >
			<KeyboardDoubleArrowRightIcon onClick={handleSideMenuOpen} />
		</div>

		<div className="flex justify-start align-middle mt-5 p-3">
			<div className='mx-auto' >
				<div>
					<TwoWheelerIcon onClick={handleBikeIcon}/>
				</div>
				<div className='mt-3'>
					<AddIcon/>
				</div>
				<div className='mt-3'>
					<SendIcon/>
				</div>
			</div>
			<div>
			{isOpen && <div className='w-80 text-nowrap flex justify-start overflow-hidden'>
					<p className='mx-2' >Bike</p>
					
				</div>}
				{isOpen && <div className='w-80 text-nowrap flex justify-start overflow-hidden'>
				<p className='mx-2' >Add Members</p>
				
			</div>}
				{isOpen && <div className='w-80 text-nowrap flex justify-start overflow-hidden'>
				<p className='mx-2' >Chat</p>
				
			</div>}
			</div>

	
		</div>

	</div>
  )
}

export default SideNav




