
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PopUp.css'
import toast from 'react-hot-toast';

export default function AddTraining(props) {

  const [formData, setFormData] = useState({
    
    trainingname: '',
    trainername: '',
    info: ''
    
    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    try {
      const res = await axios.post('http://localhost:5000/api/training/add', formData);
      console.log('Data sent', res.data);
      setFormData({ trainingname: '', trainername: '', info: ''});
      toast.success('Training added successfully');
      console.log('test  data', props.data);
      props.data.unshift(res.data);
      props.setTrainingData(props.data);
     
    
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return props.trigger ? (
    <div className="popup">
              <div className="popup-inner">
              {props.children}
                <h2 className="card-title text-center">Add new training</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="trainingname" className="form-label">Training Name</label>
                    <input type="text" className="form-control" id="trainingname" placeholder="Enter the training name" name="trainingname" value={formData.trainingname} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="trainername" className="form-label">Trainer Name</label>
                    <input type="text" className="form-control" id="trainername" placeholder="Enter the trainer name" name="trainername" value={formData.trainername} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="info" className="form-label">Info</label>
                    <input type="info" className="form-control" id="info" placeholder="info" name="info" value={formData.info} onChange={handleChange} />
                  </div>
                  <div className='button-container'>
                  <button type="submit" className="btn btn-secondary">Confirm</button>
                  <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
                  </div>
                </form>
              </div>
            </div>
         
  ): null;
}
