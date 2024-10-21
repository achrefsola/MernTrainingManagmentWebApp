import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaTrain, FaPlus } from 'react-icons/fa'; // Import icons
import '../styles/ManageUsers.css'
import PopUp from './PopUp'
import toast from 'react-hot-toast';


const UserInfoTable = () => {
  const [buttonPopup,setbuttonPopup] = useState(false);
  const [userData, setUserData] = useState([]);

  const [userId,setuserId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/users')
        setUserData(response.data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);



  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/user/delete/${userId}`);
      setUserData(userData.filter((user) => user._id !== userId)); 
      console.log('User deleted successfully:', response.data);
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      
    }
  };

  const handleSelectedUserId= async (userData)=>{
    setuserId(userData)
    setbuttonPopup(true);

  }

  return (
    <div className='bodymanager'>
    <div className="table-container"> 
      <h2>User Information</h2>
      <div className="table-responsive"> 
        <table className="table table-sm table-striped"> 
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Speciality</th>
              <th>Action</th> 
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.speciality}</td>
                <td>
                  <FaTrashAlt className="deleteicon"  onClick={() => handleDelete(user._id)}/> 
                  <FaPlus className="addicon" onClick={() => handleSelectedUserId(user._id)} />
                  <PopUp trigger={buttonPopup} setTrigger={setbuttonPopup} selectedUserId={userId}>

                    <h5>choose a training</h5>
                    </PopUp> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default UserInfoTable;
