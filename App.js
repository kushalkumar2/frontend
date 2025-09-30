
import './App.css';
import { Routes, Route } from "react-router-dom";
import Loginex from "./Login/Loginex";
import Register from "./Registerform/Register";
import Navbar from "./Navigationbar/Navbar";
import Profile from "./Profile/Profile";
import Topics from "./Topics/Topics";
import Createtopic from "./Createtopic/Createtopic";
import MyContent from "./Mycontent/Mycontent";
import Allusers from "./Allusers/Allusers";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Loginex/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/Navbar' element={<Navbar/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/Topics' element={<Topics/>} />
        <Route path='/Createtopic' element={<Createtopic/>} />
        <Route path='/Mycontent' element={<MyContent/>} />
        <Route path='/Allusers' element={<Allusers/>} />
      </Routes>
    </>
  );
}

export default App;
