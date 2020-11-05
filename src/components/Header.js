import React,{Component} from 'react';

import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// <li><Link to='/service' className="text-link">Service</Link></li>

class Header extends Component {
    render() {
        return(
            <nav className="Container-Header">
                <h1 className="Container-Header-logo">ARDTech</h1>

                <ul>
                    <li><Link to='/' className="text-link">Home</Link></li>
                    <li><Link to='/product' className="text-link">Product</Link></li>
                    <li><Link to='/patientsortedlist' className="text-link">Service</Link></li>
                    <li><Link to='/contact' className="text-link">Contact</Link></li>
                    <li><Link to='/signIn' className="text-link">Login</Link></li>
                </ul>

                <div className="burger">
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        )
    } 
}

export default Header;