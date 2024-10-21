import '../styles/RegisterForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password :'',
    speciality: ''
    
    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSpecialityChange = (e) => {
    setFormData({ ...formData, speciality: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    try {
      const res = await axios.post('http://localhost:5000/api/user/register', formData);
      console.log('Data sent', res.data);
      setFormData({ firstname: '', lastname: '', email: '', phone: '',password :'', speciality: '' });
      toast.success('registred ! Chill you will be redirected soon ');
      setTimeout(() => {
        window.location.href='/login'
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="body">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-dark text-white">
              <div className="card-body">
                <h2 className="card-title text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="firstname" placeholder="Enter your name" name="firstname" value={formData.firstname} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastname" placeholder="Enter your last name" name="lastname" value={formData.lastname} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="speciality" className="form-label">Speciality</label>
                    <select id="speciality" className="form-select" value={formData.speciality} onChange={handleSpecialityChange}>
                      <option value="">Choose...</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Cyber Security">Cyber Security</option>
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-secondary">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
