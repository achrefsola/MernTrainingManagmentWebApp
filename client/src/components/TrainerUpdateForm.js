import '../styles/UserUpdateForm.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTrainer } from '../components/TrainerContext';


export default function UpdateTrainerInfo() {
  const { trainerData } = useTrainer();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname:  '',
    email:  '',
    phone: ''
    
  });
 



  useEffect(() => {
    if(trainerData)
    setFormData({
      firstname: trainerData?.firstname,
      lastname: trainerData?.lastname,
      email: trainerData?.email,
      phone: trainerData?.phone,
      speciality: trainerData?.speciality
    })
  },[trainerData])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSpecialityChange = (e) => {
    setFormData({ ...formData, speciality: e.target.value });
  };

  const handleSubmit = async (fieldToUpdate) => {
    try {
      const id = localStorage.getItem('userid');
      const updatedData = { [fieldToUpdate]: formData[fieldToUpdate] };
      const res = await axios.patch(`http://localhost:5000/api/trainer/update/${id}`, updatedData);
      console.log('Data sent', res.data);
      setFormData(prevFormData =>({
        ...prevFormData, [fieldToUpdate]:res.data[fieldToUpdate]
      }));
       
      
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
<div className="body">
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-7">
        <div className="custom-card">
          <div className="custom-card-body">
            <h2 className="custom-card-title custom-text-center">Update Informations</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="custom-mb-3 custom-row custom-align-items-center">
                <label htmlFor="firstname" className="custom-col-sm-3 custom-col-form-label">First Name</label>
                <div className="custom-col-sm-7">
                  <input type="text" className="custom-form-control" id="firstname"  value={formData.firstname} onChange={handleChange}  />
                </div>
                <div className="custom-col-sm-2">
                  <button type="button" className="custom-btn custom-btn-secondary" onClick={() => handleSubmit('firstname')}>Update</button>
                </div>
              </div>
              <div className="custom-mb-3 custom-row custom-align-items-center">
                <label htmlFor="lastname" className="custom-col-sm-3 custom-col-form-label">Last Name</label>
                <div className="custom-col-sm-7">
                  <input type="text" className="custom-form-control" id="lastname"  value={formData.lastname} onChange={handleChange} />
                </div>
                <div className="custom-col-sm-2">
                  <button type="button" className="custom-btn custom-btn-secondary" onClick={() =>  handleSubmit('lastname')}>Update</button>
                </div>
              </div>
              <div className="custom-mb-3 custom-row custom-align-items-center">
                <label htmlFor="email" className="custom-col-sm-3 custom-col-form-label">Email</label>
                <div className="custom-col-sm-7">
                  <input type="text" className="custom-form-control" id="email"  value={formData.email} onChange={handleChange} />
                </div>
                <div className="custom-col-sm-2">
                  <button type="button" className="custom-btn custom-btn-secondary" onClick={() => handleSubmit('email')}>Update</button>
                </div>
              </div>
              <div className="custom-mb-3 custom-row custom-align-items-center">
                <label htmlFor="phone" className="custom-col-sm-3 custom-col-form-label">Phone</label>
                <div className="custom-col-sm-7">
                  <input type="text" className="custom-form-control" id="phone"  value={formData.phone} onChange={handleChange} />
                </div>
                <div className="custom-col-sm-2">
                  <button type="button" className="custom-btn custom-btn-secondary" onClick={() => handleSubmit('phone')}>Update</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

);


}
