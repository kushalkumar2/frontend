import {Routes,Route} from 'react-router-dom';
import Login from './Login/Loginex.jsx';
import Register from './Registerform/Register.jsx';
import Navbar from'./Navigationbar/Navbar.jsx';
import Profile from './Profile/Profile.jsx';
import Topics from './Topics/Topics.jsx';
import Createtopic from './Createtopic/Createtopic.jsx';
import Mycontent from './Mycontent/Mycontent.jsx';
import Allusers from './Allusers/Allusers.jsx';

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        {/* <Route path='/Navbar' element={<Navbar/>} /> */}
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/Topics' element={<Topics/>} />
        <Route path='/Createtopic' element={<Createtopic/>} />
        <Route path='/Mycontent' element={<Mycontent/>} />
        <Route path='/Allusers' element={<Allusers/>} />
      </Routes>
    </>
  );
}

export default App;
