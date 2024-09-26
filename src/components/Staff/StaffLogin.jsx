// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const StaffLogin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:3001/api/v1/staff/stafflogin', { email, password });
//             const { token,staff } = response.data;
//             if (token) {
//                 localStorage.setItem('token', token);
//                 localStorage.setItem('staffId',staff._id)
//                 navigate('/staff/staffDashboard/${staff._id}');
//             } else {
//                 alert('Login failed');
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//             alert('An error occurred');
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <div className="row justify-content-center">
//                 <div className="col-md-6 col-lg-4">
//                     <div className="card">
//                         <div className="card-header">
//                             <h2>Login</h2>
//                         </div>
//                         <div className="card-body"></div>
//             <form onSubmit={handleLogin}>
//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email</label>
//                     <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Login</button>
                
//             </form>
//         </div>
        
//         </div>
//             </div>
//         </div>
//     );
// };

// export default StaffLogin;


// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            console.log('Submitting login with:',{email,password});
            const response = await axios.post('https://hotelapplicationbackend.onrender.com/api/v1/staff/stafflogin', { email, password });
            const { token, staff } = response.data;
            if (!token || !staff) {
                throw new Error('Invalid response from server. Please try again later.');
              }
            // Save token and staff ID in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('staffId', staff._id);
            // Navigate to staff dashboard with staff ID
            console.log('staff ID:',localStorage.getItem('staffId'))
            navigate('/staff/staffDashboard/'+localStorage.getItem('staffId'));
        }
        catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Server Error:', error.response.data);
                setError(error.response.data.message || 'Login failed. Please check your credentials and try again.');
            } else if (error.request) {
                // No response was received from the server
                console.error('No response from server:', error.request);
                setError('No response from server. Please try again later.');
            } else {
                // Other errors
                console.error('Error:', error.message);
                setError('An unexpected error occurred. Please try again.');
            }
        } 
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </Container>
    );
};

export default Login;
