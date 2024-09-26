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
                const response = await axios.get(`https://hotelapplicationbackend.onrender.com/api/v1/staff/getAssignedRequests/${staffId}`);
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
            await axios.patch(`https://hotelapplicationbackend.onrender.com/api/v1/staff/update-status/${requestId}`, { status: 'completed' ,});
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
