import { useDispatch, useSelector } from 'react-redux';
import adminServices from '../../services/adminServices';
import { useNavigate } from 'react-router-dom';
import { selectPassword, selectUsername, setPassword, setUsername } from '../../features/Admin/adminloginSlice';

const AdminLogin = () => {
    const username = useSelector(selectUsername);
    const password = useSelector(selectPassword);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        const userData = { username, password };

        adminServices.adminLogin(userData)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                navigate('/admin/AdminDashboard');
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-header">
                            <h2>Admin Login</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => dispatch(setUsername(e.target.value))}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => dispatch(setPassword(e.target.value))}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
