import { Link, Outlet } from "react-router-dom";

const AdminNav = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin/login">Admin Panel</Link> 
          <button className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavbar"
            aria-controls="adminNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="adminNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/register">Admin Register</Link> {/* Admin Register Link */}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/login">Admin Login</Link> {/* Admin Login Link */}
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link> {/* Logout */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet /> {/* This will render the matching admin route */}
    </div>
  );
};

export default AdminNav;
