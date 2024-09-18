import { useEffect } from "react";
import authServices from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                const response = await authServices.logout();
                alert(response.data.message); 
                navigate('/login');
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'An error occurred during logout';
                alert(errorMessage);
            }
        };

        performLogout();
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default Logout;
