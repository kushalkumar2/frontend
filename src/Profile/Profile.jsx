
import './Profile.css';
import { useState, useEffect } from 'react';

function Profile(){
    const [user,setUser]=useState(null);
    const [form,setForm]=useState({});

    useEffect(()=>{
      const id = localStorage.getItem('currentUserId');
      if(!id) return;
      const users = JSON.parse(localStorage.getItem('users')||'[]');
      const u = users.find(x=>String(x.id)===String(id));
      setUser(u);
      setForm(u || {});
    },[]);

    const handleChange = (k,v)=> setForm({...form,[k]:v});

    const save = (e)=>{
      e.preventDefault();
      const users = JSON.parse(localStorage.getItem('users')||'[]');
      const updated = users.map(u=> u.id===user.id ? {...u, ...form} : u);
      localStorage.setItem('users', JSON.stringify(updated));
      alert('Profile updated');
      setUser({...user,...form});
    };

    if(!user) return <div className="mainpro"><div className="pro"><h2>Please login to see profile</h2></div></div>

    return(
        <div className="mainpro">
           <div className="pro">
                 <h1 className="proh1">Profile</h1>
                 <form onSubmit={save}>
                    <label className="label_pro">Name:</label><br/>
                    <input value={form.name||''} onChange={e=>handleChange('name',e.target.value)} type="text" /><br/>
                    <label className="label_pro">Email:</label><br/>
                    <input value={form.email||''} onChange={e=>handleChange('email',e.target.value)} type="email" /><br/>
                    <label className="label_pro">Phone no:</label><br/>
                    <input value={form.phone||''} onChange={e=>handleChange('phone',e.target.value)} type="tel" /><br/>
                    <label className="label_pro">Date of birth:</label><br/>
                    <input value={form.dob||''} onChange={e=>handleChange('dob',e.target.value)} type="date" /><br/>
                    <label className="label_pro">Highest Qualification:</label><br/>
                    <input value={form.qualification||''} onChange={e=>handleChange('qualification',e.target.value)} type="text" /><br></br>
                    <label className="label_pro">Address</label><br/>
                     <input value={form.address||''} onChange={e=>handleChange('address',e.target.value)} type="text" />
                     <br/><br/>
                     <button type="submit">Save</button>
                 </form> 
            </div>
        </div>
    );
}
export default Profile;
