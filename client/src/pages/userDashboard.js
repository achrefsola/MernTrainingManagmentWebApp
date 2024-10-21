import Navbar from '../components/Navbar';
import { useTrainer } from '../components/TrainerContext';
 
import '../styles/TrainerPanel.css';

const Dashboard = () => {
  const { userData } = useTrainer(); 

  return (
    <div className="dashboard-container">
      <Navbar/>
      {userData ? (
        <div className="trainer-info">
          <div className="container">
            <div className="row">
         
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>User Information</span>
                     
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <p><strong>First Name:</strong> {userData.firstname}</p>
                        <p><strong>Last Name:</strong> {userData.lastname}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Phone Number:</strong> {userData.phone}</p>
                        <p><strong>Speciality:</strong> {userData.speciality}</p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
          
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className='second'>Current Training</span>
                   
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                    
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
