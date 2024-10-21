import mainlogo from '../main-logo.svg';
import '../styles/Navbar.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt , faGear} from '@fortawesome/free-solid-svg-icons';
import { useTrainer } from './TrainerContext';




export default function Navbar() {
    const { handleuserLogout } = useTrainer(); 
    const {userData} =useTrainer();
  
    if (userData) {
    return (
        <div className='navbody'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={mainlogo} alt="Logo" className="navbar-brand" style={{ width: '42.75px', height: '40px' }} />
                        <i className="fab fa-github fa-2x mx-3 ps-1"></i>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="me-3">
                            <div className="form-white input-group" style={{ width: '250px' }}>
                                <input type="search" className="form-control rounded" placeholder="Search or jump to... ( / )"
                                    aria-label="Search" aria-describedby="search-addon" />
                            </div>
                        </form>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/dashboard" activeClassName="active" className="nav-link" end>Dashboard</NavLink>
                            </li>
                            
                            <li className="nav-item">
                                <NavLink to="/dashboard/trinings" activeClassName="active" className="nav-link">Training</NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Explore</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav d-flex flex-row ms-auto me-3">
                           
                            <li className="nav-item me-3 me-lg-0 dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownProfile" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <img src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg" className="rounded-circle" height="35"
                                        alt="" loading="lazy" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownProfile">
                                    
                                    <li><NavLink to="/dashboard/update" className="dropdown-item"><FontAwesomeIcon icon={faGear} />Update info</NavLink></li>
                                    <li>
                                    <button className="dropdown-item" onClick={handleuserLogout} ><FontAwesomeIcon icon={faSignOutAlt} /> Logout </button>
                                        
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

else {
    return (
        <div className='navbody'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={mainlogo} alt="Logo" className="navbar-brand" style={{ width: '42.75px', height: '40px' }} />
                        <i className="fab fa-github fa-2x mx-3 ps-1"></i>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="me-3">
                            <div className="form-white input-group" style={{ width: '250px' }}>
                                <input type="search" className="form-control rounded" placeholder="Search or jump to... ( / )"
                                    aria-label="Search" aria-describedby="search-addon" />
                            </div>
                        </form>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/trainerpanel" activeClassName="active" className="nav-link" end>Dashboard </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/trainerpanel/manage/users" activeClassName="active" className="nav-link">Users</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/trainerpanel/manage/trainig" activeClassName="active" className="nav-link"end>Training</NavLink>
                            </li>
                   
                        </ul>
                        <ul className="navbar-nav d-flex flex-row ms-auto me-3">
                           
                            <li className="nav-item me-3 me-lg-0 dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownProfile" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <img src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg" className="rounded-circle" height="35"
                                        alt="" loading="lazy" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownProfile">
                                    
                                    <li><NavLink to="/trainerpanel/update" className="dropdown-item"><FontAwesomeIcon icon={faGear} />Update info</NavLink></li>
                                    <li>
                                    <button className="dropdown-item" onClick={handleuserLogout}><FontAwesomeIcon icon={faSignOutAlt} />Logout </button>
                                        
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
}