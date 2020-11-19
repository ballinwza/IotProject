import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import LogoARD from '../images/ARDLogo1.png';

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faBars } from "@fortawesome/free-solid-svg-icons";

// <li><Link to='/service' className="text-link">Service</Link></li>

class Header extends Component {
    render() {
        return(
            <nav className="navbar navbar-expand-md ">

                <Link to='/' className="navbar-brand"  >
                    <div className="logo-content">
                        <img src={LogoARD} ></img>
                    </div>
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <div className="logo-content">
                        <img src={LogoARD} ></img>
                    </div>
                </button>

                <div className="collapse navbar-collapse " id="navbarMenu">
                    <ul className="navbar-nav">
                        <li className="nav-item ">
                            <Link to='/' className="nav-link">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/product' className="nav-link" >Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/patientsortedlist' className="nav-link" >Sevices</Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/contact' className="nav-link" href="/">Contact</Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/signin' className="nav-link" href="/">SignIn</Link>
                        </li>
                    </ul>
                </div>

            </nav>
        )
    }
}

export default Header;