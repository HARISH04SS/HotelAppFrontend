import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import authServices from '../services/authServices'; // Ensure this service exists and is set up properly

const UserDashboardNav = () => {
    const [residentId, setResidentId] = useState(null);
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        console.log('Token retrieved from localStorage:', token); // Log token for debugging

        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decode the token
                console.log('Decoded Token:', decodedToken); // Log decoded token for debugging

                // Ensure the token contains the expected fields
                setResidentId(decodedToken.id || decodedToken.residentId); // Update residentId based on token payload
            } catch (error) {
                console.error('Error decoding token:', error); // Log decoding error
                setResidentId(null); // Reset residentId if decoding fails
            }
        } else {
            console.warn('No token found in localStorage. Make sure it is being set during login.');
            setResidentId(null);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!residentId || !description) {
            setMessage('Please provide a description for the request.');
            return;
        }

        try {
            const response = await authServices.submitRequest({ resident: residentId, description });
            setMessage(response.data.msg);
            setDescription(''); // Clear the form after successful submission
        } catch (error) {
            console.error('Request submission failed:', error);
            setMessage('Failed to submit request.');
        }
    };

    if (!residentId) {
        return <div>Resident ID not found. Please log in again.</div>;
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/dashboard">Resident Dashboard</Link>
                </div>
                <ul className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/logout">Logout</Link>
                </ul>
            </nav>
            <h1>Welcome...</h1><br />
            <h4>Please fill the query form if you have any queries</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Request Description</label>
                    <textarea
                        id="description"
                        className="form-control"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Request</button>
                {message && <p className="mt-3">{message}</p>}
            </form>
        </div>
    );
};

export default UserDashboardNav;
