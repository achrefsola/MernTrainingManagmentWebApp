import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrainerContext = createContext();

export const TrainerProvider = ({ children }) => {
    const navigate = useNavigate();
    const [trainerData, setTrainerData] = useState(() => {
       
        const savedData = localStorage.getItem('trainerData');
        return savedData ? JSON.parse(savedData) : null;
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && !trainerData) {
          const storedTrainerId = localStorage.getItem('userid');
          fetchTrainerData(storedTrainerId, storedToken);
        }
      }, [trainerData, localStorage.getItem('token')]);

    const fetchTrainerData = async (id, token) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/trainer/${id}`, {
                headers: { Authorization: `Bearer ${token}`, 
                trainerId: id
            }
            });
            setTrainerData(response.data);
            console.log('trainerData state updated:', trainerData);
            localStorage.setItem('token',token ); 
        } catch (error) {
            console.error('Error fetching trainer data:', error);
        }
    };
    const [trainingData, setTrainingData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/training/training');
          setTrainingData(response.data); 
        } catch (error) {
          console.error('Error fetching training data:', error);
        }
      };
  
      fetchData();
    }, []);
    const handleLogout  = async() => {
        setTrainerData(null);
        console.log(trainerData)
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('trainerData');
        navigate('/login');
    };
    const [userData, setUserData] = useState(() => {
       
      const savedData = localStorage.getItem('userData');
      return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken && !userData) {
        const storedUserId = localStorage.getItem('userid');
        fetchData(storedUserId, storedToken);
      }
    }, [userData, localStorage.getItem('token')]);

  
  const fetchData = async (id, token) => {
      try {
          const response = await axios.get(`http://localhost:5000/api/user/${id}`, {
              headers: { Authorization: `Bearer ${token}`, 
              userId: id
          }
          });
          setUserData(response.data);
          console.log('userData state updated:', userData);
          localStorage.setItem('token',token ); 
      } catch (error) {
          console.error('Error fetching user data:', error);
      }
  };

  const handleuserLogout  = async() => {
      setUserData(null);
      console.log(userData)
      localStorage.removeItem('token');
      localStorage.removeItem('userid');
      localStorage.removeItem('userData');
      navigate('/login');
  };

    return (
        <TrainerContext.Provider value={{  setTrainingData,trainingData ,trainerData, userData,setUserData, setTrainerData, handleLogout,handleuserLogout }}>
            {children}
        </TrainerContext.Provider>
    );
};

export const useTrainer = () => useContext(TrainerContext);