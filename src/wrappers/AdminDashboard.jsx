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
    const [requests, setRequests] = useState([]);
    const [staffMembers, setStaffMembers] = useState([]);
    const [selectedStaffId, setSelectedStaffId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getRequests();
        getStaffMembers();
    }, []);

    const getRequests = async () => {
        try {
            const response = await axios.get('https://hotelapplicationbackend.onrender.com/api/v1/fetch');
            setRequests(response.data || []);
        } catch (error) {
            console.error('Error fetching requests:', error);
            alert('Failed to fetch requests.');
        }
    };

    const getStaffMembers = async () => {
        try {
            const response = await axios.get('https://hotelapplicationbackend.onrender.com/api/v1/staff');
            setStaffMembers(response.data.staff || []);
        } catch (error) {
            console.error('Error fetching staff members:', error);
            alert('Failed to fetch staff members.');
        }
    };

    const assignStaff = async (requestId) => {
        if (!selectedStaffId) {
            alert('Please select a staff member.');
            return;
        }

        try {
            const response = await axios.put(`https://hotelapplicationbackend.onrender.com/api/v1/${requestId}/assign`, {
                staffId: selectedStaffId
            });
            alert('Staff assigned successfully!');
            getRequests();
        } catch (error) {
            console.error('Error assigning staff:', error);
            alert('Failed to assign staff. Please try again.');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('https://hotelapplicationbackend.onrender.com/api/v1/admin/logout');
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
            const response = await axios.delete(`https://hotelapplicationbackend.onrender.com/api/v1/admin/delete-room/${roomId}`);
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
            const response = await axios.post('https://hotelapplicationbackend.onrender.com/api/v1/admin/deallocate-room', deallocationData);
            alert('Room deallocated successfully');
            setResidentId('');
            setRoomId('');
        } catch (error) {
            alert('Error deallocating room.');
        }
    };

    const getAvailableRooms = async () => {
        try {
            const response = await axios.get('https://hotelapplicationbackend.onrender.com/api/v1/admin/available-rooms');
            setAvailableRooms(response.data.availableRooms);
        } catch (error) {
            alert('Failed to fetch available rooms.');
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button className="bg-red-500 text-black px-4 py-2 mt-4" onClick={handleLogout}>Logout</button>

            <h2 className="text-2xl font-bold mt-10">Create Room</h2>
            <form onSubmit={createRoom} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="roomNumber" className="block font-semibold">Room Number</label>
                    <input
                        type="text"
                        className="border border-gray-300 p-2 w-full"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="pricePerNight" className="block font-semibold">Price Per Night</label>
                    <input
                        type="number"
                        className="border border-gray-300 p-2 w-full"
                        value={pricePerNight}
                        onChange={(e) => setPricePerNight(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-black px-4 py-2">Create Room</button>
            </form>

            <h2 className="text-2xl font-bold mt-10">Delete Room</h2>
            <form onSubmit={deleteRoom} className="mt-4">
                <div className="mb-4">
                    <label className="block font-semibold">Room ID</label>
                    <input
                        type="text"
                        className="border border-gray-300 p-2 w-full"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-red-500 text-black px-4 py-2">Delete Room</button>
            </form>

            <h2 className="text-2xl font-bold mt-10">Allocate Room</h2>
            <form onSubmit={allocateRoom} className="mt-4">
                <div className="mb-4">
                    <label className="block font-semibold">Resident ID</label>
                    <input
                        type="text"
                        className="border border-gray-300 p-2 w-full"
                        value={residentId}
                        onChange={(e) => setResidentId(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Room ID</label>
                    <input
                        type="text"
                        className="border border-gray-300 p-2 w-full"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-green-500 text-black px-4 py-2">Allocate Room</button>
            </form>

            <h2 className="text-2xl font-bold mt-10">Deallocate Room</h2>
            <form onSubmit={deallocateRoom} className="mt-4">
                <div className="mb-4">
                    <label className="block font-semibold">Resident ID</label>
                    <input
                        type="text"
                        className="border border-gray-300 p-2 w-full"
                        value={residentId}
                        onChange={(e) => setResidentId(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Room ID</label>
                    <input
                        type="text"
                        className="border border-gray-300 p-2 w-full"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-yellow-500 text-black px-4 py-2">Deallocate Room</button>
            </form>

            <h2 className="text-2xl font-bold mt-10">Available Rooms</h2>
            <button className="bg-teal-500 text-black px-4 py-2 mb-4" onClick={getAvailableRooms}>Get Available Rooms</button>
            <ul className="list-disc pl-5">
                {availableRooms.length > 0 ? (
                    availableRooms.map(room => (
                        <li key={room._id} className="py-2">
                            Room {room.roomNumber}, Price: {room.pricePerNight}
                        </li>
                    ))
                ) : (
                    <li>No rooms available</li>
                )}
            </ul>

            <h2 className="text-2xl font-bold mt-10">Resident Requests</h2>
            <ul className="list-disc pl-5">
                {requests.length > 0 ? (
                    requests.map(request => (
                        <li key={request._id} className="py-2">
                            <p><strong>Request ID:</strong> {request._id}</p>
                            <p><strong>Resident Name:</strong> {request.resident?.name || 'N/A'}</p>
                            <p><strong>Description:</strong> {request.description}</p>
                            <p><strong>Status:</strong> {request.status}</p>
                            <p><strong>Assigned Staff:</strong> {request.assignedStaff?.name || 'Unassigned'}</p>

                            <select
                                value={selectedStaffId}
                                onChange={(e) => setSelectedStaffId(e.target.value)}
                                className="border border-gray-300 p-2 mb-2 w-full"
                            >
                                <option value="">Select Staff</option>
                                {staffMembers.map(staff => (
                                    <option key={staff._id} value={staff._id}>
                                        {staff.name}
                                    </option>
                                ))}
                            </select>
                            <button className="bg-blue-500 text-black px-4 py-2" onClick={() => assignStaff(request._id)}>
                                Assign Staff
                            </button>
                        </li>
                    ))
                ) : (
                    <li>No requests found</li>
                )}
            </ul>
        </div>
    );
};

export default AdminDashboard;
