
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import './Register.css';

function Register(){
  const Nav = useNavigate();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [phone,setPhone]=useState('');
  const [dob,setDob]=useState('');
  const [qualification,setQualification]=useState('');
  const [address,setAddress]=useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')||'[]');
    if(users.find(u=>u.email===email)){
      alert('Email already registered.');
      return;
    }
    const id = Date.now();
    const user = { id, name, email, password, phone, dob, qualification, address };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered successfully. Please login.');
    Nav('/');
  };

  return(
    <div className="mainreg">
      <div className="reg">
        <form onSubmit={handleRegister}>
          <h1>Registration form</h1>
          <label>Name:  </label>
          <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder="enter your name" required/><br/><br/>
          <label>Email:  </label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="enter your email" required/><br/><br/>
          <label>Password:  </label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="password" required/><br/><br/>
          <label>Phone:  </label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} type="tel" placeholder="phone"/><br/><br/>
          <label>Date of birth:  </label>
          <input value={dob} onChange={e=>setDob(e.target.value)} type="date"/><br/><br/>
          <label>Highest Qualification:  </label>
          <input value={qualification} onChange={e=>setQualification(e.target.value)} type="text"/><br/><br/>
          <label>Address:  </label>
          <input value={address} onChange={e=>setAddress(e.target.value)} type="text"/><br/><br/>
          <button type="submit">Register</button><br/><br/>
          <p>Already have an account. <Link to="/">Login</Link></p>
        </form>
      </div>
    </div>
  );
}
export default Register;
