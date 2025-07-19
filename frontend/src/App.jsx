import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import SideNav from './components/SideNav.jsx';
import Bike from "./components/Bike.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login.jsx";

function App() {
	const [ user, setUser ] = useState();
	
	if (!user) {
		return (
			<Router>
				<Routes>
					<Route path="/" element={<Login user={user} setUser={setUser}/>}  />
				</Routes>
			</Router>

		);
	}


 	return (
		<Router>
			<Navbar user={user} setUser={setUser} />
			<div className="flex">
				<div className="w-1/6">
					<SideNav />
				</div>
				<div style={{backgroundColor: "#F0F4F8"}} className='text-black w-5/6 p-5'>
					<Routes>
						<Route path='/bike' element={<Bike />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App