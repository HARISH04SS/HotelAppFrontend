import { Link, Outlet } from "react-router-dom";

const StaffNav = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
        <div className="container-fluid">
          <Link className="navbar-brand" to="/staff/login">Staff Panel</Link> 
          <button className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#staffNavbar"
            aria-controls="staffNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="staffNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/staff/register">Staff Register</Link> {/* Admin Register Link */}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/staff/login">Staff Login</Link> {/* Admin Login Link */}
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

export default StaffNav;
