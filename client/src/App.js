import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './pages/login';
import Registerpage from './pages/register';
import Home from './pages/home';
import UserDashbord from './pages/userDashboard';
import PrivateRoute from './components/privateRoute';
import UserUpdate from './pages/userupdate';
import UserTrainings from './pages/UserTrainings';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import  {TrainerProvider} from './components/TrainerContext'
import TrainerDashboard from './pages/TrainerDashboard';
import ManageUsers  from './pages/ManageUsersPage';
import ManageTraining  from './pages/ManageTrainingPage';
import TrainerUpdate from './pages/trainerupdate'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <TrainerProvider> 
      <Routes>
        <Route path="/register" element={<Registerpage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/dashboard" element={<PrivateRoute> <UserDashbord /> </PrivateRoute>} />
        <Route path="/dashboard/update" element={<PrivateRoute> <UserUpdate /> </PrivateRoute>} />
        <Route path="/dashboard/trinings" element={<PrivateRoute> <UserTrainings /> </PrivateRoute>} />
      
    
            <Route path="/trainerpanel" element={<PrivateRoute> <TrainerDashboard /> </PrivateRoute>} />
            <Route path="/trainerpanel/manage/users" element={<PrivateRoute> <ManageUsers /> </PrivateRoute>} />
            <Route path="/trainerpanel/manage/trainig" element={<PrivateRoute> <ManageTraining /> </PrivateRoute>} />
            <Route path="/trainerpanel/update" element={<PrivateRoute> <TrainerUpdate /> </PrivateRoute>} />
          </Routes>
          <Toaster position="top-center" toastOptions={{ className: 'toast-z-index', style: { zIndex: 9999 } }} />
        </TrainerProvider>
      
      
    </Router>
    
    
  );
}

export default App;
