import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectName, selectPassword, selectPhonenumber, setEmail, setName, setPassword, setPhonenumber } from "../features/Residents/registerSlice";
import authServices from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const name = useSelector(selectName);
    const email = useSelector(selectEmail);
    const phonenumber = useSelector(selectPhonenumber);
    const password = useSelector(selectPassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegister = (e)=>{
        e.preventDefault();
        const userData = { name, email, phoneNumber:phonenumber, password };
        authServices.register(userData)
        .then(response => {
            console.log('Registration successful:', response);
            if (response.data && response.data.message) {
                alert(response.data.message);
                dispatch(setName(''));
                dispatch(setEmail(''));
                dispatch(setPhonenumber(''));
                dispatch(setPassword(''));
                navigate('/login');
            } else {
                alert('Unexpected response format');
            }
        })
        .catch(error => {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred';
            alert(errorMessage);
        });
    }
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card">
              <div className="card-header">
                <h2>Register</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} 
                    onChange={(e)=>dispatch(setName(e.target.value))}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" value={email}
                    onChange={(e)=>dispatch(setEmail(e.target.value))}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phonenumber" className="form-label">Phone Number</label>
                    <input type="phonenumber" className="form-control" id="phonenumber" value={phonenumber}
                    onChange={(e)=>dispatch(setPhonenumber(e.target.value))}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password}
                    onChange={(e)=>dispatch(setPassword(e.target.value))} />
                  </div>
                  <button type="submit" className="btn btn-primary">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Register;
  