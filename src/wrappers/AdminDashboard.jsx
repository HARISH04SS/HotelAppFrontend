// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import adminServices from '../services/adminServices';
// const AdminDashboard = () => {
//     const [roomNumber, setRoomNumber] = useState('');
//     const [pricePerNight, setPricePerNight] = useState('');
//     const [roomId, setRoomId] = useState('');
//     const [residentId, setResidentId] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [availableRooms, setAvailableRooms] = useState([]);
//     //const [requests, setRequests] = useState([]);
//     const navigate = useNavigate();
//     // useEffect(() => {
//     //     getRequests(); 
//     // }, []);
    
    

//     const handleLogout = async () => {
//         try {
//             const response = await axios.post('http://localhost:3001/api/v1/admin/logout');
//             console.log(response.data.message);
//             navigate('/admin/login');
//         } catch (error) {
//             console.error('Error during logout:', error);
//         }
//     };

//     const createRoom = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const response = await adminServices.createRoom({ roomNumber, pricePerNight });

//             if (response.data.msg === 'Room created successfully') {
//                 alert('Room created successfully');
//                 setRoomNumber('');
//                 setPricePerNight('');
//             } else if (response.data.msg === 'Room already exists with this number') {
//                 alert('Room already exists with this number');
//             }
//         } catch (error) {
//             console.error('Error creating room:', error);
//             setError('An error occurred while creating the room. Please try again.');
//             alert(error.message || 'An unexpected error occurred.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const deleteRoom = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.delete(`http://localhost:3001/api/v1/admin/delete-room/${roomId}`);
//             console.log(response.data.msg);
//             alert("Room deleted successfully");
//             setRoomId('');
//         } catch (error) {
//             console.error('Error deleting room:', error);
//             alert('Failed to delete room. Please try again.');
//         }
//     };

//     const allocateRoom = async (e) => {
//         e.preventDefault();

//         if (!residentId || !roomId) {
//             alert('Please provide both Resident ID and Room ID.');
//             return;
//         }

//         try {
//             const roomData = { residentId, roomId };
//             const response = await adminServices.allocateRoom(roomData);
//             console.log('Room allocation response:', response);
//             alert('Room allocated successfully!');
//         } catch (error) {
//             console.error('Error allocating room:', error);
//             alert('Error allocating room: ' + (error.response?.data?.msg || error.message));
//         }
//     };

//     const deallocateRoom = async (e) => {
//         e.preventDefault();
//         try {
//             const deallocationData = { residentId, roomId };
//             const response = await axios.post('http://localhost:3001/api/v1/admin/deallocate-room', deallocationData);
//             console.log(response.data.msg);
//             alert("Room deallocated successfully");
//             setResidentId('');
//             setRoomId('');
//         } catch (error) {
//             console.error('Error deallocating room:', error);
//             alert('Error deallocating room: ' + (error.response?.data?.msg || error.message));
//         }
//     };

//     const getAvailableRooms = async () => {
//         try {
//             const response = await axios.get('http://localhost:3001/api/v1/admin/available-rooms');
//             setAvailableRooms(response.data.availableRooms);
//         } catch (error) {
//             console.error('Error fetching available rooms:', error);
//             alert('Failed to fetch available rooms.');
//         }
//     };

//     // const getRequests = async () => {
//     //     try {
//     //         const response = await adminServices.getRequests();
//     //         console.log('Requests response:', response);
//     //         setRequests(response.data.requests || []);
//     //     } catch (error) {
//     //         console.error('Error fetching requests:', error);
//     //         alert('Failed to fetch requests.');
//     //     }
//     // };
//     // const getRequests = async () => {
//     //     try {
//     //         const response = await axios.get('http://localhost:3001/api/v1/fetch');
//     //         console.log(response.data); // Check the structure of the response
//     //         setRequests(response.data.requests); // Ensure it's 'requests' if that's the correct case
//     //     } catch (error) {
//     //         console.error('Error fetching requests:', error);
//     //         alert('Failed to fetch requests.');
//     //     }
//     // };
//     const [requests, setRequests] = useState([]);  // Initialize requests as an empty array

//     const getRequests = async () => {
//         try {
//             const response = await axios.get('http://localhost:3001/api/v1/fetch');
//             console.log('API response:', response.data);  // Log the full response for debugging
//             // Check if the data contains requests; update the state accordingly
//             if (response.data) {
//                 setRequests(response.data);
//                 console.log("if")
//             } else {
//                 setRequests([]);
//                   // If no requests field is found, set an empty array
//                   console.log("else")
//             }
//         } catch (error) {
//             console.error('Error fetching requests:', error);
//             alert('Failed to fetch requests.');
//             setRequests([]);  // In case of error, ensure requests is set to an empty array
//         }
//     };
    
//     useEffect(() => {
//         getRequests(); // Fetch requests when the component mounts
//     }, []);

//     return (
//         <div className="container mt-5">
//             <h1>Admin Dashboard</h1>
//             <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>

//             <h2>Create Room</h2>
//             <form onSubmit={createRoom}>
//                 <div className="mb-3">
//                     <label htmlFor="roomNumber" className="form-label">Room Number</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="roomNumber"
//                         value={roomNumber}
//                         onChange={(e) => setRoomNumber(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="pricePerNight" className="form-label">Price Per Night</label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="pricePerNight"
//                         value={pricePerNight}
//                         onChange={(e) => setPricePerNight(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Create Room</button>
//             </form>

//             <h2 className="mt-5">Delete Room</h2>
//             <form onSubmit={deleteRoom}>
//                 <div className="mb-3">
//                     <label className="form-label">Room ID</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         value={roomId}
//                         onChange={(e) => setRoomId(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-danger">Delete Room</button>
//             </form>

//             <h2 className="mt-5">Allocate Room</h2>
//             <form onSubmit={allocateRoom}>
//                 <div className="mb-3">
//                     <label className="form-label">Resident ID</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         value={residentId}
//                         onChange={(e) => setResidentId(e.target.value)}
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Room ID</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         value={roomId}
//                         onChange={(e) => setRoomId(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-success">Allocate Room</button>
//             </form>

//             <h2 className="mt-5">Deallocate Room</h2>
//             <form onSubmit={deallocateRoom}>
//                 <div className="mb-3">
//                     <label className="form-label">Resident ID</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         value={residentId}
//                         onChange={(e) => setResidentId(e.target.value)}
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Room ID</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         value={roomId}
//                         onChange={(e) => setRoomId(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-warning">Deallocate Room</button>
//             </form>

//             <h2 className="mt-5">Available Rooms</h2>
//             <button className="btn btn-info mb-3" onClick={getAvailableRooms}>Get Available Rooms</button>
//             <ul className="list-group">
//                 {availableRooms.length > 0 ? (
//                     availableRooms.map(room => (
//                         <li key={room._id} className="list-group-item">
//                             Room {room.roomNumber}, Price: {room.pricePerNight}
//                         </li>
//                     ))
//                 ) : (
//                     <li className="list-group-item">No rooms available</li>
//                 )}
//             </ul>
//             <h2 className="mt-5">Resident Requests</h2>
// <button className="btn btn-info mb-3" onClick={getRequests}>Get Requests</button>
// <ul className="list-group">
//     {requests.length > 0 ? (
//         requests.map(request => (
//             <li key={request._id} className="list-group-item">
//                 <p><strong>Request ID:</strong> {request._id}</p>
//                 <p><strong>Resident Name:</strong> {request.resident?.name || 'N/A'}</p>
//                 <p><strong>Resident Email:</strong> {request.resident?.email || 'N/A'}</p>
//                 <p><strong>Description:</strong> {request.description}</p>
//                 <p><strong>Assigned Staff:</strong> {request.assignedStaff?.name || 'Unassigned'}</p>
//                 <p><strong>Status:</strong> {request.status}</p>
//             </li>
//         ))
//     ) : (
//         <li className="list-group-item">No requests found</li>
//     )}
// </ul>
//         </div>
//     );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import adminServices from '../services/adminServices';

const AdminDashboard = () => {
    const [roomNumber, setRoomNumber] = useState('');
    const [pricePerNight, setPricePerNight] = useState('');
    const [roomId, setRoomId] = useState('');
    const [residentId, setResidentId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [availableRooms, setAvailableRooms] = useState([]);
    const [requests, setRequests] = useState([]);  // To store requests
    const [staffMembers, setStaffMembers] = useState([]);  // To store staff members
    const [selectedStaffId, setSelectedStaffId] = useState('');  // To store selected staff member

    const navigate = useNavigate();

    useEffect(() => {
        getRequests();
        getStaffMembers();
    }, []);

    // Fetch Requests
    const getRequests = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/fetch');
            setRequests(response.data || []); // Set the requests
        } catch (error) {
            console.error('Error fetching requests:', error);
            alert('Failed to fetch requests.');
        }
    };

    // Fetch Staff Members
    const getStaffMembers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/staff');
            setStaffMembers(response.data.staff || []);
        } catch (error) {
            console.error('Error fetching staff members:', error);
            alert('Failed to fetch staff members.');
        }
    };

    // Handle Staff Assignment
    const assignStaff = async (requestId) => {
        if (!selectedStaffId) {
            alert('Please select a staff member.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3001/api/v1/${requestId}/assign`, {
                staffId: selectedStaffId
            });
            alert('Staff assigned successfully!');
            getRequests(); // Refresh the list after assignment
        } catch (error) {
            console.error('Error assigning staff:', error);
            alert('Failed to assign staff. Please try again.');
        }
    };

    // Other functions (Create Room, Delete Room, Allocate Room, etc.) remain unchanged
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/v1/admin/logout');
            navigate('/admin/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const createRoom = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await adminServices.createRoom({ roomNumber, pricePerNight });
            if (response.data.msg === 'Room created successfully') {
                alert('Room created successfully');
                setRoomNumber('');
                setPricePerNight('');
            }
        } catch (error) {
            setError('An error occurred while creating the room.');
        } finally {
            setLoading(false);
        }
    };

    const deleteRoom = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3001/api/v1/admin/delete-room/${roomId}`);
            alert('Room deleted successfully');
            setRoomId('');
        } catch (error) {
            alert('Failed to delete room. Please try again.');
        }
    };

    const allocateRoom = async (e) => {
        e.preventDefault();
        if (!residentId || !roomId) {
            alert('Please provide both Resident ID and Room ID.');
            return;
        }
        try {
            const roomData = { residentId, roomId };
            const response = await adminServices.allocateRoom(roomData);
            alert('Room allocated successfully!');
        } catch (error) {
            alert('Error allocating room.');
        }
    };

    const deallocateRoom = async (e) => {
        e.preventDefault();
        try {
            const deallocationData = { residentId, roomId };
            const response = await axios.post('http://localhost:3001/api/v1/admin/deallocate-room', deallocationData);
            alert('Room deallocated successfully');
            setResidentId('');
            setRoomId('');
        } catch (error) {
            alert('Error deallocating room.');
        }
    };

    const getAvailableRooms = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/admin/available-rooms');
            setAvailableRooms(response.data.availableRooms);
        } catch (error) {
            alert('Failed to fetch available rooms.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Admin Dashboard</h1>
            <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>

            <h2>Create Room</h2>
            <form onSubmit={createRoom}>
                <div className="mb-3">
                    <label htmlFor="roomNumber" className="form-label">Room Number</label>
                    <input
                        type="text"
                        className="form-control"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pricePerNight" className="form-label">Price Per Night</label>
                    <input
                        type="number"
                        className="form-control"
                        value={pricePerNight}
                        onChange={(e) => setPricePerNight(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Room</button>
            </form>

            <h2 className="mt-5">Delete Room</h2>
             <form onSubmit={deleteRoom}>
                 <div className="mb-3">
                     <label className="form-label">Room ID</label>
                    <input
                         type="text"
                        className="form-control"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                </div>
                 <button type="submit" className="btn btn-danger">Delete Room</button>
            </form>

             <h2 className="mt-5">Allocate Room</h2>
             <form onSubmit={allocateRoom}>
                <div className="mb-3">
                     <label className="form-label">Resident ID</label>
                    <input
                         type="text"
                        className="form-control"
                        value={residentId}
                        onChange={(e) => setResidentId(e.target.value)}
                     />
                 </div>
                 <div className="mb-3">
                    <label className="form-label">Room ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={roomId}
                         onChange={(e) => setRoomId(e.target.value)}
                    />
                </div>
                 <button type="submit" className="btn btn-success">Allocate Room</button>
             </form>

            <h2 className="mt-5">Deallocate Room</h2>
            <form onSubmit={deallocateRoom}>
                <div className="mb-3">
                    <label className="form-label">Resident ID</label>
                     <input
                        type="text"
                         className="form-control"
                        value={residentId}
                        onChange={(e) => setResidentId(e.target.value)}
                     />
                 </div>
                 <div className="mb-3">
                     <label className="form-label">Room ID</label>
                     <input
                         type="text"
                         className="form-control"
                         value={roomId}
                         onChange={(e) => setRoomId(e.target.value)}
                    />
                 </div>   
                      <button type="submit" className="btn btn-warning">Deallocate Room</button>
             </form>

             <h2 className="mt-5">Available Rooms</h2>
            <button className="btn btn-info mb-3" onClick={getAvailableRooms}>Get Available Rooms</button>
             <ul className="list-group">
                 {availableRooms.length > 0 ? (
                     availableRooms.map(room => (
                        <li key={room._id} className="list-group-item">
                             Room {room.roomNumber}, Price: {room.pricePerNight}
                         </li>
                    ))
                ) : (
                    <li className="list-group-item">No rooms available</li>
                )}
            </ul>

            <h2 className="mt-5">Resident Requests</h2>
            <ul className="list-group">
                {requests.length > 0 ? (
                    requests.map(request => (
                        <li key={request._id} className="list-group-item">
                            <p><strong>Request ID:</strong> {request._id}</p>
                            <p><strong>Resident Name:</strong> {request.resident?.name || 'N/A'}</p>
                            <p><strong>Description:</strong> {request.description}</p>
                            <p><strong>Status:</strong> {request.status}</p>
                            <p><strong>Assigned Staff:</strong> {request.assignedStaff?.name || 'Unassigned'}</p>
                            
                            {/* Staff Assignment */}
                            <select
                                value={selectedStaffId}
                                onChange={(e) => setSelectedStaffId(e.target.value)}
                                className="form-select mb-2"
                            >
                                <option value="">Select Staff</option>
                                {staffMembers.map(staff => (
                                    <option key={staff._id} value={staff._id}>
                                        {staff.name}
                                    </option>
                                ))}
                            </select>
                            <button className="btn btn-primary" onClick={() => assignStaff(request._id)}>
                                Assign Staff
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No requests found</li>
                )}
            </ul>
        </div>
    );
};

export default AdminDashboard;

