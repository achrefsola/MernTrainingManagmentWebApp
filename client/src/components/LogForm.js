import React , {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function LoginForm() {
  


  const [formData, setFormData] = useState({
    
    email: '',
    password :'',
    
    
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    try {
      const res = await axios.post('http://localhost:5000/api/user/login', formData);
    
      console.log('auth Data sent', res.data);
      
      
      const userId = res.data.user._id;
      let role = res.data.role;
     localStorage.setItem('token', res.data.token);
      localStorage.setItem('userid', userId);
      console.log(userId);
      if(role==="user"){
              navigate('/dashboard');
      } else {
        navigate('/trainerpanel');
      }

      setFormData({  email: '',password :''});
      
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Unvalid Email or password" )
    }
    
  };
  


    return (
      <div className='body'>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-dark text-white">
              <div className="card-body">
                <h2 className="card-title text-center">Log In</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange}/>
                  </div>
                  <button type="submit" className="btn btn-secondary">Take Me In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }