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
// import Chain from "./components/Chain.jsx";

// 1. Import the new JoinPeople component
// import JoinPeople from "./components/JoinPeople.jsx";
                                                    // <Route path='/join' element={<JoinPeople user={user} />} /> 


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
                                            <>
                                            <div className={`side-container ${isOpen ? "open" : "closed"}`}>
                                                <SideNav />
                                            </div>
                                            
                                            {/* 2. Apply classes to Dashboard-container */}
                                            <div style={{backgroundColor: "#1E293B"}} className={`Dashboard-container ${isOpen ? "open" : "closed"} text-black p-5`}>
                                                <Routes>
                                                    <Route path='/' element={<Home user={user} />} />
                                                    <Route path='/bike' element={<Bike user={user} />} />
                                                    {/* We need to get Chain.jsx from the previous step */}
                                                    {/* <Route path='/chain' element={<Chain user={user} />} /> */}
                                                    {/* 3. Add the route for the /join page */}
                                                </Routes>
                                            </div>
                                            </>
                                        )}
									</SideMenuContext.Consumer>
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