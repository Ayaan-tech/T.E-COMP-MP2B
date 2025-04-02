import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Features from './pages/Features';
import PestDetection from './components/PestDetection';
//import FertilizerRecommendation from './components/FertilizerRecommendation';
import ChatSupport from './components/chatSupport';


// import Settings from './pages/Settings';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/features" element={<Features/>} />
               
                <Route path="/pest-detection" element={<PestDetection />} />
           
                <Route path='/chatSupport' element={<ChatSupport/>}/>
                {/* <Route path="/pest-detection" element={<PestDetection />} /> */}


                {/* <Route path="/settings" element={<Settings />} /> */}
                {/* Optional: Redirect any unknown route to home
                <Route path="*" element={<Home />} /> */}
            </Routes>
        </Router>
    );
}

export default App;