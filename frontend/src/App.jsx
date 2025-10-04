import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import SideNav from './components/SideNav.jsx';
import Bike from "./components/Bike.jsx";
import { useState } from "react";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import "./App.scss"
import SideMenuProvider from "./components/Context/SideMenuContext.jsx";
import { SideMenuContext } from "./components/Context/SideMenuContext.jsx";


function App() {
	const [ user, setUser ] = useState(null);
 	return (
		<Router>
			<SideMenuProvider>
				<Routes>
					<Route path="/login" element={<Login user={user} setUser={setUser}/>} />
					<Route path="/*" element={
						user ? (
							<>
								<Navbar user={user} setUser={setUser} />
								<div className="flex">
									<SideMenuContext.Consumer>
										{({ isOpen }) => (
                                            <div className={`side-container ${isOpen ? "open" : "closed"}`}>
                                                <SideNav />
                                            </div>
                                        )}
									</SideMenuContext.Consumer>
							
									<div style={{backgroundColor: "#1E293B"}} className={`Dashboard-container  text-black p-5`}>
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
			</SideMenuProvider>
		</Router>
	);
}

export default App
