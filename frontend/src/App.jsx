import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import SideNav from './components/SideNav.jsx';
import Bike from "./components/Bike.jsx";
import { auth, googleProvider } from "../firebase.js"
import { signInWithPopup } from 'firebase/auth';
import { useState } from "react";

function App() {
	const [ user, setUser ] = useState(),
	  handleSign = () => {
		signInWithPopup(auth,googleProvider).then((data) => {
			setUser(data.user)
			localStorage.setItem("email", data.user.email)
			localStorage.setItem("name", data.user.displayName)
		})
	}	


	if (!user) {
		return (
			<div style={{backgroundColor: "#F0F4F8"}} className='w-full h-screen text-black flex flex-col items-center justify-center'>
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-8">Welcome to LifePluse</h1>
					<button 
						onClick={handleSign}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Sign in with Google
					</button>
				</div>
			</div>
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