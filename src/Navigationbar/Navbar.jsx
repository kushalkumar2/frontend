import { NavLink } from "react-router-dom";
import './Navbar.css';   // external css

function Navbar() {
  return (
    <div className="mainnav">
      <div className="nav">
        <NavLink to="/Profile" className="nav-link">Profile</NavLink>
        <NavLink to="/Createtopic" className="nav-link">Create Topic</NavLink>
        <NavLink to="/Topics" className="nav-link">Topics</NavLink>
        <NavLink to="/Mycontent" className="nav-link">My Content</NavLink>
        <NavLink to="/Allusers" className="nav-link">All Users</NavLink>
        <NavLink to="/" className="nav-link">Logout</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
