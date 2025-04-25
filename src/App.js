import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import Subscribe from './Pages/Subscribe';
import GetHeaders from './Pages/GetHeaders';
import {Routes,Route,Navigate} from 'react-router-dom'
import Welcome from './Pages/Welcome';
import Otp from './Pages/Otp';

function App() {
  return (
    <>
    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/subscribe" element={<Subscribe/>} />
      <Route path="/otp-validation" element={<Otp/>} />
      <Route path="/header"  element={<GetHeaders/>}/>
      <Route path="/welcome" element={<Welcome/>} />
      <Route path="*" element={<Navigate to="/subscribe" />} />
    </Routes>
    </>
  );
}

export default App;
