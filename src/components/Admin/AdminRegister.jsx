import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import adminServices from '../../services/adminServices';
import { selectPassword, selectUsername, setPassword, setUsername } from '../../features/Admin/adminregisterSlice';


const AdminRegister = () => {
    const username = useSelector(selectUsername);
    const password = useSelector(selectPassword);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault();
        const userData = { username, password };
    
        console.log(userData); 
    
        adminServices.adminRegister(userData)
            .then(response => {
                console.log('Registration successful:', response.data.message);
                alert(response.data.message);
                navigate('/admin/login'); 
            })
            .catch(error => {
                console.error('Registration failed:', error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-header">
                            <h2>Admin Register</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
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
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
