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
        try {
            const response = await axios.post('http://localhost:3001/api/v1/staff/stafflogin', { email, password });
            const { token, staff } = response.data;
            // Save token and staff ID in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('staffId', staff._id);
            // Navigate to staff dashboard with staff ID
            console.log(localStorage.getItem('staffId'))
            navigate('/staff/staffDashboard/'+localStorage.getItem('staffId'));
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials and try again.');
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
