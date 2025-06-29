import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import SideNav from './components/SideNav.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex">
        <div className="w-1/4">
          <SideNav />
        </div>
        <div className="w-3/4">
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App