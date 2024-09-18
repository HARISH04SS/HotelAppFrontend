// // // // // // // import { jwtDecode } from 'jwt-decode';
// // // // // // // import { useState,useEffect } from 'react';
// // // // // // // import { Link } from 'react-router-dom';
// // // // // // // const StaffDashboardNav = () => {
// // // // // // //     const [staffId, setStaffId] = useState(null);

// // // // // // //     useEffect(() => {
// // // // // // //         const token = localStorage.getItem('token');
// // // // // // //         if (token) {
// // // // // // //             try {
// // // // // // //                 const decodedToken = jwtDecode(token);
// // // // // // //                 setStaffId(decodedToken.id); // Use 'id' based on the token payload
// // // // // // //             } catch (error) {
// // // // // // //                 console.error('Error decoding token:', error);
// // // // // // //                 setStaffId(null);
// // // // // // //             }
// // // // // // //         }
// // // // // // //     }, []);

// // // // // // //     if (!staffId) {
// // // // // // //         return <div>Staff ID not found. Please log in again.</div>;
// // // // // // //     }

// // // // // // //     return (
// // // // // // //         <div>
// // // // // // //             <nav className="navbar navbar-expand-lg navbar-light bg-primary">
// // // // // // //                 <div className="container-fluid">
// // // // // // //                 <Link className="navbar-brand" to="/staffDashboard">Staff Dashboard</Link>
// // // // // // //                 </div>
// // // // // // //                 <ul className="nav-item">
// // // // // // //                     <Link className="nav-link active" aria-current="page" to="/logout">Logout</Link>
// // // // // // //                 </ul>
// // // // // // //             </nav>
// // // // // // //             <h1>Welcome Staff...</h1>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default StaffDashboardNav;


// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import axios from 'axios';

// // // // // // const StaffDashboard = ({ staffId }) => {
// // // // // //     const [requests, setRequests] = useState([]);

// // // // // //     const fetchAssignedRequests = async () => {
// // // // // //         try {
// // // // // //             const response = await axios.get(`http://localhost:3001/api/v1/getAssignedRequests/${staffId}`);
// // // // // //             setRequests(response.data);
// // // // // //         } catch (error) {
// // // // // //             console.error('Error fetching assigned requests:', error);
// // // // // //             alert('Failed to fetch requests.');
// // // // // //         }
// // // // // //     };

// // // // // //     useEffect(() => {
// // // // // //         fetchAssignedRequests();
// // // // // //     }, []);

// // // // // //     // Function to update request status
// // // // // //     const updateRequestStatus = async (requestId, status) => {
// // // // // //         try {
// // // // // //             const response = await axios.put(`http://localhost:3001/api/v1/update-status/${requestId}`, { status });
// // // // // //             alert('Status updated successfully!');
// // // // // //             fetchAssignedRequests(); // Refresh the requests after updating
// // // // // //         } catch (error) {
// // // // // //             console.error('Error updating status:', error);
// // // // // //             alert('Failed to update status.');
// // // // // //         }
// // // // // //     };

// // // // // //     return (
// // // // // //         <div className="container mt-5">
// // // // // //             <h1>Staff Dashboard</h1>

// // // // // //             <h2>Assigned Requests</h2>
// // // // // //             <ul className="list-group">
// // // // // //                 {requests.length > 0 ? (
// // // // // //                     requests.map((request) => (
// // // // // //                         <li key={request._id} className="list-group-item">
// // // // // //                             <p><strong>Description:</strong> {request.description}</p>
// // // // // //                             <p><strong>Status:</strong> {request.status}</p>
// // // // // //                             {request.status !== 'completed' && (
// // // // // //                                 <button
// // // // // //                                     className="btn btn-success"
// // // // // //                                     onClick={() => updateRequestStatus(request._id, 'completed')}
// // // // // //                                 >
// // // // // //                                     Mark as Completed
// // // // // //                                 </button>
// // // // // //                             )}
// // // // // //                         </li>
// // // // // //                     ))
// // // // // //                 ) : (
// // // // // //                     <li className="list-group-item">No requests found</li>
// // // // // //                 )}
// // // // // //             </ul>
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default StaffDashboard;

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';
// // // // // import { useNavigate } from 'react-router-dom';

// // // // // const StaffDashboard = ({ staffId }) => {
// // // // //     const [requests, setRequests] = useState([]);
// // // // //     const navigate = useNavigate();

// // // // //     const fetchAssignedRequests = async () => {
// // // // //         try {
// // // // //             if (!staffId) {
// // // // //                 console.error('No staff ID provided');
// // // // //                 return;
// // // // //             }
// // // // //             const response = await axios.get(`http://localhost:3001/api/v1/getAssignedRequests/${staffId}`);
// // // // //             setRequests(response.data);
// // // // //         } catch (error) {
// // // // //             console.error('Error fetching assigned requests:', error);
// // // // //             alert('Failed to fetch requests.');
// // // // //         }
// // // // //     };

// // // // //     useEffect(() => {
// // // // //         fetchAssignedRequests();
// // // // //     }, [staffId]);

// // // // //     return (
// // // // //         <div className="container mt-5">
// // // // //             <h1>Staff Dashboard</h1>
// // // // //             <button className="btn btn-danger mb-3" onClick={() => navigate('/staff/login')}>Logout</button>
            
// // // // //             <h2 className="mt-5">Assigned Requests</h2>
// // // // //             <ul className="list-group">
// // // // //                 {requests.length > 0 ? (
// // // // //                     requests.map(request => (
// // // // //                         <li key={request._id} className="list-group-item">
// // // // //                             <p><strong>Request ID:</strong> {request._id}</p>
// // // // //                             <p><strong>Description:</strong> {request.description}</p>
// // // // //                             <p><strong>Status:</strong> {request.status}</p>
// // // // //                             {/* Add other details as needed */}
// // // // //                         </li>
// // // // //                     ))
// // // // //                 ) : (
// // // // //                     <li className="list-group-item">No requests assigned</li>
// // // // //                 )}
// // // // //             </ul>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default StaffDashboard;

// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useAuth } from '../hooks/useAuth'; // Assuming you have a custom hook for authentication

// // // // const StaffDashboard = () => {
// // // //     const [requests, setRequests] = useState([]);
// // // //     const [error, setError] = useState('');
// // // //     const [loading, setLoading] = useState(false);
// // // //     const { token, staffId } = useAuth(); // Custom hook to get token and staffId

// // // //     useEffect(() => {
// // // //         const fetchAssignedRequests = async () => {
// // // //             if (!staffId) return;
            
// // // //             try {
// // // //                 setLoading(true);
// // // //                 const response = await axios.get(`http://localhost:3001/api/v1/getAssignedRequests/${staffId}`, {
// // // //                     headers: { Authorization: `Bearer ${token}` }
// // // //                 });
// // // //                 setRequests(response.data);
// // // //             } catch (error) {
// // // //                 setError('Failed to fetch requests.');
// // // //             } finally {
// // // //                 setLoading(false);
// // // //             }
// // // //         };

// // // //         fetchAssignedRequests();
// // // //     }, [staffId, token]);

// // // //     const handleStatusChange = async (requestId) => {
// // // //         try {
// // // //             await axios.put(`http://localhost:3001/api/v1/requests/${requestId}`, 
// // // //                 { status: 'completed' },
// // // //                 { headers: { Authorization: `Bearer ${token}` } }
// // // //             );
// // // //             setRequests(requests.map(request => 
// // // //                 request._id === requestId ? { ...request, status: 'completed' } : request
// // // //             ));
// // // //         } catch (error) {
// // // //             setError('Failed to update status.');
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div className="container mt-5">
// // // //             <h1>Staff Dashboard</h1>

// // // //             {loading && <p>Loading...</p>}
// // // //             {error && <div className="alert alert-danger">{error}</div>}

// // // //             <h2>Assigned Requests</h2>
// // // //             <ul className="list-group">
// // // //                 {requests.length > 0 ? (
// // // //                     requests.map(request => (
// // // //                         <li key={request._id} className="list-group-item">
// // // //                             <p><strong>Request ID:</strong> {request._id}</p>
// // // //                             <p><strong>Description:</strong> {request.description}</p>
// // // //                             <p><strong>Status:</strong> {request.status}</p>
// // // //                             {request.status !== 'completed' && (
// // // //                                 <button 
// // // //                                     className="btn btn-success" 
// // // //                                     onClick={() => handleStatusChange(request._id)}
// // // //                                 >
// // // //                                     Mark as Completed
// // // //                                 </button>
// // // //                             )}
// // // //                         </li>
// // // //                     ))
// // // //                 ) : (
// // // //                     <li className="list-group-item">No requests found</li>
// // // //                 )}
// // // //             </ul>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default StaffDashboard;

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { Table, Spinner, Alert, Button } from 'react-bootstrap';
// // // import { useAuth } from '../hooks/useAuth';  // Import your context hook

// // // const StaffDashboard = () => {
// // //     const { staffId } = useAuth();  // Get staffId from context
// // //     const [requests, setRequests] = useState([]);
// // //     const [error, setError] = useState(null);
// // //     const [loading, setLoading] = useState(true);
// // //     const token = localStorage.getItem('token');  // Retrieve token from localStorage

// // //     const fetchAssignedRequests = async () => {
// // //         try {
// // //             setLoading(true);
// // //             const response = await axios.get(`http://localhost:3001/api/v1/getAssignedRequests/${staffId}`, {
// // //                 headers: { Authorization: `Bearer ${token}` }
// // //             });
// // //             setRequests(response.data);
// // //             setError(null);
// // //         } catch (error) {
// // //             console.error('Error fetching assigned requests:', error);
// // //             setError('Failed to fetch requests.');
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         if (staffId) {
// // //             fetchAssignedRequests();
// // //         }
// // //     }, [staffId]);

// // //     const handleCompleteRequest = async (requestId) => {
// // //         try {
// // //             await axios.patch(`http://localhost:3001/api/v1/updateRequestStatus/${requestId}`, 
// // //                 { status: 'completed' },
// // //                 { headers: { Authorization: `Bearer ${token}` } }
// // //             );
// // //             // Update local state to reflect the change
// // //             setRequests(requests.map(req => req._id === requestId ? { ...req, status: 'completed' } : req));
// // //         } catch (error) {
// // //             console.error('Error updating request status:', error);
// // //             setError('Failed to update request status.');
// // //         }
// // //     };

// // //     return (
// // //         <div className="container mt-4">
// // //             <h1>Assigned Requests</h1>
// // //             {loading ? (
// // //                 <Spinner animation="border" />
// // //             ) : error ? (
// // //                 <Alert variant="danger">{error}</Alert>
// // //             ) : (
// // //                 <Table striped bordered hover>
// // //                     <thead>
// // //                         <tr>
// // //                             <th>Description</th>
// // //                             <th>Status</th>
// // //                             <th>Actions</th>
// // //                         </tr>
// // //                     </thead>
// // //                     <tbody>
// // //                         {requests.length > 0 ? (
// // //                             requests.map(request => (
// // //                                 <tr key={request._id}>
// // //                                     <td>{request.description}</td>
// // //                                     <td>
// // //                                         <span className={`badge ${request.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
// // //                                             {request.status}
// // //                                         </span>
// // //                                     </td>
// // //                                     <td>
// // //                                         {request.status !== 'completed' && (
// // //                                             <Button 
// // //                                                 variant="success" 
// // //                                                 onClick={() => handleCompleteRequest(request._id)}
// // //                                             >
// // //                                                 Mark as Completed
// // //                                             </Button>
// // //                                         )}
// // //                                     </td>
// // //                                 </tr>
// // //                             ))
// // //                         ) : (
// // //                             <tr>
// // //                                 <td colSpan="3">No requests found.</td>
// // //                             </tr>
// // //                         )}
// // //                     </tbody>
// // //                 </Table>
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export default StaffDashboard;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Table, Spinner, Alert, Container } from 'react-bootstrap';  // Import Bootstrap components

// // const StaffDashboard = () => {
// //     const [requests, setRequests] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');
// //     const staffId = localStorage.getItem('staffId');  // Get staff ID from local storage or context

// //     useEffect(() => {
// //         const fetchRequests = async () => {
// //             try {
// //                 const response = await axios.get(`http://localhost:3001/api/v1/getAssignedRequests/${staffId}`);
// //                 setRequests(response.data);
// //             } catch (error) {
// //                 console.error('Error fetching assigned requests:', error);
// //                 setError('Failed to fetch requests.');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         if (staffId) {
// //             fetchRequests();
// //         } else {
// //             setError('Staff ID not found.');
// //             setLoading(false);
// //         }
// //     }, [staffId]);

// //     const handleStatusChange = async (requestId) => {
// //         try {
// //             await axios.patch(`http://localhost:3001/api/v1/updateStatus/${requestId}`, { status: 'completed' });
// //             setRequests(requests.map(request => 
// //                 request._id === requestId ? { ...request, status: 'completed' } : request
// //             ));
// //         } catch (error) {
// //             console.error('Error updating request status:', error);
// //             setError('Failed to update request status.');
// //         }
// //     };

// //     return (
// //         <Container className="mt-5">
// //             <h2 className="text-center mb-4">Assigned Requests</h2>
// //             {loading ? (
// //                 <div className="text-center">
// //                     <Spinner animation="border" role="status">
// //                         <span className="sr-only">Loading...</span>
// //                     </Spinner>
// //                 </div>
// //             ) : error ? (
// //                 <Alert variant="danger">{error}</Alert>
// //             ) : requests.length === 0 ? (
// //                 <Alert variant="info">No requests assigned.</Alert>
// //             ) : (
// //                 <Table striped bordered hover>
// //                     <thead>
// //                         <tr>
// //                             <th>Description</th>
// //                             <th>Status</th>
// //                             <th>Action</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {requests.map(request => (
// //                             <tr key={request._id}>
// //                                 <td>{request.description}</td>
// //                                 <td>{request.status}</td>
// //                                 <td>
// //                                     {request.status !== 'completed' && (
// //                                         <button 
// //                                             className="btn btn-success"
// //                                             onClick={() => handleStatusChange(request._id)}
// //                                         >
// //                                             Mark as Completed
// //                                         </button>
// //                                     )}
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </Table>
// //             )}
// //         </Container>
// //     );
// // };

// // export default StaffDashboard;

// StaffDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const StaffDashboard = () => {
    const { staffId } = useParams(); // Extract staffId from URL parameters
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!staffId) {
            setError('Staff ID not found.');
            setLoading(false);
            return;
        }

        const fetchRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/staff/getAssignedRequests/${staffId}`);
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching assigned requests:', error);
                setError('Failed to fetch requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [staffId]);

    const handleStatusChange = async (requestId) => {
        console.log('request ID:',requestId)
        try {
            await axios.patch(`http://localhost:3001/api/v1/staff/update-status/${requestId}`, { status: 'completed' ,});
            setRequests(requests.map(request => 
                request._id === requestId ? { ...request, status: 'completed' } : request
            ));
        } catch (error) {
            console.error('Error updating request status:', error);
            setError('Failed to update request status.');
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Assigned Requests</h2>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : requests.length === 0 ? (
                <Alert variant="info">No requests assigned.</Alert>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request._id}>
                                <td>{request.description}</td>
                                <td>{request.status}</td>
                                <td>
                                    {request.status !== 'completed' && (
                                        <Button 
                                            variant="success"
                                            onClick={() => handleStatusChange(request._id)}
                                        >
                                            Mark as Completed
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default StaffDashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const StaffDashboard = () => {
//     const [requests, setRequests] = useState([]);
//     const staffId = localStorage.getItem('staffId'); // Assuming you store it here

//     useEffect(() => {
//         const fetchAssignedRequests = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3001/api/v1/getAssignedRequests/${staffId}`);
//                 setRequests(response.data);
//             } catch (error) {
//                 console.error('Error fetching assigned requests:', error);
//             }
//         };

//         if (staffId) {
//             fetchAssignedRequests();
//         }
//     }, [staffId]);

//     return (
//         <div>
//             {/* Render requests here */}
//         </div>
//     );
// };

// export default StaffDashboard;
