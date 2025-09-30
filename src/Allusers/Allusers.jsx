
import "./Allusers.css";

function Allusers() {
  const users = JSON.parse(localStorage.getItem('users')||'[]');

  return (
    <div className="allusers-container">
      <h1>All Users</h1>
      {users.length===0 && <p>No registered users.</p>}
      <table className="allusers-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Allusers;
