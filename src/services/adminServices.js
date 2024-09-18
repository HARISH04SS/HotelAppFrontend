import instance from "./instance"; 

const adminServices = {
    adminRegister: async (data) => {
        return await instance.post('/admin/register', data);
    },
    adminLogin: async (data) => {
        return await instance.post('/admin/login', data);
    },
    createRoom : async (roomData) => {
        return await instance.post('/admin/create-room',roomData)
    },
    allocateRoom: async (roomData) => {
     //   return await instance.post('/admin/allocate-room', roomData);
   // },
    {
        console.log('Sending request with data:', roomData);
        try {
            const response = await instance.post('/admin/allocate-room', roomData);
            console.log('Received response:', response);
            return response;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
},
        deallocateRoom :async (deallocationData) => {
            console.log('Sending deallocation request with data:', deallocationData);
            try {
                const response = await instance.post('/admin/deallocate-room', deallocationData);
                console.log('Received response:', response);
                return response;
            } catch (error) {
                console.error('API request failed:', error);
                throw error; // Ensure errors are thrown to be caught in the caller
            }
        },

        // getRequests : async() => {
        //     return await instance.get('/fetch');
        // }
        
};

export default adminServices;
