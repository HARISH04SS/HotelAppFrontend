// import { useDispatch, useSelector } from 'react-redux';
// import { selectEmail, selectPassword, setEmail, setPassword } from '../features/Residents/loginSlice';
// import { useNavigate } from 'react-router-dom';
// import authServices from '../services/authServices';

// const Login = () => {
//     const email = useSelector(selectEmail);
//     const password = useSelector(selectPassword);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleLogin = (e) => {
//         e.preventDefault();
//         const userData = { email, password };

//         authServices.login(userData)
//             .then(response => {
//                 localStorage.setItem('token', response.data.token); 
//                 navigate('/dashboard');
//             })
//             .catch(error => {
//                 console.error('Login failed:', error);
//             });
//     };

//     return (
//         <div className="container mt-5">
//             <div className="row justify-content-center">
//                 <div className="col-md-6 col-lg-4">
//                     <div className="card">
//                         <div className="card-header">
//                             <h2>Login</h2>
//                         </div>
//                         <div className="card-body">
//                             <form onSubmit={handleLogin}>
//                                 <div className="mb-3">
//                                     <label htmlFor="email" className="form-label">Email</label>
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         id="email"
//                                         value={email}
//                                         onChange={(e) => dispatch(setEmail(e.target.value))}
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="password" className="form-label">Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         id="password"
//                                         value={password}
//                                         onChange={(e) => dispatch(setPassword(e.target.value))}
//                                     />
//                                 </div>
//                                 <button type="submit" className="btn btn-primary">Login</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmail, selectPassword, setEmail, setPassword } from '../features/Residents/loginSlice';
import { useNavigate } from 'react-router-dom';
import authServices from '../services/authServices';
import Cookies from 'js-cookie'; // Make sure this import is included if using js-cookie

const Login = () => {
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = { email, password };

        try {
            const response = await authServices.login(userData);
            console.log(response);
            // Check if response contains a token
            const token = response.data.token; // Assuming your backend sends the token here

            if (token) {
                console.log("Token found:", token);
                localStorage.setItem('token', token); // Store token in localStorage
                Cookies.set('token', token, { expires: 7, path: '' }); // Store token in cookies, optional
                navigate('/dashboard'); // Redirect to dashboard on successful login
            } else {
                setErrorMessage('Invalid login response, token not found');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-header">
                            <h2>Login</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => dispatch(setEmail(e.target.value))}
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
                                {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
