import React,{Component} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class Header extends Component {

    render() {
        return(
            <nav className="Container-Header">
                <h1 className="Container-Header-logo">ARDTech</h1>

                <ul>
                    <li>Home</li>
                    <li>Product</li>
                    <li>Service</li>
                    <li>Contact</li>
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