import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Onlinetest from './Components/Onlinetest';
import Start from './Components/Start';
import Score from './Components/Score';
import userSlice, { selectUser } from './features/userSlice';





function App() {
  const userAns= useSelector(selectUser);
  return (
    <div className="App">
      
      <>
  
<Router basename={process.env.PUBLIC_URL}>
  <Routes>
  
<Route path="/" element={<Start/>} />
<Route path="/Onlinetest" element={<Onlinetest/>} />
<Route path="/Onlinetest/Score" element={<Score  correctAns= {userAns.answer}/>} />
</Routes>
</Router>
  
      </>
     
    </div>
  );
}

export default App;
