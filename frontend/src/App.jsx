import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import SideNav from './components/SideNav.jsx';
import About from "./components/About.jsx";
import Bike from "./components/Bike.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex">
        <div className="w-1/6">
          <SideNav />
        </div>
        <div style={{backgroundColor : "#F0F4F8	"}} className='text-black w-5/6 p-5'>
          <Routes>
            <Route path='/' element={<Home />} />
			<Route path='/about' element={<About />} />
			<Route path='/bike' element={<Bike />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App