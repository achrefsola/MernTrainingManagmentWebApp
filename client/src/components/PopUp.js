import React, { useState, useEffect } from 'react';
import '../styles/PopUp.css';
import axios from 'axios';
import { useTrainer } from '../components/TrainerContext';

function PopUp(props) {
    const { trainingData } = useTrainer();
    const [popupStyle, setPopupStyle] = useState({});
// calculate the widow size dynamicly 
    useEffect(() => {
  
        const popupInner = document.querySelector('.popup-inner');
        if (popupInner) {
         
            const contentHeight = popupInner.clientHeight;
            const contentWidth = popupInner.clientWidth;
    
           
            setPopupStyle({
                maxHeight: `${contentHeight}px`,
                maxWidth: `${contentWidth}px`,
            });
        }
    }, [props.trigger, trainingData]);
 
    const handleAssignUser = async (userId, trainingId) => {
        if (!userId) {
            console.log('user id not found ')
        }
        try {
            const response = await axios.patch(`http://localhost:5000/api/training/assignuser`, {
                userId: userId,
                trainingId: trainingId
            });
            console.log('User assigned to training:', response.data);
            props.setTrigger(false);
        } catch (error) {
            console.error('Error assigning user to training:', error);
        }
    };

    return props.trigger ? (
        <div className="popup">
            <div className="popup-inner" style={popupStyle}>
                {props.children}
                <ol className='traininglist'>
                    {trainingData?.map(training => (
                        <li key={training._id}>
                            <button className='trainingbutton' onClick={() => handleAssignUser(props.selectedUserId, training._id)}>
                                {training.trainingname}
                            </button>
                        </li>
                    ))}
                </ol>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
            </div>
        </div>
    ) : null;
};

export default PopUp;
