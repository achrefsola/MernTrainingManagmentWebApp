
import Navbar from '../components/Navbar';
import { useTrainer } from '../components/TrainerContext'; 
import '../styles/TrainerPanel.css'; 


const TrainerPanel = () => {
  const { trainerData } = useTrainer(); 

  return (
    <div className="dashboard-container">
      <Navbar />
      {trainerData ? (
        <div className="trainer-info">
          <div className="container">
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Trainer Information</span>
               
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-7">
                    <p><strong>First Name:</strong> {trainerData.firstname}</p>
                    <p><strong>Last Name:</strong> {trainerData.lastname}</p>
                    <p><strong>Email:</strong> {trainerData.email}</p>
                    <p><strong>Phone Number:</strong> {trainerData.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : (
          <p>Loading trainer data...</p>
        )}
    </div>
  );
};

export default TrainerPanel;
