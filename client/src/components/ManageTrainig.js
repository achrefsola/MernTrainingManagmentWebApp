import axios from 'axios';
import { FaTrashAlt, FaTrain } from 'react-icons/fa';
import '../styles/ManageUsers.css';
import { useTrainer } from '../components/TrainerContext';
import { useState, useEffect } from 'react';
import AddTraining from './AddTraining';


import toast from 'react-hot-toast'

const TrainingInfoTable = ({usermod=false}) => {
  const { trainingData, setTrainingData } = useTrainer();
  const [emails, setEmails] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);

  const handleDelete = async (trainingId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/training/delete/${trainingId}`);
      setTrainingData(trainingData.filter((training) => training._id !== trainingId));
      console.log('Training deleted successfully:', response.data);
      toast.success('Training deleted successfully');
    } catch (error) {
      console.error('Error deleting training:', error);
    }
  };
  

  useEffect(() => {
    const fetchUserEmails = async (userIds) => {
      try {
        const response = await axios.post('http://localhost:5000/api/user/emails', { userIds });
        setEmails(response.data);
      } catch (error) {
        console.error('Error fetching user emails:', error);
      }
    };

    const userIds = trainingData.reduce((ids, training) => {
      return [...ids, ...training.users];
    }, []);

    fetchUserEmails(userIds);
  }, [trainingData]);
  

  return (
    <div className='bodymanager'>
      <div className="table-container">
      {!usermod && (<div className="add-button-container">
          <button className='addbutton' onClick={() => setButtonPopup(true)}>&#43; Add New Training</button>
        </div>)}
        <h2>Training Information</h2>
        <div className="table-responsive">
          <table className="table table-sm table-striped">
            <thead>
              <tr>
                <th>Training Name</th>
                <th>Trainer Name</th>
                <th>Info</th>
                {!usermod&& <th>Users</th>}
                {!usermod &&<th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {trainingData.map((training) => (
                <tr key={training._id}>
                  <td>{training.trainingname}</td>
                  <td>{training.trainername}</td>
                  <td>{training.info}</td>
                  {!usermod && (<td>
                    {training.users.map(userId => (
                      <div key={userId}>{emails[userId]}</div>
                    ))}
                  </td>)}
                  {!usermod && (
                    <td>
                      <FaTrashAlt className="deleteicon" onClick={() => handleDelete(training._id)} />
                     
                      <AddTraining trigger={buttonPopup} data={trainingData} setTrigger={setButtonPopup}>
                        <h5>Choose a training</h5>
                      </AddTraining>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainingInfoTable;
