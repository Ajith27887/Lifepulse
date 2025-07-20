import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import SideNav from './components/SideNav.jsx';
import Bike from "./components/Bike.jsx";
import { useState } from "react";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

function App() {
	const [ user, setUser ] = useState(null);

 	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login user={user} setUser={setUser}/>} />
				<Route path="/*" element={
					user ? (
						<>
							<Navbar user={user} setUser={setUser} />
							<div className="flex">
								<div className="w-1/6">
									<SideNav />
								</div>
								<div style={{backgroundColor: "#F0F4F8"}} className='text-black w-5/6 p-5'>
									<Routes>
										<Route path='/' element={<Home />} />
										<Route path='/bike' element={<Bike />} />
									</Routes>
								</div>
							</div>
						</>
					) : (
						<Login user={user} setUser={setUser}/>
					)
				} />
			</Routes>
		</Router>
	);
}

export default App
