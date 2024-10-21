import mainlogo from '../main-logo.svg';
import '../styles/ExternalNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

export default function ExternalNavbar() {
    return (
        <div className='navbody'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <NavLink to="/home" className="navbar-brand" >
                        <img src={mainlogo} alt="Logo" className="navbar-brand" />
                        <i className="fab fa-github fa-2x mx-3 ps-1"></i>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        
                     
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <li><NavLink to="/login" activeClassName="active" className="nav-link">Login</NavLink></li>
                            </li>
                            <li className="nav-item">
                            <li><NavLink  to="/register" activeClassName="active" className="nav-link">Register</NavLink></li>
                            </li>
                           
                        </ul>
                       
                    </div>
                </div>
            </nav>
            
        </div>
    );
}
