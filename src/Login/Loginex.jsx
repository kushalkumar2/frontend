
import { useNavigate, Link } from 'react-router-dom';
import './Loginex.css';
import { useState } from 'react';

function Loginex(){
    const nav = useNavigate();
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');

    const handleLogin = (e) => {
      e.preventDefault();
      const users = JSON.parse(localStorage.getItem('users')||'[]');
      const user = users.find(u=>u.email===email && u.password===pass);
      if(!user){
        alert('Invalid email or password');
        return;
      }
      localStorage.setItem('currentUserId', String(user.id));
      nav('/Navbar');
    };

    return(
        <div className="main">
             <div className="log">
                   <h2 className='logh2'>Login form</h2>
                   <form onSubmit={handleLogin}>
                    <label className='loglabel' >Email:</label><br/>
                    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='enter email address' name='email' type='email' className='inputs' required></input><br/>
                    <label className='loglabel'>Password:</label><br/>
                    <input value={pass} onChange={e=>setPass(e.target.value)} placeholder='enter password' name='pass' type='password'className='inputs' required ></input><br/>
                    <a href="/forgot" className='an'>Forgot password?</a><br></br>
                    <button type='submit'>Login</button>
                    <p className='para'>Don't have an account yet?<a href="/register"> Sign Up</a></p>
                   </form>
            </div>   
        </div>
    );
}
export default Loginex;
