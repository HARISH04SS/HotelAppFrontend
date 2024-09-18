import instance from "./instance"; 

const staffServices = {
    staffRegister: async (data) => {
        return await instance.post('/staff/staffregister', data);
    },
    staffLogin: async (data) => {
        return await instance.post('/staff/stafflogin', data);
    },  
};

export default staffServices;
