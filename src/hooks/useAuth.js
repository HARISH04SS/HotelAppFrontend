import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [staffId, setStaffId] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const staff = JSON.parse(localStorage.getItem('staff'));

        if (storedToken && staff) {
            setToken(storedToken);
            setStaffId(staff._id);
        }
    }, []);

    return { token, staffId };
};
