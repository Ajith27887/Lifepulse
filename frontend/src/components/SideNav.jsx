import 'bootstrap/dist/css/bootstrap.min.css'; 
import "../components/SideNav.scss"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';



const SideNav = () => {

  return (
	<div className='SideNav text-white text-center h-[100vh] sticky'>
		<div className='open'>
			<KeyboardDoubleArrowRightIcon/>
		</div>
		<button>
			Sumbit
		</button>			
	</div>
  )
}

export default SideNav




